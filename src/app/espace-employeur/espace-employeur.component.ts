import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeExistService } from '../services/employe-exist.service';
import { ImmatriculationService } from '../services/immatriculation.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ViewPdfComponent } from '../view-pdf/view-pdf.component';
import { PaiementComponent } from '../paiement/paiement.component';
import { SuiviDemandeComponent } from '../suivi-demande/suivi-demande.component';
import { LoginService } from '../services/login.service';
import {
    MatSnackBar, NativeDateAdapter
  , MatTableDataSource, MatDatepickerInputEvent, DateAdapter, MAT_DATE_FORMATS, MatStepper
} from '@angular/material';
import { DemandesServiceService } from '../services/demandes-service.service';
@Component({
  selector: 'app-espace-employeur',
  templateUrl: './espace-employeur.component.html',
  styleUrls: ['./espace-employeur.component.css']
})
export class EspaceEmployeurComponent implements OnInit {
id:number;
isExpanded:boolean=false;
empInfo:any=[];

displayedColumns: string[] = ['typeDemande', 'idDossier', 'statutDossier', 'urlDocument'];
dataSource: MatTableDataSource<any>;

demandes:any = [];


// Loader Statut and URL certification
loaderUrlImmat:boolean = false;
loaderStatutImmat:boolean = false;
statutCertImm:string = '';
urlCertImmat:string = '';
nomUser:string="";
prenomUser:string="";
userName:string="";
tok:string="";
checkConn:boolean=false;
constructor(private route : ActivatedRoute,
    private immatriculationService:ImmatriculationService, private demandeService:DemandesServiceService,
    private dialog:MatDialog,
    private empService:EmployeExistService,private userService:LoginService,private router:Router) { }
    

    ngOnInit() {
    this.userName=window.localStorage.getItem("user");
    console.log(this.userName);
    this.tok=window.localStorage.getItem("token");
    this.loaderUrlImmat = false;
    this.loaderStatutImmat = false;
    this.statutCertImm = '';
    this.urlCertImmat = '';
    this.getUserByLogin();
    if(this.tok!=null){
      this.checkConn=true;
    }
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.getEmployer(this.id);
    this.getDemandesByEmployeur(this.id);

  }

  getUserByLogin(){
    this.userService.getUserByLogin( this.userName).subscribe(
      (resp:any)=>{
       console.log(resp);
       this.nomUser= resp.lastName;
       this.prenomUser=resp.firstName;
       console.log(this.nomUser)
       if(resp){
         localStorage.setItem("userConnecter",JSON.stringify(resp));
       }})
   }
   logout(){
    localStorage.removeItem('token'); 
    localStorage.removeItem('userConnecter'); 
    localStorage.removeItem('user');
    this.router.navigate(['/accueil']);  
  }
  getEmployer(id){
        this.empService.getEmployer(id).subscribe((resp:any)=>{
          this.empInfo=resp;
          console.log(this.empInfo);

          // Id dossier
          this.createCertificatImmatriculation(resp.processFlowId);
        
    })
  }

  getDemandesByEmployeur(id){
    this.demandeService.getDemandeByEmployeur(id).subscribe((resp:any)=>{
    
      if (resp){
         for (let i = 0; i < resp.length; i++) {
          let demande:any= {} ;
          demande.typeDemande = resp[i].typeDemande;
          demande.idDossier = resp[i].idDossier;

          this.immatriculationService.getStatusAttestationRegularite(resp[i].idDossier)
                .subscribe(
                  (data:any)=>{
                    console.log(data);
                    if(data){
                      demande.statutDossier = data.value.output.description ;

                      if( data.value.output.codeStatus == 'IMPRESSION' && data.value.output.codeStatus != null){
                        this.immatriculationService.getUrlAttestationRegularite(resp[i].idDossier)
                        .subscribe(
                          (data:any)=>{
                            console.log(data);
                            if(data){
                              demande.statutDossier = "Votre demande a été traitée avec succès" ;
                              demande.urlDocument = data.value.output.url  ;
                              //this.urlAtt = data.value.output.url;
                              //this.loader = false;
                            }
                          },err=>{
                            //this.loader = false;
                            console.log(err);
                          }
                        )

                      }
                      else if(data.value.output.codeStatus == 'REJETER'){
                        demande.statutDossier = "Votre demande a été rejetée" ;
                        demande.urlDocument = "Non disponible";
                      }
                      else {
                        demande.urlDocument = "Non disponible";
                      }
                      
                       
                    }
                  },err=>{
                    console.log(err);
                     
                  });
                   
             this.demandes.push(demande);
             
        }
                
                  console.log(this.demandes);

                  this.dataSource = this.demandes ;
                  console.log(this.dataSource);
                  //console.log(this.dataSource.length)
      }
          
    
})
  }

     getStatutDemande(idDossier){
    this.immatriculationService.getStatusAttestationRegularite(idDossier)
                .subscribe(
                  (data:any)=>{
                    console.log(data);
                    if(data){
                      let statut = data.value.output.description ;
                       
                    }
                  },err=>{
                    console.log(err);
                     
                  });
 
                  

  }



  getUrlAttestation(idDossier){
    this.immatriculationService.getUrlAttestationRegularite(idDossier)
                .subscribe(
                  (data:any)=>{
                    console.log(data);
                    if(data){
                      //this.urlAtt = data.value.output.url;
                      //this.loader = false;
                    }
                  },err=>{
                    //this.loader = false;
                    console.log(err);
                  }
                )
  }



  // Récupération et affichage du certificat d'immatriculation

  createCertificatImmatriculation(processFlowId:any){
    this.loaderUrlImmat = true;
    this.loaderStatutImmat = true;


    if(!processFlowId){
      
        processFlowId = this.getEmployer(this.id);
       // console.log(this.idDossierImmat)
      
    }

    if(processFlowId){
      this.immatriculationService.getStatutCertificatImmat(processFlowId)
      .subscribe(
        (data:any)=>{
          this.loaderStatutImmat = false;
        
                  this.statutCertImm =  data.value.output.description;
                  this.immatriculationService.getUrlCertificatImmat(processFlowId)
                  .subscribe(
                    (data:any)=>{
                      this.loaderUrlImmat = false;
                      this.urlCertImmat = data.value.output.url;
                    },err=>{
                      this.loaderUrlImmat = false;
                    }
                  )
        },err=>{
          this.loaderStatutImmat = false;
        
        }
      )
    }else{
      this.statutCertImm = "Valider";
    }
  
  }


  openViewPDFDialog(titre:string,url){
    titre = "Certificat d'immatriculation";
    this.immatriculationService.attestationType = titre;
    this.immatriculationService.urlAttestation = url;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
      dialogConfig.data={
        title:titre, 
      }
      dialogConfig.width='1000px',
      dialogConfig.height='800px'
     this.dialog.open(ViewPdfComponent, dialogConfig);
  }



  openAttestationDialog(titre:string,url){
    titre = "Attestation de régularité";
    this.immatriculationService.attestationType = titre;
    this.immatriculationService.urlAttestation = url;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
      dialogConfig.data={
        title:titre, 
      }
      dialogConfig.width='1000px',
      dialogConfig.height='800px'
     this.dialog.open(ViewPdfComponent, dialogConfig);
  }

  openPaiementDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
      dialogConfig.data={
        title:"Mes Paiements", 
      }
      dialogConfig.width='1000px',
      dialogConfig.height='650px'
     this.dialog.open(PaiementComponent, dialogConfig);
  }


  openDemandeAttestationDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
      dialogConfig.data={
      title:'Attestation de régularité', 
      }
      dialogConfig.width='800px',
      dialogConfig.height='600px'
    let dialogRef= this.dialog.open(SuiviDemandeComponent, dialogConfig);
} 

goToProfil(){
  this.router.navigate(['/mon-profil']);
}

}
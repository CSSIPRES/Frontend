import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { ViewPdfComponent } from '../view-pdf/view-pdf.component';
import { ImmatriculationService } from '../services/immatriculation.service';
import { EmployeExistService } from '../services/employe-exist.service';
import { DemandesServiceService } from '../services/demandes-service.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-suivi-demande',
  templateUrl: './suivi-demande.component.html',
  styleUrls: ['./suivi-demande.component.css']
})
export class SuiviDemandeComponent implements OnInit {


  attestationForm=new FormGroup({
    typeIdentifiant:new FormControl('SCI',Validators.required),
    identifiant:new FormControl('',Validators.required),
    idEmployeur:new FormControl('',Validators.required)
  });

  immatForm=new FormGroup({
    idDossier:new FormControl('',Validators.required)
  });
  
   


  idDossierAtt:string = '';
  typeDemande:string = 'ATTESTATION DE REGURALITE';
  statutAtt:string = '';
  statutImm:string = '';
  urlAtt:string = '';
  urlImmat:string = '';
  idDossierImmat;
  isIdDossierImmatPresent:boolean = false;
  loader:boolean = false;
  loaderUrlImmat:boolean = false;

  loaderStatutImmat:boolean = false;
  panelOpenState = true;
  step = 0;
  emp:any ={} ;
  employeurs:any = [];
  demande:any = {} ;
  demandeToUpdate:any = {};

  constructor(
    private immatriculationService:ImmatriculationService,
    private snackB: MatSnackBar, private employeurService: EmployeExistService, private demandeService:DemandesServiceService,
    private dialog:MatDialog) {
      
      if(JSON.parse(localStorage.getItem("employerData"))){
        this.idDossierImmat = JSON.parse(localStorage.getItem("employerData")).processFlowId;
        this.isIdDossierImmatPresent = true;
      }else{
        this.isIdDossierImmatPresent = false;
       // this.idDossierImmat = "86047026879749";
      }
      
     
       
     
   }
 
  ngOnInit() {
    this.loader = false;

    this.employeurService.getEmpExist().subscribe((resp:any)=>{

      if(resp){
        this.employeurs = resp ;
        console.log(resp)
      }
    },err=>{
      console.log(err);
       
    }
     
    )

    console.log (this.attestationForm.getRawValue().idEmployeur);
    
  }


  opensweetalert(title, icon, text) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      timer: 7000
    })

  }




  addEmployeurtoDemandeService(){
    this.demandeService.getEmployeur(this.attestationForm.getRawValue().typeIdentifiant,this.attestationForm.getRawValue().identifiant)
    .subscribe(
      (data:any)=>{
       // console.log(data);
         
          this.emp = data ;

          console.log(this.emp);
        
      }
    )
  }



  addDemandeService(){
  this.demande.typeDemande = this.typeDemande;
  this.demande.idDossier = this.idDossierAtt;
  //this.demande.employeur = this.emp ;
   
  this.demandeService.addDemandeService(this.demande).subscribe(
    (resp:any)=>{
      if(resp){
        console.log(resp)
        
         
        //resp.employeur=this.emp ;
         this.demandeToUpdate.id = resp.id;
         this.demandeToUpdate.typeDemande = resp.typeDemande;
         this.demandeToUpdate.idDossier = resp.idDossier;
         this.demandeToUpdate.statutDossier = resp.statutDossier ;
         this.demandeToUpdate.urlDocument = resp.urlDocument;
         this.demandeToUpdate.employeur = this.emp ; 
        
        //;
       
        console.log("/////////Demande service to update ////" );
        console.log(this.demandeToUpdate);
        this.demandeService.updateDemandeService(this.demandeToUpdate).subscribe(
          (resp:any)=>{
            if(resp){
              console.log(resp)
              
      
            }
          }
        ) ;
        console.log("/////////Demande service to update ////" );

      }
    }
  ) ;
   
  }

 

  createAttestationregularite(){
    this.loader = false;
  
    console.log(this.attestationForm.getRawValue().typeIdentifiant);
   
    if(this.attestationForm.getRawValue().identifiant.length != 9){
     
      this.snackB.open("Veuillez renseigner un bon identifiant ","X", {
        duration: 5000,
        panelClass: ['my-snack-bar1', "mat-warn"],
        verticalPosition: 'top',
        horizontalPosition:'right'
     });
    
    }else{
      this.loader = true;
      this.immatriculationService.createAttestationRegularite(this.attestationForm.getRawValue().typeIdentifiant,this.attestationForm.getRawValue().identifiant)
      .subscribe(
        (resp:any)=>{
          if(resp){
            console.log(resp.value.output.idDossier);
            this.idDossierAtt = resp.value.output.idDossier;
            if(this.idDossierAtt != ''){
              this.addEmployeurtoDemandeService();
              this.addDemandeService();
              this.opensweetalert("", "success", "Demande d'attestation soumise avec succès");
              //this.loader = false;
              this.dialog.closeAll();
              
                /* this.immatriculationService.getStatusAttestationRegularite(this.idDossierAtt)
                .subscribe(
                  (data:any)=>{
                    console.log(data);
                    if(data){
                      this.statutAtt = data.value.output.description;
                      this.loader = false;
                      // Recuperation de l'employeur
                      //this.addEmployeurtoDemandeService(); //
                      // Creation de la demande de service en base avec l'employeur
                      
                       
                    }
                  },err=>{
                    console.log(err);
                    this.loader = false;
                  }
                )
                this.loader = true; */
                /* this.immatriculationService.getUrlAttestationRegularite(this.idDossierAtt)
                .subscribe(
                  (data:any)=>{
                    console.log(data);
                    if(data){
                      this.urlAtt = data.value.output.url;
                      this.loader = false;
                    }
                  },err=>{
                    this.loader = false;
                    console.log(err);
                  }
                ) */
            }
          }
        },err=>{
          console.log(err);
          this.loader = false;
          this.opensweetalert("", "error", "Identifiant non valide, veuillez recommencer");
        }
      )
  
    }

    this.loader = true;

  }

  createCertificatImmatriculation(){
    this.loaderUrlImmat = true;
    this.loaderStatutImmat = true;


    if(!this.isIdDossierImmatPresent){
      
        this.idDossierImmat = this.immatForm.getRawValue().idDossier;
       // console.log(this.idDossierImmat)
      
    }
    this.immatriculationService.getStatutCertificatImmat(this.idDossierImmat)
    .subscribe(
      (data:any)=>{
        this.loaderStatutImmat = false;
      
                this.statutImm =  data.value.output.description;
                this.immatriculationService.getUrlCertificatImmat(this.idDossierImmat)
                .subscribe(
                  (data:any)=>{
                    this.loaderUrlImmat = false;
                    this.urlImmat = data.value.output.url;
                  },err=>{
                    this.loaderUrlImmat = false;
                  }
                )
      },err=>{
        this.loaderStatutImmat = false;
      }
    )
  }


  openViewPDFDialog(titre,url){
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
}

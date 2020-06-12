import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeExistService } from '../services/employe-exist.service';
import { ImmatriculationService } from '../services/immatriculation.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ViewPdfComponent } from '../view-pdf/view-pdf.component';
import { PaiementComponent } from '../paiement/paiement.component';
import { SuiviDemandeComponent } from '../suivi-demande/suivi-demande.component';
@Component({
  selector: 'app-espace-employeur',
  templateUrl: './espace-employeur.component.html',
  styleUrls: ['./espace-employeur.component.css']
})
export class EspaceEmployeurComponent implements OnInit {
id:number;
isExpanded:boolean=false;
empInfo:any=[];

// Loader Statut and URL certification
loaderUrlImmat:boolean = false;
loaderStatutImmat:boolean = false;
statutCertImm:string = '';
urlCertImmat:string = '';


  constructor(private route : ActivatedRoute,
    private immatriculationService:ImmatriculationService,
    private dialog:MatDialog,
    private empService:EmployeExistService) { }

  ngOnInit() {
    this.loaderUrlImmat = false;
    this.loaderStatutImmat = false;
    this.statutCertImm = '';
    this.urlCertImmat = '';
    
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.getEmployer(this.id);

  }


  getEmployer(id){
        this.empService.getEmployer(id).subscribe((resp:any)=>{
          this.empInfo=resp;
          console.log(this.empInfo);

          // Id dossier
          this.createCertificatImmatriculation(resp.processFlowId);
        
    })
  }






  // Récupération et affichage du certificat d'immatriculation

  createCertificatImmatriculation(processFlowId:any){
    this.loaderUrlImmat = true;
    this.loaderStatutImmat = true;


    if(!processFlowId){
      
        processFlowId = this.getEmployer(this.id);
       // console.log(this.idDossierImmat)
      
    }
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
  }


  openViewPDFDialog(titre:string = "Certificat d'immatriculation",url){
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
}
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { ViewPdfComponent } from '../view-pdf/view-pdf.component';
import { ImmatriculationService } from '../services/immatriculation.service';


@Component({
  selector: 'app-suivi-demande',
  templateUrl: './suivi-demande.component.html',
  styleUrls: ['./suivi-demande.component.css']
})
export class SuiviDemandeComponent implements OnInit {


  attestationForm=new FormGroup({
    typeIdentifiant:new FormControl('SCI',Validators.required),
    identifiant:new FormControl('',Validators.required)
  });

  idDossierAtt:string = '';
  statutAtt:string = '';
  statutImm:string = '';
  urlAtt:string = '';
  urlImmat:string = '';
  idDossierImmat;
  loader:boolean = false;
  panelOpenState = true;
  step = 0;
  constructor(
    private immatriculationService:ImmatriculationService,
    private snackB: MatSnackBar,
    private dialog:MatDialog) {
      
      if(JSON.parse(localStorage.getItem("employerData"))){
        this.idDossierImmat = JSON.parse(localStorage.getItem("employerData")).processFlowId;
      }else{
        this.idDossierImmat = "86047026879749";
      }
      
     
       
        this.immatriculationService.getStatutCertificatImmat(this.idDossierImmat)
        .subscribe(
          (data:any)=>{
                    this.statutImm =  data.value.output.description;
                    this.immatriculationService.getUrlCertificatImmat(this.idDossierImmat)
                    .subscribe(
                      (data:any)=>{
                        this.urlImmat = data.value.output.url;
                      }
                    )
          }
        )
   }
 
  ngOnInit() {
    this.loader = false;
  }

  createAttestationregularite(){
  
    console.log(this.attestationForm.getRawValue().typeIdentifiant);
   
    if(this.attestationForm.getRawValue().identifiant.length != 9){
     
      this.snackB.open("Veuillez renseigner un bon identifiant ","X", {
        duration: 5000,
        panelClass: ['my-snack-bar1', "mat-warn"],
        verticalPosition: 'top',
        horizontalPosition:'right'
     })
    
    }else{
      this.loader = true;
      this.immatriculationService.createAttestationRegularite(this.attestationForm.getRawValue().typeIdentifiant,this.attestationForm.getRawValue().identifiant)
      .subscribe(
        (resp:any)=>{
          if(resp){
            console.log(resp.value.output.idDossier);
            this.idDossierAtt = resp.value.output.idDossier;
            if(this.idDossierAtt != ''){
                this.immatriculationService.getStatusAttestationRegularite(this.idDossierAtt)
                .subscribe(
                  (data:any)=>{
                    console.log(data);
                    if(data){
                      this.statutAtt = data.value.output.description;
                      this.loader = false;
                    }
                  },err=>{
                    console.log(err);
                    this.loader = false;
                  }
                )
                this.loader = true;
                this.immatriculationService.getUrlAttestationRegularite(this.idDossierAtt)
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
                )
            }
          }
        },err=>{
          console.log(err);
          this.loader = false;
          this.snackB.open("Identifiant non valide, veuillez recommencer","X", {
            duration: 5000,
            panelClass: ['my-snack-bar1', "mat-warn"],
            verticalPosition: 'top',
            horizontalPosition:'right'
         })
        }
      )
  
    }

    this.loader = true;

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

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImmatriculationService } from '../immatriculation.service';

import { MatSnackBar } from '@angular/material';


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
  urlAtt:string = '';
  loader:boolean = false;
  panelOpenState = true;
  step = 0;
  constructor(private immatriculationService:ImmatriculationService,private snackB: MatSnackBar) { }
 
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

}

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
    typeIdentifiant:new FormControl('',Validators.required),
    identifiant:new FormControl('',Validators.required)
  });

  constructor(private immatriculationService:ImmatriculationService,private snackB: MatSnackBar) { }

  ngOnInit() {
  }

  createAttestationregularite(){
    console.log(this.attestationForm.getRawValue().typeIdentifiant);
 
    this.immatriculationService.createAttestationRegularite(this.attestationForm.getRawValue().typeIdentifiant,this.attestationForm.getRawValue().identifiant)
    .subscribe(
      (resp)=>{
        console.log(resp);
      },err=>{
        this.snackB.open("Identifiant non valide, veuillez recommencer","X", {
          duration: 5000,
          panelClass: ['my-snack-bar1', "mat-warn"],
          verticalPosition: 'top',
          horizontalPosition:'right'
       })
      }
    ) 
  }






}

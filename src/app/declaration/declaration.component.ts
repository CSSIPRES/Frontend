import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}}]
  
})

export class DeclarationComponent implements OnInit {

  declarationForm=new FormGroup({
  input:new FormGroup ({
  informationEmployeur:new FormGroup ({
  typeIdentifiant:new FormControl('', Validators.required),
  idIdentifiant:new FormControl('', Validators.required),
  raisonSociale:new FormControl('', Validators.required),
  adresse:new FormControl('', Validators.required),
  typeDeclaration:new FormControl('', Validators.required),
  dateDebutCotisation:new FormControl('', Validators.required),
  dateFinCotisation:new FormControl('', Validators.required),
   
}),
 synthese:new FormGroup({
  totalNouvSalaries:new FormControl(''),
  totalSalaries:new FormControl(''),
  cumulTotSalAssIpresRg:new FormControl(''),
  cumulTotSalAssIpresRcc:new FormControl(''),
  cumulTotSalAssCssPf:new FormControl(''),
  cumulTotSalAssCssAtmp:new FormControl(''),
  totalSalVerses:new FormControl(''),
  mntCotPfCalcParEmployeur:new FormControl(''),
  mntCotAtMpCalcParEmployeur:new FormControl(''),
  mntCotRgCalcParEmployeur:new FormControl(''),
  mntCotRccCalcParEmployeur:new FormControl(''),
  
}), 
informationSalariesList:new FormGroup({
  numeroAssureSocial:new FormControl(''),
  nom:new FormControl(''),
  prenom:new FormControl(''), 
  dateDeNaisssance:new FormControl(''),
  typePieceIdentite:new FormControl(''),
  numeroPieceIdentite:new FormControl(''),
  typeContrat:new FormControl(''),
  dateEntree:new FormControl(''),
  dateSortie:new FormControl(''),
  motifSortie:new FormControl(''),
  nombreHeures1:new FormControl(''),
  nombreJours1:new FormControl(''),
  tempsTravail1:new FormControl(''),
  trancheTravail1:new FormControl(''),
  regimeGeneral1:new FormControl(''),
  dateEffetRegimeCadre1:new FormControl(''),
  totSalAssCssPf2:new FormControl(''),
  totSalAssCssAtmp2:new FormControl(''),
  totSalAssIpresRg2:new FormControl(''),
  totSalAssIpresRcc2:new FormControl(''),
  salaireBrut2:new FormControl(''),
  nombreJours2:new FormControl(''),
  nombreHeures2:new FormControl(''),
})
})
  })
dateErrors:boolean=false;
  constructor() { }

  ngOnInit() {
  }
  dateDiff1(d1, d2) {
    return ((d2.getTime() - d1.getTime()) / 31536000000);
  }
  compareDate(event){
    let start_cot:Date=this.declarationForm.get('startDateCot').value;
    let end_cot:Date=this.declarationForm.get('endDateCot').value;
    let diffYears: number = this.dateDiff1(new Date(start_cot),new Date(end_cot));
    console.log(diffYears);
    if(diffYears<0){
      this.dateErrors=true;
      console.log(this.dateErrors);
    }
    else{
      this.dateErrors=false;
    }
  }
  get typeIdentifiant() {
    return this.declarationForm.get('input').get('informationEmployeur').get('typeIdentifiant');
  }
  get idIdentifiant() {
    return this.declarationForm.get('input').get('informationEmployeur').get('idIdentifiant');
  }
  get raisonSociale() {
    return this.declarationForm.get('input').get('informationEmployeur').get('idIdentifiant');
  }
  get adresse() {
    return this.declarationForm.get('input').get('informationEmployeur').get('idIdentifiant');
  }
  get typeDeclaration() {
    return this.declarationForm.get('input').get('informationEmployeur').get('idIdentifiant');
  }
  get dateDebutCotisation() {
    return this.declarationForm.get('input').get('informationEmployeur').get('idIdentifiant');
  }
  get dateFinCotisation() {
    return this.declarationForm.get('input').get('informationEmployeur').get('idIdentifiant');
  }
}

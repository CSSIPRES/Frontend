import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { DeclarationService } from '../services/declaration.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}}]
  
})

export class DeclarationComponent implements OnInit {
  emp:any;
  declarationForm:FormGroup;
  dataSource:MatTableDataSource<any>
  displayBtn:boolean=false;
  loader:boolean=false;
  displayFormArr:boolean=false;
  displayedColumns: string[] = ['numeroAssureSocial', 'nomEmploye', 'prenomEmploye', 'dateNaissance','numPieceIdentite','action'];  
  displayedColumns1 = ['nomEmploye', 'prenomEmploye', 'etatCivil', 'dateNaissance','action'];
  preDnsObject:any={
    dateDebutCotisation: '',
    dateFinPeriodeCotisation: '',
    raisonSociale: '',
    typeDeclaration: '',
    typeIdentifiant: '',
    idIdentifiant: '',
    adresse: ''
  };
  
///Declaration en masse

public employeData: EmployeData[];
data = [];


  opensweetalert(title, icon){
  
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: icon,
      title: title
    })
    
  }

///// Adding function to upload ////

  onFileChange(evt: any) {
    //debugger
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length == 1) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr,  {type:'binary', cellDates:true, cellNF: false, cellText:false});
        console.log(wb);
        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        /* save data */

        ws.A2.v = "numeroAssureSocial";
        ws.B2.v = "nomEmploye";
        ws.C2.v = "prenomEmploye";
        ws.D2.v = "dateNaissance";
        ws.E2.v = "typePieceIdentite";
        ws.F2.v = "numPieceIdentite";
        ws.G2.v = "natureContrat";
        ws.H2.v = "dateEntree";
        ws.I2.v = "dateSortie";
        ws.J2.v = "motifSortie";
        ws.K2.v = "totSalAssCssPf1";
        ws.L2.v = "totSalAssCssAtmp1";
        ws.M2.v = "totSalAssIpresRg1";
        ws.N2.v = "totSalAssIpresRcc1";
        ws.O2.v = "salaireBrut1";
        ws.P2.v = "nombreJours1";
        ws.Q2.v = "nombreHeures1";
        ws.R2.v = "tempsTravail1";
        ws.S2.v = "trancheTravail1";
        ws.T2.v = "regimeGeneral1";
        ws.U2.v = "regimCompCadre1";
        ws.V2.v = "dateEffetRegimeCadre1";
        ws.W2.v = "totSalAssCssPf2";
        ws.X2.v = "totSalAssCssAtmp2";
        ws.Y2.v = "totSalAssIpresRg2";
        ws.Z2.v = "totSalAssIpresRcc2";
        ws.AA2.v = "salaireBrut2";
        ws.AB2.v = "nombreJours2";
        ws.AC2.v = "nombreHeures2";
        ws.AD2.v = "tempsTravail2";
        ws.AE2.v = "trancheTravail2";
        ws.AF2.v = "regimeGeneral2";
        ws.AG2.v = "regimCompCadre2";
        ws.AH2.v = "dateEffetRegimeCadre2";
        ws.AI2.v = "totSalAssCssPf3";
        ws.AJ2.v = "totSalAssCssAtmp3";
        ws.AK2.v = "totSalAssIpresRg3";
        ws.AL2.v = "totSalAssIpresRcc3";
        ws.AM2.v = "salaireBrut3";
        ws.AN2.v = "nombreJours3";
        ws.AO2.v = "nombreHeures3";
        ws.AP2.v = "tempsTravail3";
        ws.AQ2.v = "trancheTravail3";
        ws.AR2.v = "regimeGeneral3";
        ws.AS2.v = "regimCompCadre3";
        ws.AT2.v = "dateEffetRegimeCadre3";


        this.data = <any>(XLSX.utils.sheet_to_json(ws, 
          { raw: false,
          dateNF: "YYYY-MM-DD",
          header:1,
          defval: "" ,
          range:1
      }));
      };
      reader.readAsBinaryString(target.files[0]);
    }
  }

  

  uploadfile() {
    let keys = this.data.shift();
    let resArr = this.data.map((e) => {
      let obj = {};
      keys.forEach((key, i) => {
        obj[key] = e[i];
      });
      return obj;
    });
    //console.log(resArr);
    //resArr.forEach(function (value) {
    //  console.log(value);
    //})
    this.employeData = resArr;
    console.log(this.employeData);
  }

///// End Adding function to upload ////





initDeclarationForm(){
  this.declarationForm=this.fb.group({
 

  /* typeIdentifiant:new FormControl(this.emp.legalRepresentativeForm.typeOfIdentity, Validators.required), */
  typeIdentifiant:this.fb.control('SCI', Validators.required),
  /*  idIdentifiant:new FormControl(this.emp.employerQuery.nineaNumber, Validators.required), */
  idIdentifiant:this.fb.control(589834288, Validators.required),
  raisonSociale:this.fb.control('SP', Validators.required),
  /* adresse:new FormControl(this.emp.legalRepresentativeForm.address, Validators.required), */
  adresse:this.fb.control('DK', Validators.required),
  typeDeclaration:this.fb.control('MENSUEL', Validators.required),
  dateDebutCotisation:this.fb.control('2021-01-01', Validators.required),
  dateFinPeriodeCotisation :this.fb.control('2021-12-31', Validators.required), 
  totalNouvSalaries:this.fb.control(''),
  totalSalaries:this.fb.control(''),
  cumulTotSalAssIpresRg:this.fb.control(''),
  cumulTotSalAssIpresRcc:this.fb.control(''),
  cumulTotSalAssCssPf:this.fb.control(''),
  cumulTotSalAssCssAtmp:this.fb.control(''),
  totalSalVerses:this.fb.control(''),
  mntCotPfCalcParEmployeur:this.fb.control(''),
  mntCotAtMpCalcParEmployeur:this.fb.control(''),
  mntCotRgCalcParEmployeur:this.fb.control(''),
  mntCotRccCalcParEmployeur:this.fb.control(''), 
informationSalaries:new FormArray([
/*  this.fb.group({
    dateEffetRegimeCadre1: this.fb.control(''),
    dateEffetRegimeCadre2: this.fb.control(''),
    dateEffetRegimeCadre3: this.fb.control(''),
    dateEntree: this.fb.control(''),
    dateNaissance: this.fb.control(''),
    dateSortie: this.fb.control(''),
    motifSortie: this.fb.control(''),
    natureContrat: this.fb.control(''),
    nomEmploye: this.fb.control(''),
    nombreHeures1: this.fb.control('0'),
    nombreHeures2: this.fb.control('0'),
    nombreHeures3: this.fb.control('0'),
    nombreJours1: this.fb.control('0'),
    nombreJours2: this.fb.control('0'),
    nombreJours3: this.fb.control('0'),
    numPieceIdentite: this.fb.control(''),
    numeroAssureSocial: this.fb.control(''),
    prenomEmploye: this.fb.control(''),
    regimCompCadre1:this.fb.control('true'), 
    regimCompCadre2: this.fb.control('true'),
    regimCompCadre3: this.fb.control('true'),
    regimeGeneral1: this.fb.control('true'),
    regimeGeneral2: this.fb.control('true'),
    regimeGeneral3: this.fb.control('true'),
    salaireBrut1: this.fb.control('0'),
    salaireBrut2: this.fb.control('0'),
    salaireBrut3: this.fb.control('0'),
    tempsTravail1:this.fb.control(''),
    tempsTravail2: this.fb.control(''),
    tempsTravail3: this.fb.control(''),
    totSalAssCssAtmp1: this.fb.control('0'),
    totSalAssCssAtmp2:this.fb.control('0'),
    totSalAssCssAtmp3: this.fb.control('0'),
    totSalAssCssPf1:this.fb.control('0'),
    totSalAssCssPf2: this.fb.control(''),
    totSalAssCssPf3: this.fb.control('0'),
    totSalAssIpresRcc1:this.fb.control('0'),
    totSalAssIpresRcc2: this.fb.control('0'),
    totSalAssIpresRcc3: this.fb.control('0'),
    totSalAssIpresRg1: this.fb.control('0'),
    totSalAssIpresRg2: this.fb.control('0'),
    totSalAssIpresRg3: this.fb.control('0'),
    trancheTravail1: this.fb.control(''),
    trancheTravail2: this.fb.control(''),
    trancheTravail3: this.fb.control(''),
    typePieceIdentite: this.fb.control(''),
  }) */
])
})
}
dateErrors:boolean=false;
  constructor(private fb:FormBuilder, private decService:DeclarationService,private dialog:MatDialog,
    private snackB: MatSnackBar) {

   }

  ngOnInit() {
  this.emp= JSON.parse(window.localStorage.getItem('employerDataInput'));
  this.initDeclarationForm();
    /* this.initForm(); */
  }
  preDns(){
    this.preDnsObject.idIdentifiant=589834288;
    this.preDnsObject.typeIdentifiant='SCI';
    this.preDnsObject.adresse='lg';
    this.preDnsObject.dateDebutCotisation='2020-05-01';
    this.preDnsObject.dateFinPeriodeCotisation='2020-05-31';
    this.preDnsObject.raisonSociale=this.declarationForm.get('raisonSociale').value;
    this.preDnsObject.typeDeclaration=this.declarationForm.get('typeDeclaration').value;
   let prDns= JSON.stringify(this.preDnsObject);
    JSON.stringify(this.preDnsObject); 
    console.log(this.preDnsObject);
    this.loader=true;
    this.decService.preDns(prDns).subscribe(
       (resp:any)=>{
         console.log(resp);
         if(resp!=null){
           this.loader=false;
           this.displayBtn=true;
           
          }
        this.dataSource=resp.value.informationSalaries;
        console.log(this.dataSource);
        console.log(resp.value.informationSalaries[0]);
        
     
       this.declarationForm=new FormGroup({
          typeIdentifiant:new FormControl('SCI', Validators.required),
          idIdentifiant:new FormControl(589834288, Validators.required),
          raisonSociale:new FormControl('TEST 1234 KB', Validators.required),
          adresse:new FormControl('KEURY KAW lot 123 B', Validators.required),
          typeDeclaration:new FormControl('MENSUEL', Validators.required),
          dateDebutCotisation:new FormControl('2020-05-01', Validators.required),
          dateFinPeriodeCotisation:new FormControl('2020-05-31', Validators.required),  
          totalNouvSalaries:new FormControl(resp.value.totalNouvSalaries),
          totalSalaries:new FormControl(resp.value.totalSalaries),
          cumulTotSalAssIpresRg:new FormControl(resp.value.cumulTotSalAssIpresRg),
          cumulTotSalAssIpresRcc:new FormControl(resp.value.cumulTotSalAssIpresRcc),
          cumulTotSalAssCssPf:new FormControl(resp.value.cumulTotSalAssCssPf),
          cumulTotSalAssCssAtmp:new FormControl(resp.value.cumulTotSalAssCssAtmp),
          totalSalVerses:new FormControl(resp.value.totalSalVerses),
          mntCotPfCalcParEmployeur:new FormControl(resp.value.mntCotPfCalcParEmployeur),
          mntCotAtMpCalcParEmployeur:new FormControl(resp.value.mntCotAtMpCalcParEmployeur),
          mntCotRgCalcParEmployeur:new FormControl(resp.value.mntCotRgCalcParEmployeur),
          mntCotRccCalcParEmployeur:new FormControl(resp.value.mntCotRccCalcParEmployeur),
        informationSalaries:new FormArray([new FormGroup({
        numeroAssureSocial: new FormControl(3898226577),
        nomEmploye: new FormControl('KEBSON'),
        prenomEmploye: new FormControl('ELHADJI'),
        dateNaissance: new FormControl('1991-11-11'),
        typePieceIdentite:new FormControl('NIN'),
        numPieceIdentite: new FormControl('1549199114278'),
        natureContrat: new FormControl(null),
        dateEntree: new FormControl('2020-01-01'),
        dateSortie: new FormControl('2031-01-01'),
        motifSortie: new FormControl(null),
        totSalAssCssPf1: new FormControl(0),
        totSalAssCssAtmp1: new FormControl(0),
        totSalAssIpresRg1: new FormControl(0),
        totSalAssIpresRcc1: new FormControl(0),
        salaireBrut1: new FormControl(0),
        nombreJours1: new FormControl(0),
        nombreHeures1: new FormControl(0),
        tempsTravail1: new FormControl(null),
        trancheTravail1: new FormControl(null),
        regimeGeneral1: new FormControl(true),
        regimCompCadre1: new FormControl(false),
        dateEffetRegimeCadre1: new FormControl(null),
        totSalAssCssPf3: new FormControl(0),
        totSalAssCssAtmp3: new FormControl(0),
        totSalAssIpresRg3: new FormControl(0),
        totSalAssIpresRcc3: new FormControl(0),
        salaireBrut3: new FormControl(0),
        nombreJours3: new FormControl(0),
        nombreHeures3: new FormControl(0),
        tempsTravail3: new FormControl(null),
        trancheTravail3: new FormControl(null),
        regimeGeneral3: new FormControl(true),
        regimCompCadre3: new FormControl(false),
        dateEffetRegimeCadre3: new FormControl(null),
        totSalAssCssPf2: new FormControl(63000),
        totSalAssCssAtmp2: new FormControl(63000),
        totSalAssIpresRg2: new FormControl(360000),
        totSalAssIpresRcc2: new FormControl(900000),
        salaireBrut2: new FormControl(900000),
        nombreJours2: new FormControl(0),
        nombreHeures2: new FormControl(0),
        tempsTravail2: new FormControl('TPS_PLEIN'),
        trancheTravail2: new FormControl(null),
        regimeGeneral2: new FormControl(true),
        regimCompCadre2: new FormControl(true),
        dateEffetRegimeCadre2: new FormControl('2020-01-01')
        })])
        });
        console.log(resp.value.informationSalaries[0].numeroAssureSocial);
      
       }
     )
  }
  addDeclaration(){
    this.decService.addDeclaration(this.declarationForm.value).subscribe(resp=>{ 
      if(resp==200){
        this.loader=false;
       
        /* this.snackB.open("Demande de declaration envoyée avec succes","Fermer", {
          duration: 10000,
          panelClass: ['my-snack-bar','mat-success'],
          verticalPosition: 'bottom',
          horizontalPosition:'left'
       });   */
      this.opensweetalert("Demande de declaration envoyée avec succes","success");
       this.dialog.closeAll();
      }
      console.log(resp);
    }, err =>{
      console.log(err.error.detail);
      if(err.status==500){
        this.loader=false;
        /* this.snackB.open(err.error.detail,"Fermer", {
          duration: 5000,
          panelClass: ['my-snack-bar1', "mat-warn"],
          verticalPosition: 'bottom',
          horizontalPosition:'left'
       }) */
       this.opensweetalert(err.error.detail,"error");
      }
      }
    )
  }
  displayForm(){
    this.displayFormArr=true;
  }
 
  fillEmployeeForm(dec){
  return    new FormGroup({
      numeroAssureSocial:new FormControl(dec.numeroAssureSocial),
      nomEmploye:new FormControl(dec.nomEmploye),
      prenomEmploye:new FormControl(dec.prenomEmploye), 
      dateNaissance:new FormControl(dec.dateNaissance), 
      typePieceIdentite:new FormControl(dec.typePieceIdentite),  
      numPieceIdentite:new FormControl( dec.numPieceIdentite), 
      natureContrat: new FormControl(''),
      dateEntree: new FormControl(dec.dateEntree),
      dateSortie:new FormControl(dec.dateSortie), 
      motifSortie: new FormControl(dec.motifSortie), 
      totSalAssCssPf1: new FormControl(dec.totSalAssCssPf1), 
      totSalAssCssAtmp1: new FormControl(dec.totSalAssCssAtmp1), 
      totSalAssIpresRg1: new FormControl(dec.totSalAssIpresRg1), 
      totSalAssIpresRcc1: new FormControl(dec.totSalAssIpresRcc1), 
      salaireBrut1: new FormControl(dec.salaireBrut1), 
      nombreJours1: new FormControl(dec.nombreJours1), 
      nombreHeures1: new FormControl(dec.nombreHeures1), 
      tempsTravail1: new FormControl(dec.tempsTravail1), 
      trancheTravail1: new FormControl(dec.trancheTravail1), 
      regimeGeneral1: new FormControl(dec.regimeGeneral1), 
      regimCompCadre1: new FormControl(dec.regimCompCadre1), 
      dateEffetRegimeCadre1: new FormControl(dec.dateEffetRegimeCadre1), 
      totSalAssCssPf2:new FormControl(dec.totSalAssCssPf2),  
      totSalAssCssAtmp2:new FormControl(dec.totSalAssCssAtmp2),
      totSalAssIpresRg2: new FormControl(dec.totSalAssIpresRg2),
      totSalAssIpresRcc2:  new FormControl(dec.totSalAssIpresRg2),
      salaireBrut2: new FormControl(dec.salaireBrut2),
      nombreJours2: new FormControl(dec.nombreJours2),
      nombreHeures2: new FormControl(dec.nombreHeures2),
      tempsTravail2:new FormControl(dec.tempsTravail2), 
      trancheTravail2: new FormControl(dec.trancheTravail2),
      regimeGeneral2: new FormControl(dec.regimeGeneral2),
      regimCompCadre2: new FormControl(dec.regimCompCadre2),
      dateEffetRegimeCadre2:new FormControl(dec.dateEffetRegimeCadre2), 
      totSalAssCssPf3: new FormControl(dec.totSalAssCssPf3),
      totSalAssCssAtmp3: new FormControl(dec.totSalAssCssAtmp3),
      totSalAssIpresRg3: new FormControl(dec.totSalAssIpresRg3),
      totSalAssIpresRcc3: new FormControl(dec.totSalAssIpresRcc3),
      salaireBrut3: new FormControl(dec.salaireBrut3),
      nombreJours3: new FormControl(dec.nombreJours3),
      nombreHeures3: new FormControl(dec.nombreHeures3),
      tempsTravail3: new FormControl(dec.tempsTravail3),
      trancheTravail3: new FormControl(dec.trancheTravail3),
      regimeGeneral3:new FormControl(dec.regimeGeneral3), 
      regimCompCadre3: new FormControl(dec.regimCompCadre3),
      dateEffetRegimeCadre3: new FormControl(dec.dateEffetRegimeCadre3) })
  }
  newEmployeeForm(){
  
   return   new FormGroup({
      numeroAssureSocial:new FormControl(''),
      nomEmploye:new FormControl(''),
      prenomEmploye:new FormControl(''), 
      dateNaissance:new FormControl(''), 
      typePieceIdentite:new FormControl(''),  
      numPieceIdentite:new FormControl(''), 
      natureContrat: new FormControl(''),
      dateEntree: new FormControl(''),
      dateSortie:new FormControl(''), 
      motifSortie: new FormControl(''), 
      totSalAssCssPf1: new FormControl(''), 
      totSalAssCssAtmp1: new FormControl(''), 
      totSalAssIpresRg1: new FormControl(''), 
      totSalAssIpresRcc1: new FormControl(''), 
      salaireBrut1: new FormControl(''), 
      nombreJours1: new FormControl(''), 
      nombreHeures1: new FormControl(''), 
      tempsTravail1: new FormControl(''), 
      trancheTravail1: new FormControl(''), 
      regimeGeneral1: new FormControl(''), 
      regimCompCadre1: new FormControl(''), 
      dateEffetRegimeCadre1: new FormControl(''), 
      totSalAssCssPf2:new FormControl(''),  
      totSalAssCssAtmp2:new FormControl(''),
      totSalAssIpresRg2: new FormControl(''),
      totSalAssIpresRcc2:  new FormControl(''),
      salaireBrut2: new FormControl(''),
      nombreJours2: new FormControl(''),
      nombreHeures2: new FormControl(''),
      tempsTravail2:new FormControl(''), 
      trancheTravail2: new FormControl(''),
      regimeGeneral2: new FormControl(''),
      regimCompCadre2: new FormControl(''),
      dateEffetRegimeCadre2:new FormControl(''), 
      totSalAssCssPf3: new FormControl(''),
      totSalAssCssAtmp3: new FormControl(''),
      totSalAssIpresRg3: new FormControl(''),
      totSalAssIpresRcc3: new FormControl(''),
      salaireBrut3: new FormControl(''),
      nombreJours3: new FormControl(''),
      nombreHeures3: new FormControl(''),
      tempsTravail3: new FormControl(''),
      trancheTravail3: new FormControl(''),
      regimeGeneral3:new FormControl(''), 
      regimCompCadre3: new FormControl(''),
      dateEffetRegimeCadre3: new FormControl('') })
  }
  addItem() {
   
    /* this.employeList = this.immatForm.get('input').get('employeList') as FormArray; */ 
     (this.declarationForm.get('informationSalaries') as FormArray).push(this.newEmployeeForm());
     this.displayFormArr=true;

     console.log(this.declarationForm);
   }
   removeItem() {
    let dec=(this.declarationForm.get('informationSalaries') as FormArray);
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
  
  displayMensualite(event){
    let d1=this.declarationForm.get('dateDebutCotisation').value;
    let d2=this.declarationForm.get('dateFinPeriodeCotisation').value;
    moment(moment(d1)).format("YYYY-MM-DD");
    console.log(d1);
   
  }

  get typeIdentifiant() {
    return this.declarationForm.get('informationEmployeur').get('typeIdentifiant');
  }
  get idIdentifiant() {
    return this.declarationForm.get('informationEmployeur').get('idIdentifiant');
  }
  get raisonSociale() {
    return this.declarationForm.get('informationEmployeur').get('idIdentifiant');
  }
  get adresse() {
    return this.declarationForm.get('informationEmployeur').get('idIdentifiant');
  }
  get typeDeclaration() {
    return this.declarationForm.get('informationEmployeur').get('idIdentifiant');
  }
  get dateDebutCotisation() {
    return this.declarationForm.get('informationEmployeur').get('idIdentifiant');
  }
  get dateFinCotisation() {
    return this.declarationForm.get('informationEmployeur').get('idIdentifiant');
  }
}
 

/// Interface Employee Declaration
interface EmployeData {
  [index: number]:  {
    numeroAssureSocial:string,
    nomEmploye:string,
    prenomEmploye:string , 
    dateNaissance:Date , 
    typePieceIdentite:string,  
    numPieceIdentite:string, 
    natureContrat: string,
    dateEntree: string,
    dateSortie:string, 
    motifSortie: string, 
    totSalAssCssPf1: string, 
    totSalAssCssAtmp1: string, 
    totSalAssIpresRg1: string, 
    totSalAssIpresRcc1: string, 
    salaireBrut1: string, 
    nombreJours1: string, 
    nombreHeures1: string, 
    tempsTravail1: string, 
    trancheTravail1: string, 
    regimeGeneral1: string, 
    regimCompCadre1: string, 
    dateEffetRegimeCadre1: string, 
    totSalAssCssPf2:string,  
    totSalAssCssAtmp2:string,
    totSalAssIpresRg2: string,
    totSalAssIpresRcc2:  string,
    salaireBrut2: string,
    nombreJours2: string,
    nombreHeures2: string,
    tempsTravail2:string, 
    trancheTravail2: string,
    regimeGeneral2: string,
    regimCompCadre2: string,
    dateEffetRegimeCadre2:string, 
    totSalAssCssPf3: string,
    totSalAssCssAtmp3: string,
    totSalAssIpresRg3: string,
    totSalAssIpresRcc3: string,
    salaireBrut3: string,
    nombreJours3: string,
    nombreHeures3: string,
    tempsTravail3: string,
    trancheTravail3: string,
    regimeGeneral3:string, 
    regimCompCadre3: string,
    dateEffetRegimeCadre3: string 
};
  

  
   
  

}

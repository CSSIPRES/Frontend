import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { MatTableDataSource, MatDialog, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
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

export class DeclarationComponent implements OnInit,AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  emp:any;
  declarationForm:FormGroup;
  dataSource:MatTableDataSource<any>
  displayBtn:boolean=false;
  loader:boolean=false;
  editIndex:number;
  addIndex:number;
  addSalForm:boolean=false;
  editSalForm:boolean=false;
  displayedColumns: string[] = ['numeroAssureSocial', 'nomEmploye', 'prenomEmploye', 'dateNaissance','numPieceIdentite','action'];  
  displayedColumns1 = ['nomEmploye', 'prenomEmploye', 'etatCivil', 'dateNaissance'];
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
data:any = [];


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
    let decXslsFile=(this.declarationForm.get('informationSalaries') as FormArray);
    for(let i=0;i< this.employeData.length;i++){
      decXslsFile.push(this.fillEmployeeForm(this.employeData[i]));
      
    }
    this.dataSource=this.declarationForm.get('informationSalaries').value;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
     /* this.employeData.forEach(el=>{
      let dec=(this.declarationForm.get('informationSalaries') as FormArray);
      dec.push(this.fillEmployeeForm(el));
      this.dataSource=this.declarationForm.get('informationSalaries').value;
      console.log(this.declarationForm.get('informationSalaries').value);
    }); */
    console.log(this.employeData);
  }
  files: string[] = [];
  onFileSelected(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.files.push(event.target.files[i].name);
        console.log(event.target.files[0].name);
      }
    }
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
informationSalaries:new FormArray([])
})
}
dateErrors:boolean=false;
  constructor(private fb:FormBuilder, private decService:DeclarationService,private dialog:MatDialog,
    private snackB: MatSnackBar,private chgd:ChangeDetectorRef) {

   }
  ngAfterViewInit() {
    /* this.dataSource.sort=this.sort; */
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
    /* console.log(this.preDnsObject); */
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
      this.opensweetalert("Demande de declaration envoyée avec succes","success");
       this.dialog.closeAll();
      }
      console.log(resp);
    }, err =>{
      console.log(err.error.detail);
      if(err.status==500){
        this.loader=false;
       this.opensweetalert(err.error.detail,"error");
      }
      }
    )
  }
  displayForm(){
    this.addSalForm=true;
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
      nomEmploye:new FormControl('',Validators.required),
      prenomEmploye:new FormControl(''), 
      dateNaissance:new FormControl('',Validators.required), 
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
 
  addNewSalarie() { 
    let dec=(this.declarationForm.get('informationSalaries') as FormArray)
    dec.push(this.newEmployeeForm());
    this.addSalForm=true;
    this.editSalForm=false;
    for(let i=0;i<dec.value.length; i++){
      console.log(dec.value[i]);
    if(dec.value[i].numeroAssureSocial==""){
      this.addIndex=i;
     }
  }
   }
   fillSalForm(i){
    this.editIndex=i;
    this.addSalForm=false;
    this.editSalForm=true;
  }
   removeSal(i) {
    let dec=(this.declarationForm.get('informationSalaries') as FormArray)
     dec.removeAt(i); 
     this.dataSource=dec.value;
     /* console.log(this.dataSource); */
   }
   
 
  updateSal(){
    let dec=(this.declarationForm.get('informationSalaries') as FormArray)
    this.dataSource=dec.value; 
    this.dataSource.sort=this.sort;
    this.addSalForm=false;
    this.editSalForm=false;
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
  
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
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
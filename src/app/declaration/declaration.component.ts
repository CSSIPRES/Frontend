import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit, TemplateRef, Inject, Pipe, PipeTransform, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { MatTableDataSource, MatDialog, MatSnackBar, MatPaginator, MatSort, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { DeclarationService } from '../services/declaration.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as XLSX from 'xlsx';
import { EmployeExistService } from '../services/employe-exist.service';
import { ActivatedRoute } from '@angular/router';
import { formatCurrency, getCurrencySymbol } from '@angular/common';

@Pipe({
  name: 'mycurrency',
})
export class MycurrencyPipe implements PipeTransform {
  transform(
      value: number,
      currencyCode: string = 'XOF',
      display:
          | 'code'
          | 'symbol'
          | 'symbol-narrow'
          | string
          | boolean = 'symbol',
      digitsInfo: string = '3.2-2',
      locale: string = 'fr',
  ): string | null {
      return formatCurrency(
        value,
        locale,
        getCurrencySymbol(currencyCode, 'wide'),
        currencyCode,
        digitsInfo,
      );
  }
} 
@NgModule({
  declarations: [MycurrencyPipe]
})
@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css'],
  providers: [{
  provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}}],
 
})

export class DeclarationComponent implements OnInit,AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  emp:any;
  declarationForm:FormGroup;
  dataSource:MatTableDataSource<any>
  displayBtn:boolean=false;
  loader:boolean=false;
  loader1:boolean=false;
  editIndex:number;
  addIndex:number;
  addSalForm:boolean=false;
  editSalForm:boolean=false;
  totSalAssCssPf:number=0;
  totSalAssCssAtmp:number=0;
  totSalAssIpresRg:number=0;
  totSalAssIpresRcc:number=0;
  totalCotAtmp:number=0;
  totalCotPf:number=0;
  totalCotRcc:number=0;
  totalCotRg:number=0;
  totSalVerse:number=0;
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


opensweetalert(title, icon, text){
  
   
  
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    timer: 6000
  })
  
}

///// Adding function to upload ////
  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length == 1) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr,  {type:'binary', cellDates:true, cellNF: false, cellText:false});
        console.log(wb);
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
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
    let decXslsFile=(this.declarationForm.get('informationSalaries') as FormArray);
    for(let i=0;i< this.employeData.length;i++){
      decXslsFile.push(this.fillDecSalForm(this.employeData[i]));  
    }
    this.dataSource=this.declarationForm.get('informationSalaries').value;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cumulTotal();
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
initDeclarationForm(){
  console.log(this.data1);
  this.declarationForm=this.fb.group({
  typeIdentifiant:this.fb.control(this.data1.typeIdentifiant, Validators.required),
  idIdentifiant:this.fb.control(this.data1.idIdentifiant, Validators.required),
  raisonSociale:this.fb.control(this.data1.raisonSociale, Validators.required),
  adresse:this.fb.control(this.data1.address),
  typeDeclaration:this.fb.control('', Validators.required),   
  dateDebutCotisation:this.fb.control('', Validators.required),
  dateFinPeriodeCotisation :this.fb.control('', Validators.required), 
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
  constructor(private fb:FormBuilder,private decService:DeclarationService,private empService:EmployeExistService,  private dialog:MatDialog,
    private route : ActivatedRoute,private empExistServ:EmployeExistService,
    @Inject(MAT_DIALOG_DATA) private data1) {

   }
  ngAfterViewInit() {
    /* this.dataSource.sort=this.sort; */
  }
  id:any="";
  ngOnInit() {
  this.emp= JSON.parse(window.localStorage.getItem('employerDataInput'));
  this.initDeclarationForm();
    /* this.initForm(); */
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.getEmployer(this.id);
    /* this.cumulTotal(); */
  }
  displayMonth1:boolean=false;
  displayMonth2:boolean=false;
  displayMonth3:boolean=false;

  incrementDate(event){
  this.swictActiveDesactiveButton(event); 
  let debutCot= this.declarationForm.get('dateDebutCotisation').value;
  let finCot2:any=null;
  if(this.declarationForm.get('typeDeclaration').value=="MENSUEL") {
    let finCot1 = moment(debutCot).endOf('month').format('YYYY-MM-DD');
    console.log(finCot1); 
    this.declarationForm.get('dateFinPeriodeCotisation').patchValue(finCot1);
    let monthSate1=Number.parseInt((moment(debutCot).month()).toString()); 
    let monthSemester=(monthSate1+1)%3;
    if(monthSemester==1){
      this.displayMonth1=true;
      this.displayMonth2=false;
      this.displayMonth3=false;
    }
    else if(monthSemester==2){
      this.displayMonth1=false;
      this.displayMonth2=true;
      this.displayMonth3=false;
      
    }
    else if(monthSemester==0){
      this.displayMonth1=false;
      this.displayMonth2=false;
      this.displayMonth3=true;     
    }  
  }
  else if(this.declarationForm.get('typeDeclaration').value=="TRIMESTRIEL"){
    let monthSate=Number.parseInt((moment(debutCot).month()).toString()); 
    let monthSemester=(monthSate+1)%3;
    console.log(monthSemester);
    if(monthSemester==1){
    finCot2 = moment(debutCot).add(3,'month').subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
    this.displayMonth1=true;
    this.displayMonth2=true;
    this.displayMonth3=true;
    }
    else  if(monthSemester==2){
      finCot2 = moment(debutCot).add(2,'month').subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
      this.displayMonth1=false;
      this.displayMonth2=true;
    this.displayMonth3=true;
    }
    else  if(monthSemester==0){
      finCot2 = moment(debutCot).add(1,'month').subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
      this.displayMonth1=false;
      this.displayMonth2=false;
      this.displayMonth3=true;
    }
    this.declarationForm.get('dateFinPeriodeCotisation').patchValue(finCot2);   
  }
  }
  swictActiveDesactiveButton(event){
    this.declarationForm.valueChanges.subscribe(
    resp=>{
      if(resp!=null){
        console.log(resp);
        this.displayBtn=false;
      }
    })
  }
  preDns(){
    let debutCot= this.declarationForm.get('dateDebutCotisation').value;  
    let finCot= this.declarationForm.get('dateFinPeriodeCotisation').value;  
    let d1=moment(debutCot).format('YYYY-MM-DD');
    let d2=moment(finCot).format('YYYY-MM-DD');
    this.preDnsObject.idIdentifiant=this.data1.idIdentifiant;
    this.preDnsObject.typeIdentifiant='SCI';
    this.preDnsObject.adresse=this.data1.address;
    this.preDnsObject.dateDebutCotisation=d1;
    this.preDnsObject.dateFinPeriodeCotisation=d2;
    this.preDnsObject.raisonSociale=this.declarationForm.get('raisonSociale').value;
    this.preDnsObject.typeDeclaration=this.declarationForm.get('typeDeclaration').value;
    let typDec=this.declarationForm.get('typeDeclaration').value;
   let prDns= JSON.stringify(this.preDnsObject);
    JSON.stringify(this.preDnsObject); 
    /* console.log(this.preDnsObject); */
    /* this.loader=true; */
    this.loader1=true;
    this.decService.preDns(prDns).subscribe(
       (resp:any)=>{
       
         console.log(resp);
         if(resp!=null){     
           this.loader=false;
           this.loader1=false;
           this.displayBtn=true;
          }
       
        this.dataSource=resp.value.informationSalaries;
        console.log(this.fillListSalForm(resp.value.informationSalaries).values);
        
        /* console.log(this.fillListDecForm(resp.value.informationSalaries)); */
       this.declarationForm=new FormGroup({
        typeIdentifiant:new FormControl('SCI', Validators.required),
          idIdentifiant:new FormControl(this.data1.idIdentifiant, Validators.required),
          raisonSociale:new FormControl(this.data1.raisonSociale, Validators.required),
          adresse:new FormControl(this.data1.address),
          typeDeclaration:new FormControl(typDec, Validators.required),
          dateDebutCotisation:new FormControl(d1, Validators.required),
          dateFinPeriodeCotisation:new FormControl(d2, Validators.required),  
          totalNouvSalaries:new FormControl(resp.value.totalNouvSalaries),
          totalSalaries:new FormControl(resp.value.totalSalaries),
          cumulTotSalAssIpresRg:new FormControl(''),
          cumulTotSalAssIpresRcc:new FormControl(''),
          cumulTotSalAssCssPf:new FormControl(''),
          cumulTotSalAssCssAtmp:new FormControl(''), 
          totalSalVerses:new FormControl(''),
          mntCotPfCalcParEmployeur:new FormControl(''),
          mntCotAtMpCalcParEmployeur:new FormControl(''),
          mntCotRgCalcParEmployeur:new FormControl(''),
          mntCotRccCalcParEmployeur:new FormControl(''),
          informationSalaries:new FormArray(this.fillListSalForm(resp.value.informationSalaries))
        });
        this.cumulTotal();
       },error=>{
        if(error.status==400 || error.status==500){
          this.loader=false;
          this.loader1=false;
        }
      }
     )
     this.dataSource=this.declarationForm.get('informationSalaries').value;
     
     /* console.log(this.dataSource); */
  }
  formaDate(){
    
    let salList=this.declarationForm.get('informationSalaries').value;
    console.log(salList);
    for(let i=0;i<salList.length;i++){
      let d1=salList[i].dateNaissance;
      let d2=salList[i].dateEntree;
      let d3=salList[i].dateSortie;
      let d4=salList[i].dateEffetRegimeCadre1;
      let d5=salList[i].dateEffetRegimeCadre2;
      let d6=salList[i].dateEffetRegimeCadre3;
      if(salList[i].dateEffetRegimeCadre1!=null){
        d4=salList[i].dateEffetRegimeCadre1;
        console.log(d4); 
        salList[i].dateEffetRegimeCadre1=moment(d4).format('YYYY-MM-DD');
   
      }
      else{
        salList[i].dateEffetRegimeCadre1=null
        
      }
      if(salList[i].dateEffetRegimeCadre2!=null){
      d5=salList[i].dateEffetRegimeCadre2;
      salList[i].dateEffetRegimeCadre2=moment(d5).format('YYYY-MM-DD');
      console.log()
      }
      else{
        salList[i].dateEffetRegimeCadre2=null;
      }
      if(salList[i].dateEffetRegimeCadre3!=null){
      salList[i].dateEffetRegimeCadre3=moment(d6).format("YYYY-MM-DD");
      console.log(moment(d6).format("YYYY-MM-DD"));
      /* salList[i].dateEffetRegimeCadre3=null; */
      }
      else{
        salList[i].dateEffetRegimeCadre3=null;
      }
      salList[i].dateNaissance=moment(d1).format('YYYY-MM-DD');
      salList[i].dateEntree=moment(d2).format('YYYY-MM-DD');
      salList[i].dateSortie=moment(d3).format('YYYY-MM-DD');
      /* salList[i].dateEffetRegimeCadre1=moment(d4).format('YYYY-MM-DD'); */
      /* salList[i].dateEffetRegimeCadre2=moment(d5).format('YYYY-MM-DD'); */
      /* salList[i].dateEffetRegimeCadre3=moment(d6).format('YYYY-MM-DD'); */
    }
  }
  addDeclaration(){
    this.formaDate();
    if(this.declarationForm.get('informationSalaries').value.length!=0){ 
      console.log(this.declarationForm.get('informationSalaries').value);
      this.cumulTotal();
      this.declarationForm.get('cumulTotSalAssIpresRg').patchValue(this.totSalAssIpresRg);
      console.log(this.declarationForm.get('cumulTotSalAssIpresRg').value)
      this.declarationForm.get('cumulTotSalAssIpresRcc').patchValue(this.totSalAssIpresRcc);
      this.declarationForm.get('cumulTotSalAssCssPf').patchValue(this.totSalAssCssPf);
      this.declarationForm.get('cumulTotSalAssCssAtmp').patchValue(this.totSalAssCssAtmp);
      this.declarationForm.get('mntCotPfCalcParEmployeur').patchValue(this.totalCotPf);
      this.declarationForm.get('mntCotAtMpCalcParEmployeur').patchValue(this.totalCotAtmp);
      this.declarationForm.get('mntCotRgCalcParEmployeur').patchValue(this.totalCotRg);
      this.declarationForm.get('mntCotRccCalcParEmployeur').patchValue(this.totalCotRcc);
      this.declarationForm.get('totalSalVerses').patchValue(this.totSalVerse);
    }
   let debutCot= this.declarationForm.get('dateDebutCotisation').value;  
   let finCot= this.declarationForm.get('dateFinPeriodeCotisation').value;   
   
   console.log(debutCot);
   let d1=moment(debutCot).format('YYYY-MM-DD');
   let d2=moment(finCot).format('YYYY-MM-DD');
   console.log(this.declarationForm.value);
  
   this.declarationForm.get('dateDebutCotisation').patchValue(d1);
   this.declarationForm.get('dateFinPeriodeCotisation').patchValue(d2);
   this.loader=true;
    this.decService.addDeclaration(this.declarationForm.value).subscribe(resp=>{ 
      if(resp!=null){         
        this.loader=false;
      this.opensweetalert("","success","Declaration soumise avec succès");
       this.dialog.closeAll();  
      }
      console.log(resp);
    }, err =>{     
      console.log(err.error.detail);
      if(err.status==500){
        this.loader=false;
       this.opensweetalert("","error",err.error.detail);
      }
      }
    )
  }
  /* getListEmploye(){
    this.empExistServ.getEmpExist().subscribe(resp=>
      {
      this.listEmp=resp;
      console.log(this.listEmp);
    });
  } */
  displayForm(){
    this.addSalForm=true;
  }
 
  fillDecSalForm(dec){  
    return    new FormGroup({
    numeroAssureSocial: new FormControl(dec.numeroAssureSocial),
    nomEmploye: new FormControl(dec.nomEmploye),
    prenomEmploye: new FormControl(dec.prenomEmploye),
    dateNaissance: new FormControl(dec.dateNaissance),
    typePieceIdentite:new FormControl(dec.typePieceIdentite),
    numPieceIdentite: new FormControl(dec.numPieceIdentite),
    natureContrat: new FormControl(dec.natureContrat),
    dateEntree: new FormControl(dec.dateEntree),
    dateSortie: new FormControl(dec.dateSortie),
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
    regimeGeneral1: new FormControl(dec.regimeGeneral1.toString()),
    regimCompCadre1: new FormControl(dec.regimCompCadre1.toString()),
    dateEffetRegimeCadre1: new FormControl(dec.dateEffetRegimeCadre1),
    totSalAssCssPf3: new FormControl(dec.totSalAssCssPf3),
    totSalAssCssAtmp3: new FormControl(dec.totSalAssCssAtmp3),
    totSalAssIpresRg3: new FormControl(dec.totSalAssIpresRg3),
    totSalAssIpresRcc3: new FormControl(dec.totSalAssIpresRcc3),
    salaireBrut3: new FormControl(dec.salaireBrut3),
    nombreJours3: new FormControl(dec.nombreJours3),
    nombreHeures3: new FormControl(dec.nombreHeures3),
    tempsTravail3: new FormControl(dec.tempsTravail3),
    trancheTravail3: new FormControl(dec.trancheTravail3),
    regimeGeneral3: new FormControl(dec.regimeGeneral3.toString()),
    regimCompCadre3: new FormControl(dec.regimCompCadre3.toString()),
    dateEffetRegimeCadre3: new FormControl(dec.dateEffetRegimeCadre3),
    totSalAssCssPf2: new FormControl(dec.totSalAssCssPf2),
    totSalAssCssAtmp2: new FormControl(dec.totSalAssCssAtmp2),
    totSalAssIpresRg2: new FormControl(dec.totSalAssIpresRg2),
    totSalAssIpresRcc2: new FormControl(dec.totSalAssIpresRcc2),
    salaireBrut2: new FormControl(dec.salaireBrut2),
    nombreJours2: new FormControl(dec.nombreJours2),
    nombreHeures2: new FormControl(dec.nombreHeures2),
    tempsTravail2: new FormControl(dec.tempsTravail2),
    trancheTravail2: new FormControl(dec.trancheTravail2),
    regimeGeneral2: new FormControl(dec.regimeGeneral2.toString()),
    regimCompCadre2: new FormControl(dec.regimCompCadre2.toString()),
    dateEffetRegimeCadre2: new FormControl(dec.dateEffetRegimeCadre2)
  })
/* }  */ 
}
fillListSalForm(listSal){
  let decArray=[];
   for(let i=0;i<listSal.length;i++){
     decArray.push(this.fillDecSalForm(listSal[i]));
   }
   return  decArray;
}

  newEmployeeForm(){
   return   new FormGroup({
    numeroAssureSocial: new FormControl(''),
    nomEmploye: new FormControl(''),
    prenomEmploye: new FormControl(''),
    dateNaissance: new FormControl(null),
    typePieceIdentite:new FormControl(''),
    numPieceIdentite: new FormControl(''),
    natureContrat: new FormControl(''),
    dateEntree: new FormControl(null),
    dateSortie: new FormControl(null),
    motifSortie: new FormControl(''),
    totSalAssCssPf1: new FormControl(0),
    totSalAssCssAtmp1: new FormControl(0),
    totSalAssIpresRg1: new FormControl(0),
    totSalAssIpresRcc1: new FormControl(0),
    salaireBrut1: new FormControl(0),
    nombreJours1: new FormControl(0),
    nombreHeures1: new FormControl(0),
    tempsTravail1: new FormControl(''),
    trancheTravail1: new FormControl(''),
    regimeGeneral1: new FormControl(''),
    regimCompCadre1: new FormControl(''),
    dateEffetRegimeCadre1: new FormControl(null),
    totSalAssCssPf3: new FormControl(0),
    totSalAssCssAtmp3: new FormControl(0),
    totSalAssIpresRg3: new FormControl(0),
    totSalAssIpresRcc3: new FormControl(0),
    salaireBrut3: new FormControl(0),
    nombreJours3: new FormControl(0),
    nombreHeures3: new FormControl(0),
    tempsTravail3: new FormControl(''),
    trancheTravail3: new FormControl(''),
    regimeGeneral3: new FormControl(''),
    regimCompCadre3: new FormControl(''),
    dateEffetRegimeCadre3: new FormControl(null),
    totSalAssCssPf2: new FormControl(0),
    totSalAssCssAtmp2: new FormControl(0),
    totSalAssIpresRg2: new FormControl(0),
    totSalAssIpresRcc2: new FormControl(0),
    salaireBrut2: new FormControl(0),
    nombreJours2: new FormControl(0),
    nombreHeures2: new FormControl(0),
    tempsTravail2: new FormControl(''),
    trancheTravail2: new FormControl(''),
    regimeGeneral2: new FormControl(''),
    regimCompCadre2: new FormControl(''),
    dateEffetRegimeCadre2: new FormControl(null)
    })
  }
 
  addNewSalarie() { 
    let dec=(this.declarationForm.get('informationSalaries') as FormArray);
    dec.push(this.newEmployeeForm());
    this.addSalForm=true;
    this.editSalForm=false;
    for(let i=0;i<dec.value.length; i++){
    if(dec.value[i].numeroAssureSocial==""){
      this.addIndex=i;
     }
  }
  this.cumulTotal();
   }
   fillSalForm(i){
    this.editIndex=i;
    this.addSalForm=false;
    this.editSalForm=true;
  }
   removeSal(i) {
    let dec=(this.declarationForm.get('informationSalaries') as FormArray);
     dec.removeAt(i); 
     this.dataSource=dec.value;
     console.log(dec.value);
     this.cumulTotal();
   }
  updateSal(i){
    let dec=(this.declarationForm.get('informationSalaries') as FormArray);
    let d=dec.value[i].dateNaissance;
    let d1=moment(d).format('YYYY-MM-DD');
    dec.value[i].dateNaissance=d1;
    this.dataSource=dec.value; 
    this.dataSource.sort=this.sort;
    this.addSalForm=false;
    this.editSalForm=false;
    this.cumulTotal(); 
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
 /*  @ViewChild('callAPIDialog',{static:false}) dialogConfirm: TemplateRef<any>;
  openDialog() {
  this.dialog.open(this.dialogConfirm);
} */
  
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
  
  displayMensualite(event){
    let d1=this.declarationForm.get('dateDebutCotisation').value;
    let d2=this.declarationForm.get('dateFinPeriodeCotisation').value;
    moment(moment(d1)).format("YYYY-MM-DD");
    console.log(d1);
   
  }
    cumulTotalPartial(arr, arr1){
    let smic=36243;
    console.log(arr);  
    for(let i=0;i<=arr.length; i++){
       for(let j=0;j<arr1.length;j++){
        console.log(arr1[j]);
         if((arr[i].arr1[j]<63000
          && arr[i].arr1[j]>smic) || arr[i].arr1[j]>=63000){
            console.log(arr1[j]);
            this.totSalAssCssPf=arr[i].arr1[j] + 63000;
            console.log(this.totSalAssCssPf);
         }
         /* else if(arr[i].arr1[j]<smic){
          this.totSalAssCssPf=arr[i].arr1[j] + smic;
         } */
       }
    }
  } 
  empInfo:any=[];
  getEmployer(id){
    this.empService.getEmployer(id).subscribe(resp=>{
      this.empInfo=resp;
      console.log(this.empInfo);
    })
} 
  cumulTotal(){
    /* let arr=this.declarationForm.get('informationSalaries').value; */
    /* let arr1=["totSalAssCssPf1","totSalAssCssPf2","totSalAssCssPf3"]
    this.cumulTotalPartial(arr, arr1); */
    let smic=36243;
    let totSalAssCssPf1:number=0;
    let totSalAssCssPf2:number=0;
    let totSalAssCssPf3:number=0;
    let totSalAssCssAtmp1:number=0;
    let totSalAssCssAtmp2:number=0;
    let totSalAssCssAtmp3:number=0;
    let totSalAssIpresRg1:number=0;
    let totSalAssIpresRg2:number=0;
    let totSalAssIpresRg3:number=0;
    let totSalAssIpresRcc1:number=0;
    let totSalAssIpresRcc2:number=0;
    let totSalAssIpresRcc3:number=0;
    let salBrut1:number=0;
    let salBrut2:number=0;
    let salBrut3:number=0;
   let listSal=this.declarationForm.get('informationSalaries').value;
   console.log(listSal);
   if(listSal.length==0){
    this.totSalAssCssPf=0;
    this.totSalAssCssAtmp=0;
    this.totSalAssIpresRg=0;
    this.totSalAssIpresRcc=0;

   }
   for(let i=0;i<listSal.length;i++){
     salBrut1+=Number.parseInt((listSal[i].salaireBrut1).toString());
     salBrut2+=Number.parseInt((listSal[i].salaireBrut2).toString());
     salBrut3+=Number.parseInt((listSal[i].salaireBrut3).toString());
     if(listSal[i].salaireBrut1!=0){
     if(listSal[i].totSalAssCssPf1>=63000
       ){
      totSalAssCssPf1+=63000;
     }
     else if((listSal[i].totSalAssCssPf1<63000
      && listSal[i].totSalAssCssPf1>smic)){
        totSalAssCssPf1+=(listSal[i].totSalAssCssPf1 as number);
      }  
      else if(listSal[i].totSalAssCssPf1==0){
        totSalAssCssPf1=totSalAssCssPf1 +0;
      }   
  
     else if(listSal[i].totSalAssCssPf1<smic && listSal[i].totSalAssCssPf1>0){
      totSalAssCssPf1=totSalAssCssPf1 +smic;
      /* console.log("totSalAssCssPf12",totSalAssCssPf1);  */
     }
    }
     /* console.log(totSalAssCssPf1); */
     if(listSal[i].salaireBrut2!=0){
     if(listSal[i].totSalAssCssPf2>=63000){
      totSalAssCssPf2=totSalAssCssPf2 +63000;
     /*  console.log("totSalAssCssPf2",totSalAssCssPf2) */
     }
     else if((listSal[i].totSalAssCssPf2<63000 && listSal[i].totSalAssCssPf2>smic)){
      totSalAssCssPf2+= listSal[i].totSalAssCssPf2;
     }
     else if(listSal[i].totSalAssCssPf2==0){
      totSalAssCssPf2= totSalAssCssPf2 +0;
     }
     else if(listSal[i].totSalAssCssPf2<smic && listSal[i].totSalAssCssPf2>0){
      totSalAssCssPf2=totSalAssCssPf2 +smic;
      /* console.log("totSalAssCssPf21",totSalAssCssPf2); */
     }
    }
     /* console.log(totSalAssCssPf2); */
     if(listSal[i].salaireBrut3!=0){
     if( listSal[i].totSalAssCssPf3>=63000){
      totSalAssCssPf3=totSalAssCssPf3 +63000;
      /* console.log("totSalAssCssPf3",totSalAssCssPf3) */
     }
     else if((listSal[i].totSalAssCssPf3<63000 && listSal[i].totSalAssCssPf3>smic)){
      totSalAssCssPf3+= listSal[i].totSalAssCssPf3;
     }
     else if(listSal[i].totSalAssCssPf3==0){
      totSalAssCssPf3= totSalAssCssPf3 +0;
     }
     else if(listSal[i].totSalAssCssPf3<smic && listSal[i].totSalAssCssPf3>0){
      totSalAssCssPf3=totSalAssCssPf3 +smic;
       console.log("totSalAssCssPf31",totSalAssCssPf3); 
     }
    }
     let a=totSalAssCssPf1+totSalAssCssPf2+totSalAssCssPf3;
      
     /* console.log(totSalAssCssPf1);
     console.log(totSalAssCssPf2);
     console.log(totSalAssCssPf3);
     console.log(a); */
     this.totSalAssCssPf=a;
     this.totalCotPf= Number.parseInt((this.totSalAssCssPf*0.07).toString());
     /* console.log("Total coisation PF",this.totalCotPf);
     console.log("totSalAssCssPf",this.totSalAssCssPf);  */
     if(listSal[i].salaireBrut1!=0){
     if( listSal[i].totSalAssCssAtmp1>=63000){
      totSalAssCssAtmp1+=63000;
       /* console.log("totSalAssCssAtmp1",totSalAssCssAtmp1); */ 
     }
     else if((listSal[i].totSalAssCssAtmp1<63000 && listSal[i].totSalAssCssAtmp1>smic)){
      totSalAssCssAtmp1+=listSal[i].totSalAssCssAtmp1;
     } 
     else if(listSal[i].totSalAssCssAtmp1==0){
      totSalAssCssAtmp1=totSalAssCssAtmp1 +0;
     }
     else if(listSal[i].totSalAssCssAtmp1<smic && listSal[i].totSalAssCssAtmp1>0){
      totSalAssCssAtmp1=totSalAssCssAtmp1 +smic; 
     
     }
    }     
    if(listSal[i].salaireBrut2!=0){
     if(listSal[i].totSalAssCssAtmp2>=63000){
      totSalAssCssAtmp2+=63000;
     }
     else if((listSal[i].totSalAssCssAtmp2<63000 && listSal[i].totSalAssCssAtmp2>smic)){
      totSalAssCssAtmp2+=listSal[i].totSalAssCssAtmp2;
     }
     else if(listSal[i].totSalAssCssAtmp2==0){         
      totSalAssCssAtmp2=totSalAssCssAtmp2 +0;  
     }
     else if(listSal[i].totSalAssCssAtmp2<smic && listSal[i].totSalAssCssAtmp2>0){
      totSalAssCssAtmp2=totSalAssCssAtmp2 +smic;
     }
    }
    if(listSal[i].salaireBrut3!=0){
     if(listSal[i].totSalAssCssAtmp3>=63000){
      totSalAssCssAtmp3+=63000;
     }
     else if((listSal[i].totSalAssCssAtmp3<63000 && listSal[i].totSalAssCssAtmp3>smic)){
      totSalAssCssAtmp3+=listSal[i].totSalAssCssAtmp3;
     }
     else if(listSal[i].totSalAssCssAtmp3==0){
      totSalAssCssAtmp3=totSalAssCssAtmp3 +0;
     }
     else if(listSal[i].totSalAssCssAtmp3<smic && listSal[i].totSalAssCssAtmp3>0){
      totSalAssCssAtmp3+=smic;
     }
    }
     let b=totSalAssCssAtmp1+totSalAssCssAtmp2+totSalAssCssAtmp3;
     this.totSalAssCssAtmp=b;
     this.totalCotAtmp= Number.parseInt((this.totSalAssCssAtmp*(this.data1.tauxAT/100)).toString());
     if(listSal[i].salaireBrut1!=0){
      if( listSal[i].totSalAssIpresRcc1>=1080000){
        totSalAssIpresRcc1+=1080000;
      }
      else if((listSal[i].totSalAssIpresRcc1<1080000 && listSal[i].totSalAssIpresRcc1>smic)){
        totSalAssIpresRcc1=totSalAssIpresRcc1 +  Number.parseInt((listSal[i].totSalAssIpresRcc1).toString());;
      }
      else if(listSal[i].totSalAssIpresRcc1==0){
        totSalAssIpresRcc1=totSalAssIpresRcc1 + 0;
      }
      else if(listSal[i].totSalAssIpresRcc1<smic && listSal[i].totSalAssIpresRcc1>0){
        totSalAssIpresRcc1=totSalAssIpresRcc1 +smic; 
      }
     }
     if(listSal[i].salaireBrut2!=0){
      if(listSal[i].totSalAssIpresRcc2>=1080000){
          totSalAssIpresRcc2+=1080000;
                 
      }
      else if ((listSal[i].totSalAssIpresRcc2<1080000 && listSal[i].totSalAssIpresRcc2>smic)){
        totSalAssIpresRcc2=totSalAssIpresRcc2 +  Number.parseInt((listSal[i].totSalAssIpresRcc2).toString());;
      }
      else if(listSal[i].totSalAssIpresRcc2==0){
        totSalAssIpresRcc2=totSalAssIpresRcc2 + 0;
      }
      else if(listSal[i].totSalAssIpresRcc2<smic && listSal[i].totSalAssIpresRcc2>0){
        totSalAssIpresRcc2=totSalAssIpresRcc2 +smic;
       
      }
     }
     if(listSal[i].salaireBrut3!=0){
      if(listSal[i].totSalAssIpresRcc3>=1080000){
        totSalAssIpresRcc3=totSalAssIpresRcc3 +1080000;
      }
      else if((listSal[i].totSalAssIpresRcc3<1080000 && listSal[i].totSalAssIpresRcc3>smic)){
        totSalAssIpresRcc3=totSalAssIpresRcc3 + Number.parseInt((listSal[i].totSalAssIpresRcc3).toString());
      }
      else if(listSal[i].totSalAssIpresRcc3==0){
        totSalAssIpresRcc3=totSalAssIpresRcc3 + 0;
      }
      else if(listSal[i].totSalAssIpresRcc3<smic && listSal[i].totSalAssIpresRcc3>0){
        totSalAssIpresRcc3=totSalAssIpresRcc3 +smic;
      }
     }
    this.totSalAssIpresRcc=totSalAssIpresRcc1 + totSalAssIpresRcc2 + totSalAssIpresRcc3;
    this.totalCotRcc= Number.parseInt((this.totSalAssIpresRcc*0.06).toString());
    if(listSal[i].salaireBrut1!=0){
      if(listSal[i].totSalAssIpresRg1>=360000){
        totSalAssIpresRg1=totSalAssIpresRg1 +360000;
      }
      else if((listSal[i].totSalAssIpresRg1<360000 && listSal[i].totSalAssIpresRg1>smic) ){
        totSalAssIpresRg1+=listSal[i].totSalAssIpresRg1;
      }
      else if(listSal[i].totSalAssIpresRg1==0){
        totSalAssIpresRg1=totSalAssIpresRg1 +0;
      }
      else if(listSal[i].totSalAssIpresRg1<smic && listSal[i].totSalAssIpresRg1>0){
        totSalAssIpresRg1=totSalAssIpresRg1 +smic; 
      }
     }
     if(listSal[i].salaireBrut2!=0){
      if(listSal[i].totSalAssIpresRg2>=360000){
        totSalAssIpresRg2+=360000;
       
      }
      else if((listSal[i].totSalAssIpresRg2<360000 && listSal[i].totSalAssIpresRg2>smic)){
        totSalAssIpresRg2+=listSal[i].totSalAssIpresRg2;
      }
      else if(listSal[i].totSalAssIpresRg2==0){
        totSalAssIpresRg2=totSalAssIpresRg2 +0;
      }
      else if(listSal[i].totSalAssCssAtmp2<smic && listSal[i].totSalAssCssAtmp2>0){
        totSalAssIpresRg2=totSalAssIpresRg2 +smic;
      }
     }
     if(listSal[i].salaireBrut3!=0){
      if(listSal[i].totSalAssIpresRg3>=360000 
       ){
        totSalAssIpresRg3+=360000;
      }
      else if((listSal[i].totSalAssIpresRg3<360000 && listSal[i].totSalAssIpresRg3>smic)){
        totSalAssIpresRg3+= listSal[i].totSalAssIpresRg3;
      }
      else  if(listSal[i].totSalAssIpresRg3==0){
        totSalAssIpresRg3=totSalAssIpresRg3 + 0;
      }
      else if(listSal[i].totSalAssIpresRg3<smic && listSal[i].totSalAssIpresRg3>0){
        totSalAssIpresRg3=totSalAssIpresRg3 +smic;
      }
     }
    this.totSalAssIpresRg=Number.parseInt(totSalAssIpresRg1.toString())
    +Number.parseInt(totSalAssIpresRg2.toString()) +
    Number.parseInt(totSalAssIpresRg3.toString());
    this.totalCotRg=  Number.parseInt((this.totSalAssIpresRg*0.14).toString()); 
    console.log("Total Cotisation Rg",this.totalCotRg); 
   
   } 
   this.totSalVerse=salBrut1 +salBrut2 +salBrut3;
   console.log(this.totSalVerse); 
  }         
  get typeIdentifiant() {
    return this.declarationForm.get('typeIdentifiant');
  }
  get idIdentifiant() {
    return this.declarationForm.get('idIdentifiant');
  }
  get raisonSociale() {
    return this.declarationForm.get('raisonSociale');
  }
  get adresse() {
    return this.declarationForm.get('adresse');
  }
  get typeDeclaration() {
    return this.declarationForm.get('typeDeclaration');
  }
  get dateDebutCotisation() {
    return this.declarationForm.get('dateDebutCotisation');
  }
  get dateFinCotisation() {
    return this.declarationForm.get('dateFinCotisation');
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
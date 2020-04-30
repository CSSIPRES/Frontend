import { Component, OnInit, Input } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import * as departement from '../departement.json';
import * as regions from '../regions.json';
import * as communes from '../communes.json';
import * as arrondissement from '../arrondissement.json';
import * as quarties from '../quarties.json';
import * as countries from '../countries.json';
import * as sectors from '../sectors.json';
import * as main_sectors from '../main_sectors.json';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import {  MatDialog, MatSnackBar,  NativeDateAdapter, MatTableDataSource, MatDatepickerInputEvent} from '@angular/material';

 import { LOCALE_ID } from '@angular/core'; 

import {MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { ImmatriculationService } from '../services/immatriculation.service';
import { SaveEmployeeService } from '../services/save-employee.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';


const userName=window.localStorage.getItem("user");

@Component({
  selector: 'app-immatriculation',
  templateUrl: './immatriculation.component.html',
  styleUrls: ['./immatriculation.component.css'],
  
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}},
    
  ]
  })

export class ImmatriculationComponent implements OnInit {
  listAct:any=[];
  listSect:any=[];
  listPrAct:any=[];
  listProfession:any=[];
  showFiller = false;
  currentUser:any=[]
  empl:any={};
  documents:FormGroup;
  dateErrors:boolean=false
  listPays:any=[];
  listMainSectors:any=[];
  listSectors:any=[];
  list:any=[];
  listactivitePrincipal:any=[];
  activitePrincipal:any=[];
  listRegions:any=[];
  listD:any=[];
  listD1:any=[];
  listD2:any=[];
  listA2:any=[];
  listA:any=[];
  listA1:any=[];
  listC:any=[];
  listC1:any=[];
  sectorName:string="";
  initlistDept:any=[];
  listCommune:any=[];
  listArrondissemnt:any=[];
  listQuartie:any=[];
   listQ:any=[];
  listQ1:any=[]; 
  listSector:any=[];
  listMainSector:any=[];
  ninea:any=[];
  loader:boolean=false;
  
  nineaExist:boolean=false;
  validICN:boolean=false;
  validPassport:boolean=false;
  validDateNaiss:boolean=false;
  snackBar:boolean=true;
  immatForm:FormGroup;
  mainRegistrationForm:FormGroup;
  srcResult:any;
  validNumbOfworker:boolean=false;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  icnpattern = "^[1,2][0-9]{12,13}$";
  phonePattern = "^((\\+91-?)|0)?[0-9]{9}$";
  registreComPattern="^(SN)[.][A-Za-z0-9]{3}[.][0-9]{4}[.](A|B|C|E|M){1}[.][0-9]{1,5}$"
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['nomEmploye', 'prenomEmploye', 'etatCivil', 'dateNaissance'];
  employeInfo={
    employerType: "",
    typeEtablissement: "",
    raisonSociale: "",
    maisonMere: "",
    prenom: "",
    nom: "",
    typeIdentifiant: "",
    numeroIdentifiant: "",
    legalStatus: "",
    shortName: "",
    businessSector: "",
    mainLineOfBusiness: "",
    noOfWorkersInGenScheme: "",
    noOfWorkersInBasicScheme: "",
    region: "",
    department: "",
    arondissement: "",
    commune: "",
    qartier: "",
    address: "",
    postboxNo: "",
    telephone: "",
    email: "",
    website: "",
    zoneCss: "",
    zoneIpres: "",
    sectorCss: "",
    sectorIpres: "",
    agencyCss: "",
    agencyIpres: "",
    processFlowId: "",
    statutDossier: "",
    statutImmatriculation: "",
    idDossiers: "",
    documents: "",
    user: {
      id: "",
      login: "",
      firstName: "",
      lastName: "",
      email: "",
      activated: "",
      langKey: "",
      imageUrl: "",
      resetDate: ""
    }
  }

  constructor(private fb:FormBuilder,private dialog:MatDialog,
    private immService:ImmatriculationService,private snackB: MatSnackBar
    ,private saveEmp:SaveEmployeeService,private userService:UserService) {}




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



    addImmatriculation(){
    this.loader=true;
     this.immService.addImmatriculation(this.immatForm.value).subscribe((resp:any)=>{
       console.log(resp);
       localStorage.setItem('employerData', JSON.stringify(resp.value.output));
       localStorage.setItem('employerDataInput', JSON.stringify(resp.value.input));
       console.log(resp);
       if(resp.value.output.employerRegistrationFormId!=0){
         this.loader=false;
        this.opensweetalert("Demande immatriculation envoyée avec succes","success");
        this.dialog.closeAll();
        let emplObject=this.getEmployee(resp.value.output);
        this.saveEmp.saveEmploye(emplObject).subscribe(resp=>console.log(resp)) ;
       }
       
     }, error =>{
       console.log(error);
       if(error.status==500){
        
         this.loader=false;
         /* this.snackB.open(error.error.detail,"Fermer", {
           duration: 5000,
           panelClass: ['my-snack-bar1', "mat-warn"],
           verticalPosition: 'bottom',
           horizontalPosition:'left'
        }) */
        this.opensweetalert(error.error.detail, "error") ;
       }
       else if(error.status==0){
          this.loader=false;  
         /* this.snackB.open("Eureur d'envoi veiller vérifier la connection","Fermer", {
           duration: 5000,
           panelClass: ['my-snack-bar1', "mat-warn"],
           verticalPosition: 'bottom',
           horizontalPosition:'left'
        }) */
        this.opensweetalert("Erreur d'envoie veuillez vérifier la connexion","error");
       } 
     })
   } 
   
   initImmatForm(){
     this.immatForm=this.fb.group({
      input:  this.fb.group({
      mainRegistrationForm:this.fb.group({
    dateOfInspection:new FormControl('2020-01-01', Validators.required),
    dateOfFirstHire:this.fb.control('2020-01-01', Validators.required),
    shortName:this.fb.control(''),
    businessSector:this.fb.control('', Validators.required),
    mainLineOfBusiness:this.fb.control('', Validators.required),
    region:this.fb.control('', Validators.required),
    department:this.fb.control('', Validators.required),
    arondissement:this.fb.control('', Validators.required),
    commune:this.fb.control('', Validators.required),
    qartier:this.fb.control('', Validators.required),
    address:this.fb.control('', Validators.required),
    telephone:this.fb.control('', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.phonePattern)]}),
    email:this.fb.control('', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.emailPattern)]}),
    website:this.fb.control(''),
    noOfWorkersInBasicScheme:this.fb.control('', Validators.required),
    noOfWorkersInGenScheme:this.fb.control('', Validators.required)
      }),
      employerQuery:this.fb.group({
        employerType:this.fb.control('', Validators.required),
        legalStatus: this.fb.control('',Validators.required),
        typeEtablissement:this.fb.control('', Validators.required),
        employerName:this.fb.control('', Validators.required),
        nineaNumber:this.fb.control('',{ updateOn: 'blur',validators: [Validators.required,Validators.maxLength(9),Validators.minLength(9)]}),
        ninetNumber:this.fb.control(''),
        regType:this.fb.control('BVOLN', Validators.required),
        taxId:this.fb.control('2G3'),
        taxIdDate:this.fb.control('2020-01-01',Validators.required),
        tradeRegisterDate: this.fb.control('2020-01-01',Validators.required),
        tradeRegisterNumber:this.fb.control('',{ updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.registreComPattern)]}),
      }),
      legalRepresentativeForm:new FormGroup({
        lastName:this.fb.control('', Validators.required),
        firstName:this.fb.control('', Validators.required),
        birthdate:this.fb.control('1991-11-11', Validators.required),
        nationality:this.fb.control('', Validators.required),
        nin:this.fb.control('', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.icnpattern)]}),
        placeOfBirth:this.fb.control('', Validators.required),
        cityOfBirth:this.fb.control('', Validators.required),
        typeOfIdentity:this.fb.control('', Validators.required),
        /* ninCedeo:this.fb.control('', Validators.required),  */
        ninCedeo:this.fb.control(''),
        issuedDate:this.fb.control('2020-01-10', Validators.required),
        landLineNumber:this.fb.control('', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.phonePattern)]}),
        expiryDate:this.fb.control('2030-01-10', Validators.required),
        region:this.fb.control('', Validators.required),
        department:this.fb.control('', Validators.required),
        arondissement:this.fb.control('', Validators.required),
        commune:this.fb.control('', Validators.required),
        qartier:this.fb.control('', Validators.required),
        address:this.fb.control('', Validators.required),
        mobileNumber:this.fb.control('', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.phonePattern)]}),
        email:this.fb.control('', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.emailPattern)]}),
        identityIdNumber:this.fb.control(''),
        legalRepPerson:this.fb.control(''),
      }),
         employeList: this.fb.array([this.createItem()])  
    })
    })
   }
  
  ngOnInit() {
    this.initImmatForm()
    window.localStorage.getItem("token");
    console.log(this.immatForm.value);
    this.listRegions=(regions as any).default[0];
    this.initlistDept=(departement as any).default[0];
    this.listCommune=(communes as any).default[0];
    this.listArrondissemnt=(arrondissement as any).default[0];
    this.listQuartie=(quarties as any).default[0]; 
    this.listPays=(countries as any).default[0];
    this.listSectors=(sectors as any).default[0];
    this.listactivitePrincipal=(main_sectors as any).default[0];
    console.log(this.listactivitePrincipal);
    this.getUser();
    
}  

getUser(){
  this.userService.getUser(userName).subscribe(
    resp=>{this.currentUser =resp;
     console.log(this.currentUser) 
  }
  )
}
getEmployee(outputValue){
  console.log(this.employeInfo);
  /* this.employeeInfo.address=this.immatForm.get('mainRegistrationForm').get('address').value;*/  
 let empMainInfo=this.immatForm.get('input').get('mainRegistrationForm');
 let employeurInfo=this.immatForm.get('input').get('employerQuery');
  this.employeInfo.businessSector=empMainInfo.get('businessSector').value;
 this.employeInfo.mainLineOfBusiness=empMainInfo.get('mainLineOfBusiness').value;
 this.employeInfo.employerType=employeurInfo.get('employerType').value;
 /* this.employeInfo.raisonSociale */
 /* this.employeInfo.maisonMere */
 /* this.employeInfo.prenom */
 /* this.employeInfo.typeIdentifiant */
 /* this.employeInfo.postboxNo */
 this.employeInfo.typeEtablissement=employeurInfo.get('typeEtablissement').value;
 this.employeInfo.nom=employeurInfo.get('employerName').value;
 this.employeInfo.numeroIdentifiant=employeurInfo.get('nineaNumber').value;
 this.employeInfo.legalStatus=employeurInfo.get('legalStatus').value;
 this.employeInfo.shortName=empMainInfo.get('shortName').value;
 this.employeInfo.noOfWorkersInGenScheme= empMainInfo.get('noOfWorkersInGenScheme').value;
 this.employeInfo.noOfWorkersInBasicScheme= empMainInfo.get('noOfWorkersInBasicScheme').value;
 this.employeInfo.region= empMainInfo.get('region').value;
 this.employeInfo.department= empMainInfo.get('department').value;
 this.employeInfo.arondissement= empMainInfo.get('arondissement').value;
 this.employeInfo.commune= empMainInfo.get('commune').value;
  this.employeInfo.qartier= empMainInfo.get('qartier').value;
 this.employeInfo.address= empMainInfo.get('address').value;
 this.employeInfo.telephone= empMainInfo.get('telephone').value;
 this.employeInfo.email= empMainInfo.get('email').value;
 this.employeInfo.website= empMainInfo.get('website').value;
 this.employeInfo.zoneCss= outputValue.zoneCss;
 this.employeInfo.zoneIpres= outputValue.zoneIpres;
 this.employeInfo.sectorCss=outputValue.sectorCss;
 this.employeInfo.sectorIpres=outputValue.sectorIpres
 this.employeInfo.agencyCss=outputValue.agenceCss;
 this.employeInfo.agencyIpres=outputValue.agenceIpres;
 this.employeInfo.processFlowId=outputValue.processFlowId;
 this.employeInfo.statutDossier="statutDossier";
  this.employeInfo.statutImmatriculation=""; 
 this.employeInfo.idDossiers=null;
 this.employeInfo.documents=null;
 this.employeInfo.user.id=this.currentUser.id;
 this.employeInfo.user.login=this.currentUser.login;
 this.employeInfo.user.firstName=this.currentUser.firstName;
 this.employeInfo.user.lastName=this.currentUser.lastName;
 this.employeInfo.user.email=this.currentUser.email;
 this.employeInfo.user.activated='true';
 this.employeInfo.user.langKey="fr";
 this.employeInfo.user.imageUrl="";
 this.employeInfo.user.resetDate=null; 
 return this.employeInfo;
}

  dateDiff1(d1, d2) {
    return ((d2.getTime() - d1.getTime()) / 31536000000);
  }
 /*  listMainActivities(){
     for(let i=0;i<this.listactivitePrincipal.items.length;i++){
      for(let j=0;j<this.listactivitePrincipal.items.length;j++){
        if(this.listactivitePrincipal.items[j].secteuractivites!=
          this.listactivitePrincipal.items[i].secteuractivites){
            j++;
      }
      else{
        this.listSector.push(this.listactivitePrincipal.items[i])
      }  
    } 
    }  
    console.log(this.listSector) 
  } */
  compareDate(event){
    let date_insp:Date=this.immatForm.get('input').get('mainRegistrationForm').get('dateOfInspection').value;
    let date_ouv:Date=this.immatForm.get('input').get('mainRegistrationForm').get('dateOfFirstHire').value;
    let diffYears: number = this.dateDiff1(new Date(date_insp),new Date(date_ouv));
    console.log(diffYears);
    if(diffYears<0){
      this.dateErrors=true;
      console.log(this.dateErrors);
    }
    else{
      this.dateErrors=false;
    }
  }
  validationPiece(event){
    this.validPassport=false;
    this.validICN=false;
    let d1:Date=this.immatForm.get('inpu').get('legalRepresentativeForm').get('issuedDate').value;
    let d2:Date=this.immatForm.get('inpu').get('legalRepresentativeForm').get('expiryDate').value;
    let d3: number = this.dateDiff1(new Date(d1),new Date(d2));
    if(this.immatForm.get('input').get('legalRepresentativeForm').get('typeOfIdentity').value=="NIN"){
    if(d3< 10 || d3> 10.008219178082191){
      this.validICN=true;
      console.log(this.validICN)
    }
    else{
      this.validICN=false;
    }
  }
  else{
    if(d3 < 5 || d3 > 5.008219178082191){
      this.validPassport=true;
      console.log(this.validPassport);
    }
    else{
      this.validPassport=false;
      console.log(this.validPassport);
    }
  }
   
  }
 
  validDateNaissance(event){
    let param=this.immatForm.get('input').get('legalRepresentativeForm').get('birthdate').value;
    let current_date = new Date();
    let birth_date = new Date(param);
    let age = current_date.getFullYear() - birth_date.getFullYear();
    let month_age = current_date.getMonth() - birth_date.getMonth();
    if (month_age < 0 || (month_age === 0 && current_date.getDate() < current_date.getDate())) {
        age--;
    }
    if(age < 18){
      this.validDateNaiss = true;
    }
    else{
      this.validDateNaiss = false;
    }
  }
  validateNumbEmployee(){
    let n1=this.immatForm.get('input').get('mainRegistrationForm').get('noOfWorkersInGenScheme').value;
    let n2=this.immatForm.get('input').get('mainRegistrationForm').get('noOfWorkersInBasicScheme').value;
    if(n1>n2){
      
      this.validNumbOfworker=true;
      console.log(this.validNumbOfworker);
    }
  }
 getNineaNumber(){
   this.immService.getNineaNumber(this.immatForm.get('input').get('employerQuery').get('nineaNumber').value).subscribe(
     (resp:any)=>{
       if(resp.value.output.isTaxpayerIdentifierExist.value==true){
           this.nineaExist=true;
            /* console.log(this.nineaExist);  */
       }
       else{
        this.nineaExist=false;
       }
     }
   )
 } 

  createItem() {
    return this.fb.group({
      rechercheEmploye: this.fb.control(''),
      nomEmploye:  this.fb.control('KEBSON'),
      prenomEmploye:  this.fb.control('ELHADJI'),
      sexe:  this.fb.control('HOMME'),
      etatCivil:  this.fb.control('CEL'),
      dateNaissance:  this.fb.control('1991-11-11'),
      numRegNaiss:  this.fb.control(''),
      nomPere:  this.fb.control(''),
      prenomPere:  this.fb.control(''),
      nomMere:  this.fb.control(''),
      prenomMere:  this.fb.control(''),
      nationalite:  this.fb.control('SEN'),
      typePieceIdentite:  this.fb.control('NIN'),
      nin:  this.fb.control('1549199114278'),
      ninCedeao:  this.fb.control(''),
      numPieceIdentite:  this.fb.control(''),
      delivreLe:  this.fb.control('2020-01-01'),
      lieuDelivrance: this.fb.control('SEN'),
      expireLe:  this.fb.control('2030-01-01'),
      villeNaissance:  this.fb.control('DAKAR'),
      paysNaissance:  this.fb.control('SEN'),
      employeurPrec: this.fb.control(''),
      pays:  this.fb.control('SEN'),
      region: this.fb.control('DAKAR'),
      departement:  this.fb.control('RUFISQUE'),
      arrondissement:  this.fb.control('RUFISQUE EST'),
      commune:  this.fb.control('RUFISQUE'),
      quartier:  this.fb.control('KEURY KAW'),
      adresse:  this.fb.control('DAKAR'),
      boitePostale:  this.fb.control('12345'),
      typeMouvement:  this.fb.control('EMBAUCHE'),
      natureContrat:  this.fb.control('CDD'),
      dateDebutContrat:  this.fb.control('2020-01-01'),
      dateFinContrat: this.fb.control('2031-01-01'),
      profession: this.fb.control('Acheteurs'),
      emploi: this.fb.control('TESTEUR'),
      nonCadre: this.fb.control(''),
      ouiCadre: this.fb.control('true'),
      conventionApplicable:  this.fb.control('CC1'),
      salaireContractuel:  this.fb.control('900000'),
      tempsTravail:  this.fb.control('TPS_PLEIN'),
      categorie:  this.fb.control('9B')
     
  });
  }
  addItem(): void {
    
   /* this.employeList = this.immatForm.get('input').get('employeList') as FormArray; */ 
    this.employeList.push(this.createItem());
    
  }
selectRegion(event){
this.listD=[];
this.listD1=[];
let r=this.immatForm.get('input').get('mainRegistrationForm').get('region').value;
  let r1=this.immatForm.get('input').get('legalRepresentativeForm').get('region').value
this.initlistDept.items.forEach(element => {
  if(element.rgion==r){
    this.listD.push(element); 
   
  }
  else if(element.rgion==r1){
    this.listD1.push(element); 
  }
  }
); 
  }
selectDepartement(event){
  this.listA=[];
  this.listA1=[];
  let d1= this.immatForm.get('input').get('mainRegistrationForm').get('department').value;
  let d2=this.immatForm.get('input').get('legalRepresentativeForm').get('department').value
  this.listArrondissemnt.items.forEach(element => {
    if(element.departement==d1){
      this.listA.push(element);
      /* console.log(this.listD) */
    }
    else if(element.departement==d2){
      this.listA1.push(element);
    }
    }
  ); 
  }
  selectArrondissement(event){
    this.listC=[];
    this.listC1=[];
    let c1= this.immatForm.get('input').get('mainRegistrationForm').get('arondissement').value;
    let c2= this.immatForm.get('input').get('legalRepresentativeForm').get('arondissement').value;
    this.listCommune.items.forEach(element => {
      if(element.arrondissement==c1){
        this.listC.push(element);
      }
      else if(element.arrondissement==c2){
        this.listC1.push(element);
      }
      }
    );  
  }
  selectCommne(event){
     this.listQ=[];
    this.listQ1=[]; 
    let c1= this.immatForm.get('input').get('mainRegistrationForm').get('commune').value;
    let c2= this.immatForm.get('input').get('legalRepresentativeForm').get('commune').value;
    this.listQuartie.items.forEach(element => {
      if(element.commune==c1){
         this.listQ.push(element); 
        /* console.log(this.listQuartie); */
      }
      else if(element.commune==c2){
         this.listQ1.push(element); 
        
      }
      }
    );  
  }
  selectSector(event){ 
    let c1= this.immatForm.get('input').get('mainRegistrationForm').get('mainLineOfBusiness').value;
    console.log(c1)
    this.listactivitePrincipal.items.forEach(element => {
      if(element.activitesprincipal==c1){
     this.sectorName=element.secteuractivites;
     let bs= this.immatForm.get('input').get('mainRegistrationForm').get('businessSector');
     bs.patchValue(this.sectorName);
     console.log(bs.value);
    }
      }
    ); 
  }
  addTableEmploye(){
    this.dataSource = new MatTableDataSource(
      (this.immatForm.get('input').get('employeList') as FormArray).controls)
      console.log(this.dataSource);
  }
  @Input() private format = 'YYYY/MM/DD HH:mm:ss';
addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateValue = moment(event.value, this.format);
}
@Input() _dateValue: string = null;

get dateValue() {
    return moment(this._dateValue, this.format);
}

set dateValue(val) {
    this._dateValue = moment(val).format(this.format);
}
 /*  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  } */
  get dateOfInspection() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('dateOfInspection');
  }
  get dateOfFirstHire() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('dateOfFirstHire');
  }
  get shortName() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('shortName');
  }
  get businessSector() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('businessSector');
  }
  get mainLineOfBusiness() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('mainLineOfBusiness');
  }
  get region() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('region');
  }
  get department() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('department');
  }
  get arondissement() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('arondissement');
  }
  get commune() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('arondissement');
  }
  get qartier() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('qartier');
  }
  get address() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('address');
  }
  get telephone() {
    return this.immatForm.get('mainRegistrationForm').get('telephone');
  }
  get email() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('email');
  }
  get noOfWorkersInBasicScheme() {
    return this.immatForm.get('mainRegistrationForm').get('noOfWorkersInBasicScheme');
  }
  get noOfWorkersInGenScheme() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('noOfWorkersInGenScheme');
  }
  get website() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('website');
  }
  get employerType() {
    return this.immatForm.get('employerQuery').get('employerType');
  }
  get typeEtablissement() {
    return this.immatForm.get('input').get('employerQuery').get('typeEtablissement');
  }
  get employerName() {
    return this.immatForm.get('input').get('employerQuery').get('employerName');
  }
  get nineaNumber() {
    return this.immatForm.get('input').get('employerQuery').get('nineaNumber');
  }
  get tradeRegisterNumber() {
    return this.immatForm.get('input').get('employerQuery').get('tradeRegisterNumber');
  }
  get ninetNumber() {
    return this.immatForm.get('input').get('employerQuery').get('ninetNumber');
  }
  get companyOriginId() {
    return this.immatForm.get('input').get('employerQuery').get('companyOriginId');
  }
  get firtName() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('firtName');
  }
  get lastName() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('lastName');
  }
  get birthdate() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('birthdate');
  }
  get nationality() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('nationality');
  }
  get nin() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('nin');
  }
  get placeOfBirth() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('placeOfBirth');
  }
  get cityOfBirth() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('cityOfBirth');
  }
  get typeOfIdentity() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('typeOfIdentity');
  }
  get ninCedeo() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('ninCedeo');
  }
  get issuedDate() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('issuedDate');
  }
  get expiryDate() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('expiryDate');
  }
  get region1() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('region');
  }
  get department1() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('department');
  }
  get arondissement1() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('arondissement');
  }
  get commune1() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('commune');
  }
  get qartier1() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('qartier');
  }
  get address1() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('address');
  }
  get mobileNumber() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('mobileNumber');
  }
  get email1() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('email');
  }
  get nomEmploye() {
    return this.immatForm.get('input').get('employeList').get('nomEmploye');
  }
  get employeList() {
    return this.immatForm.get('input').get('employeList') as FormArray;
  }
  
}






















  /* immatForm=new FormGroup({
  input:new FormGroup ({
    mainRegistrationForm:new FormGroup({
    dateOfInspection:new FormControl('2020-01-01', Validators.required),
    dateOfFirstHire:new FormControl('2020-01-01', Validators.required),
    shortName:new FormControl(''),
    businessSector:new FormControl('Activités de fabrication', Validators.required),
    mainLineOfBusiness:new FormControl('ABATTAGE BETAIL', Validators.required),
    region:new FormControl('DAKAR', Validators.required),
    department:new FormControl('RUFISQUE', Validators.required),
    arondissement:new FormControl('RUFISQUE', Validators.required),
    commune:new FormControl('RUFISQUE EST', Validators.required),
    qartier:new FormControl('KEURY KAW', Validators.required),
    address:new FormControl('KEURY KAW lot 123 B', Validators.required),
    telephone:new FormControl('774142082', Validators.required),
    email:new FormControl('aloucams2@gmail.com', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.emailPattern)]}),
    website:new FormControl(''),
    noOfWorkersInBasicScheme:new FormControl('1', Validators.required),
    noOfWorkersInGenScheme:new FormControl('1', Validators.required)
  }),
    employerQuery:new FormGroup({
      employerType:new FormControl('PVT', Validators.required),
      legalStatus: new FormControl('CONC',Validators.required),
      typeEtablissement:new FormControl('HDQT', Validators.required),
      employerName:new FormControl('KB REST WS', Validators.required),
      nineaNumber:new FormControl('505750888',[Validators.required,Validators.maxLength(9)]),
      ninetNumber:new FormControl(''),
      regType:new FormControl('BVOLN', Validators.required),
      taxId:new FormControl('2G3'),
      taxIdDate:new FormControl('2020-01-01',Validators.required),
      tradeRegisterDate: new FormControl('2020-01-01',Validators.required),
      tradeRegisterNumber:new FormControl('SN.AKH.2020.C.13312',Validators.required),
    }),
    legalRepresentativeForm:new FormGroup({
      lastName:new FormControl('Al Hassane', Validators.required),
      firstName:new FormControl('CAMARA', Validators.required),
      birthdate:new FormControl('1991-11-11', Validators.required),
      nationality:new FormControl('SEN', Validators.required),
      nin:new FormControl('1548119104473', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.icnpattern)]}),
      placeOfBirth:new FormControl('Dakar', Validators.required),
      cityOfBirth:new FormControl('Dakar', Validators.required),
      typeOfIdentity:new FormControl('NIN', Validators.required),
      ninCedeo:new FormControl('', Validators.required),
      issuedDate:new FormControl('2030-01-10', Validators.required),
      landLineNumber:new FormControl('77147628', Validators.required),
      expiryDate:new FormControl('2020-01-10', Validators.required),
      region:new FormControl('Dakar', Validators.required),
      department:new FormControl('Dakar', Validators.required),
      arondissement:new FormControl('Almadies', Validators.required),
      commune:new FormControl('Dakar', Validators.required),
      qartier:new FormControl('Dakar', Validators.required),
      address:new FormControl('Dakar', Validators.required),
      mobileNumber:new FormControl('784142082', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.phonePattern)]}),
      email:new FormControl('kebe1702@gmail.com', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.emailPattern)]}),
      identityIdNumber:new FormControl(''),
      legalRepPerson:new  FormControl(''),
    })
       employeList: new FormArray([this.createItem()])  
  })
}) */
  
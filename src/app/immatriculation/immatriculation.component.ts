import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ImmatriculationService } from '../immatriculation.service';

@Component({
  selector: 'app-immatriculation',
  templateUrl: './immatriculation.component.html',
  styleUrls: ['./immatriculation.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
  })
export class ImmatriculationComponent implements OnInit {
  listAct:any=[];
  listSect:any=[];
  listPrAct:any=[];
  listProfession:any=[];
  showFiller = false;
  employerQuery:FormGroup;
  mainRegistrationForm:FormGroup;
  repLegalForm:FormGroup;
  documents:FormGroup;
  dateErrors:boolean=false

  srcResult:any;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  icnpattern = ".{13,19}";
  
  input=new FormGroup ({
    mainRegistrationForm:new FormGroup({
    dateOfInspection:new FormControl('', Validators.required),
    dateOfFirstHire:new FormControl('', Validators.required),
    shortName:new FormControl('', Validators.required),
    businessSector:new FormControl('', Validators.required),
    mainLineOfBusiness:new FormControl('', Validators.required),
    region:new FormControl('', Validators.required),
    department:new FormControl('', Validators.required),
    arondissement:new FormControl('', Validators.required),
    commune:new FormControl('', Validators.required),
    qartier:new FormControl('', Validators.required),
    address:new FormControl('', Validators.required),
    telephone:new FormControl('', Validators.required),
    email:new FormControl('', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.emailPattern)]}),
    website:new FormControl('', Validators.required),
  }),
    employerQuery:new FormGroup({
      employerType:new FormControl('', Validators.required),
      typeEtablissement:new FormControl('', Validators.required),
      employerName:new FormControl('', Validators.required),
      nineaNumber:new FormControl('', Validators.required),
      ninetNumber:new FormControl('', Validators.required),
      companyOriginId:new FormControl('', Validators.required),  
    }),
    repLegalForm:new FormGroup({
      lastName:new FormControl('', Validators.required),
      firstName:new FormControl('', Validators.required),
      birthdate:new FormControl('', Validators.required),
      nationality:new FormControl('', Validators.required),
      nin:new FormControl('', Validators.required),
      placeOfBirth:new FormControl('', Validators.required),
      cityOfBirth:new FormControl('', Validators.required),
      typeOfIdentity:new FormControl('', Validators.required),
      identityIdNumber:new FormControl('', [Validators.required, Validators.pattern(this.icnpattern)]),
      ninCedeo:new FormControl('', Validators.required),
      issuedDate:new FormControl('', Validators.required),
      expiryDate:new FormControl('', Validators.required),
      region:new FormControl('', Validators.required),
      department:new FormControl('', Validators.required),
      arondissement:new FormControl('', Validators.required),
      commune:new FormControl('', Validators.required),
      qartier:new FormControl('', Validators.required),
      address:new FormControl('', Validators.required),
      mobileNumber:new FormControl('', Validators.required),
      email:new FormControl('', Validators.required),
    })
  })
  
  
  
  constructor(private fb:FormBuilder,private dialog:MatDialog,
    private immService:ImmatriculationService) { }

  ngOnInit() {
    this.getListActivite();
    this.getListSectorAct();
    this.getPrincipAct();
    this.getProfession();
    console.log(this.input.value);
    
  }

  getListActivite(){
    this.immService.getListActivite().subscribe(
      resp=>{
      this.listAct=resp;
    }
    )
  }

  getListSectorAct(){
    this.immService.getListSectorAct().subscribe(
    resp=>  {
        this.listSect=resp
      }
    )
  }
  getPrincipAct(){
    this.immService.getPrincipAct().subscribe(
      resp=>  {
          console.log(resp);
          this.listPrAct=resp
          
        }
      )
  }
  
  getProfession(){
    this.immService.getProfession().subscribe(
      resp=>  {
          console.log(resp);
          this.listProfession=resp
        }
      )
  }
 
  dateDiff1(d1, d2) {
    return ((d2 - d1) / 31536000000);
  }

  compareDate(){
    let date_insp:Date=this.input.get('mainRegistrationForm').get('dateOfInspection').value.getTime();
    let date_ouv:Date=this.input.get('mainRegistrationForm').get('dateOfFirstHire').value;
    let diffYears: number = this.dateDiff1(new Date(date_insp),new Date(date_ouv));
    console.log(date_insp);
    if(diffYears>0){
      this.dateErrors=true;
      console.log(this.dateErrors);
    }
    else{
      this.dateErrors=true;
    }
  }


 complete(){
   console.log(this.input.value);
 }
 step1(){
   return this.employerQuery.value;
 }

onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
  get dateOfInspection() {
    return this.input.get('mainRegistrationForm').get('dateOfInspection');
  }
  get dateOfFirstHire() {
    return this.input.get('mainRegistrationForm').get('dateOfFirstHire');
  }
  get shortName() {
    return this.input.get('mainRegistrationForm').get('shortName');
  }
  get businessSector() {
    return this.input.get('mainRegistrationForm').get('businessSector');
  }
  get mainLineOfBusiness() {
    return this.input.get('mainRegistrationForm').get('mainLineOfBusiness');
  }
  get region() {
    return this.input.get('mainRegistrationForm').get('region');
  }
  get department() {
    return this.input.get('mainRegistrationForm').get('department');
  }
  get arondissement() {
    return this.input.get('mainRegistrationForm').get('arondissement');
  }
  get commune() {
    return this.input.get('mainRegistrationForm').get('arondissement');
  }
  get qartier() {
    return this.input.get('mainRegistrationForm').get('qartier');
  }
  get address() {
    return this.input.get('mainRegistrationForm').get('address');
  }
  get telephone() {
    return this.input.get('mainRegistrationForm').get('telephone');
  }
  get email() {
    return this.input.get('mainRegistrationForm').get('email');
  }
  get website() {
    return this.input.get('mainRegistrationForm').get('website');
  }
  get employerType() {
    return this.input.get('employerQuery').get('employerType');
  }
  get typeEtablissement() {
    return this.input.get('employerQuery').get('typeEtablissement');
  }
  get employerName() {
    return this.input.get('employerQuery').get('employerName');
  }
  get nineaNumber() {
    return this.input.get('employerQuery').get('nineaNumber');
  }
  get ninetNumber() {
    return this.input.get('employerQuery').get('ninetNumber');
  }
  get companyOriginId() {
    return this.input.get('employerQuery').get('companyOriginId');
  }
  get firtName() {
    return this.input.get('repLegalForm').get('firtName');
  }
  get lastName() {
    return this.input.get('repLegalForm').get('lastName');
  }
  get birthdate() {
    return this.input.get('repLegalForm').get('birthdate');
  }
  get nationality() {
    return this.input.get('repLegalForm').get('nationality');
  }
  get nin() {
    return this.input.get('repLegalForm').get('nin');
  }
  get placeOfBirth() {
    return this.input.get('repLegalForm').get('placeOfBirth');
  }
  get cityOfBirth() {
    return this.input.get('repLegalForm').get('cityOfBirth');
  }
  get typeOfIdentity() {
    return this.input.get('repLegalForm').get('typeOfIdentity');
  }
  get identityIdNumber() {
    return this.input.get('repLegalForm').get('identityIdNumber');
  }
  get ninCedeo() {
    return this.input.get('repLegalForm').get('ninCedeo');
  }
  get issuedDate() {
    return this.input.get('repLegalForm').get('issuedDate');
  }
  get expiryDate() {
    return this.input.get('repLegalForm').get('expiryDate');
  }
  get region1() {
    return this.input.get('repLegalForm').get('region');
  }
  get department1() {
    return this.input.get('repLegalForm').get('department');
  }
  get arondissement1() {
    return this.input.get('repLegalForm').get('arondissement');
  }
  get commune1() {
    return this.input.get('repLegalForm').get('commune');
  }
  get qartier1() {
    return this.input.get('repLegalForm').get('qartier');
  }
  get address1() {
    return this.input.get('repLegalForm').get('address');
  }
  get mobileNumber() {
    return this.input.get('repLegalForm').get('mobileNumber');
  }
  get email1() {
    return this.input.get('repLegalForm').get('email');
  }
}


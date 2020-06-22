import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImmatriculationService } from '../services/immatriculation.service';
import { ImmatExistanteService } from '../services/immat-existante.service';
import { SaveEmployeeService } from '../services/save-employee.service';
import { UserService } from '../services/user.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-immatriculation-exist',
  templateUrl: './immatriculation-exist.component.html',
  styleUrls: ['./immatriculation-exist.component.css']
})
export class ImmatriculationExistComponent implements OnInit {
  immatExistanteForm:FormGroup;
  loader:boolean=false;
  userName:string="";
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
    tauxAT:"",
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
  constructor(private fb:FormBuilder,private checkImmatExistServ:ImmatExistanteService
    ,private saveEmpServ:SaveEmployeeService,private userService:UserService,private snackB:MatSnackBar,
    private dialog:MatDialog) {
    this.initForm();
   }

  ngOnInit() {
     this.userName=window.localStorage.getItem("user");
     console.log(this.userName);
    this.getUser();
  }


 
  opensweetalert(title, icon, text){
  
   
  
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      timer: 6000
    })
    
  }
  
  initForm(){
    this.immatExistanteForm=this.fb.group({
      input:this.fb.group({
        numeroIdentifiant:this.fb.control("",{ updateOn: 'blur',validators: [Validators.required,Validators.maxLength(9),Validators.minLength(9)]}) ,
        typeIdentifiant:this.fb.control("",Validators.required),
        numeroUnique:this.fb.control(''),
      })
    })
  }
  checkUpdateImmatExistante(){
    this.loader=true;
    this.checkImmatExistServ.checkImmatExist(this.immatExistanteForm.value).
    subscribe((resp:any)=>{
      console.log(resp);
     if(resp.value.output!=null){
      this.loader=false;
      
         /* this.snackB.open("Demande immatriculation envoyée avec succes","Fermer", {
           duration: 10000,
           panelClass: ['my-snack-bar-6','mat-success'],
           verticalPosition: 'bottom',
           horizontalPosition:'center'
        }); */
        this.opensweetalert("","success","Employeur enregistré avec succès");
        this.dialog.closeAll();
       let emp= this.getEmployee(resp.value.output);
       console.log(emp);
       this.saveEmpServ.saveEmploye(emp).subscribe(resp=>console.log(resp));
     }
    });
  }
  currentUser:any=[];
  getUser(){
    this.userService.getUser(this.userName).subscribe(
      resp=>{this.currentUser =resp;
       console.log(this.currentUser) 
    }
    )
  }
  getEmployee(outputValue){
    
  let empExist= this.immatExistanteForm.get('input');
  this.employeInfo.typeIdentifiant=empExist.get('typeIdentifiant').value;
  this.employeInfo.numeroIdentifiant=empExist.get('numeroIdentifiant').value;
  this.employeInfo.tauxAT=outputValue.tauxAt;
  this.employeInfo.raisonSociale=outputValue.raisonSocial;
  this.employeInfo.maisonMere=outputValue.maisonMere;
  this.employeInfo.prenom=outputValue.prenom;
  this.employeInfo.nom=outputValue.nom;
  this.employeInfo.legalStatus=outputValue.legalStatus;
  this.employeInfo.shortName=outputValue.shortName;
  this.employeInfo.businessSector=outputValue.businessSector;
  this.employeInfo.mainLineOfBusiness=outputValue.mainLineOfBusiness;
  this.employeInfo.noOfWorkersInGenScheme=outputValue.noOfWorkersInGenScheme;
  this.employeInfo.noOfWorkersInBasicScheme=outputValue.noOfWorkersInBasicScheme;
  this.employeInfo.region=outputValue.region;
  this.employeInfo.department=outputValue.department;
  this.employeInfo.arondissement=outputValue.arondissement;
  this.employeInfo.commune=outputValue.commune;
  this.employeInfo.qartier=outputValue.qartier;
  this.employeInfo.address=outputValue.address;
  this.employeInfo.postboxNo=outputValue.postboxNo;
  this.employeInfo.telephone=outputValue.telephone;
  this.employeInfo.email=outputValue.email;
  this.employeInfo.website=outputValue.website;
  this.employeInfo.zoneCss=outputValue.zoneCss;
  this.employeInfo.zoneIpres=outputValue.zoneIpres;
  this.employeInfo.sectorCss=outputValue.sectorCss;
  this.employeInfo.sectorIpres=outputValue.sectorIpres;
  this.employeInfo.agencyCss=outputValue.agencyCss;
  this.employeInfo.agencyIpres=outputValue.agencyIpres;
  this.employeInfo.processFlowId=outputValue.processFlowId;
  this.employeInfo.statutDossier=outputValue.statutDossier;
  this.employeInfo.statutImmatriculation=outputValue.statutImmatriculation;
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

  console.log(this.employeInfo);
  return this.employeInfo;
  }
 
 
  get numeroIdentifiant(){
   return this.immatExistanteForm.get('input').get('numeroIdentifiant');
   }
}
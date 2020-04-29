import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImmatriculationService } from '../services/immatriculation.service';
import { ImmatExistanteService } from '../services/immat-existante.service';
import { SaveEmployeeService } from '../services/save-employee.service';
import { UserService } from '../services/user.service';
import { MatSnackBar, MatDialog } from '@angular/material';
const userName=window.localStorage.getItem("user");
@Component({
  selector: 'app-immatriculation-exist',
  templateUrl: './immatriculation-exist.component.html',
  styleUrls: ['./immatriculation-exist.component.css']
})
export class ImmatriculationExistComponent implements OnInit {
  immatExistanteForm:FormGroup;
  loader:boolean=false;
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
    tauxAt:"",
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
    this.getUser();
  }
  initForm(){
    this.immatExistanteForm=this.fb.group({
      input:this.fb.group({
        numeroIdentifiant:this.fb.control("998010808", Validators.required) ,
        typeIdentifiant:this.fb.control("SCI",Validators.required),
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
      this.dialog.closeAll();
         this.snackB.open("Demande immatriculation envoyée avec succes","Fermer", {
           duration: 10000,
           panelClass: ['my-snack-bar-6','mat-success'],
           verticalPosition: 'bottom',
           horizontalPosition:'center'
        });
       let emp= this.getEmployee(resp.value.output);
       console.log(emp);
       this.saveEmpServ.saveEmploye(emp).subscribe(resp=>console.log(resp));
     }
    });
  }
  currentUser:any=[];
  getUser(){
    this.userService.getUser(userName).subscribe(
      resp=>{this.currentUser =resp;
       console.log(this.currentUser) 
    }
    )
  }
  getEmployee(outputValue){
    
  let empExist= this.immatExistanteForm.get('input');
  this.employeInfo.typeIdentifiant=empExist.get('typeIdentifiant').value;
  this.employeInfo.numeroIdentifiant=empExist.get('numeroIdentifiant').value;
  this.employeInfo.tauxAt=outputValue.tauxAt;
  this.employeInfo.raisonSociale=outputValue.raisonSocial;
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

}

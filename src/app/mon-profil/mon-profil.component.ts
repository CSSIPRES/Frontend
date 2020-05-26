import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatSidenav, MatDialogConfig, MatDialog } from '@angular/material';
import { ImmatriculationExistComponent } from '../immatriculation-exist/immatriculation-exist.component';
import { ImmatriculationComponent } from '../immatriculation/immatriculation.component';
import { DeclarationComponent } from '../declaration/declaration.component';
import { SuiviDemandeComponent } from '../suivi-demande/suivi-demande.component';
import { PaiementComponent } from '../paiement/paiement.component';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.css']
})



export class MonProfilComponent implements OnInit {
   userConnecter = {
    firstName:"",
    lastName:"",
    email:""
  }
  validated:boolean=false;
  isExpanded:boolean=false;
  displayedColumns: string[] = ['nom', 'prenom', 'num_secu', 'icn'];
  
  isEdit:boolean = false;
  
  title:string;
  loader:boolean=true;

  @ViewChild('drawer', { static: false })
  drawer: MatSidenav; 

  constructor(private dialog:MatDialog,private loginService:LoginService) { }

  ngOnInit() {
    this.isEdit = false;
    this.getUserConnecter();
    
  }



  openImmatPopup(template:TemplateRef<any>){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(template, dialogConfig,
     
      );
  }

  openImmatDialogExist(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(ImmatriculationExistComponent, 
      {width: '900px'});
  }
  openImmatDialog(){
    const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data={
        title:this.title
      } 
      dialogConfig.width='1000px',
      dialogConfig.height='600px'
     
     this.dialog.open(ImmatriculationComponent,
      
      dialogConfig);
  }
  openDeclarationDialog(){
    const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data={
        title:this.title, 
      }
      dialogConfig.width='1000px',
      dialogConfig.height='600px'
     this.dialog.open(DeclarationComponent, dialogConfig);
  }




  openDemandeAttestationDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
      dialogConfig.data={
        title:this.title, 
      }
      dialogConfig.width='800px',
      dialogConfig.height='600px'
     this.dialog.open(SuiviDemandeComponent, dialogConfig);
  }




   openPaiementDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
      dialogConfig.data={
        title:"Mes Paiements", 
      }
      dialogConfig.width='1000px',
      dialogConfig.height='650px'
     this.dialog.open(PaiementComponent, dialogConfig);
  }


  getUserConnecter(){
    if(localStorage.getItem("user_login")){
      this.loginService.getUserByLogin(localStorage.getItem("user_login"))
      .subscribe(
        (data:any)=>{
          this.userConnecter.firstName = data.firstName;
          this.userConnecter.lastName = data.lastName;
          this.userConnecter.email = data.email;
          console.log(this.userConnecter);
        },err=>{
        }
      )
    }
 
  }







  openChangePasswordDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
      dialogConfig.data={
        title:"Changement mot de passe", 
      }
      dialogConfig.width='800px',
      dialogConfig.height='600px'
     this.dialog.open(ChangePasswordComponent, dialogConfig);
  }

}

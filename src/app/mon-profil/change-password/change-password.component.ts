import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm:FormGroup; 
  loader:boolean = false;
  passwordData = {
    currentPassword:"",
    newPassword:""
  }


  constructor(private loginService:LoginService,private fb:FormBuilder,private snackB: MatSnackBar,private dialog:MatDialog) { }

  ngOnInit() {
    this.loader = false;
    this.changePasswordForm=this.fb.group({
      currentPassword:new FormControl('',Validators.required),
      newPassword:new FormControl('', Validators.required),
      repeatPassword:new FormControl('', Validators.required),
    })
  }


  changePassword(){
    console.log(this.changePasswordForm.value['currentPassword'])
  
    if(this.changePasswordForm.value['newPassword'].length === 0 || this.changePasswordForm.value['newPassword'] != this.changePasswordForm.value['repeatPassword']){
    

     if(this.changePasswordForm.value['newPassword'].length === 0){
      this.snackB.open("Veuillez indiquer un mot de passe valide","X", {
        duration: 10000,
        panelClass: ['my-snack-bar3','mat-success'],
        verticalPosition: 'top',
        horizontalPosition:'right',
     });
     }else{
      this.snackB.open("Vos deux mots de passe ne sont pas identiques","X", {
        duration: 10000,
        panelClass: ['my-snack-bar3','mat-success'],
        verticalPosition: 'top',
        horizontalPosition:'right',
     });
     }
    }else{
      this.loader = true;
      this.passwordData.currentPassword = this.changePasswordForm.value['currentPassword'];
      this.passwordData.newPassword = this.changePasswordForm.value['newPassword'];
      this.loginService.changePassword(this.passwordData)
      .subscribe(
        (data)=>{
          console.log(data);
          this.loader = false;
          this.dialog.closeAll();
          this.loginService.logout();
          this.snackB.open("Votre mot de passe à été changé, veuillez-vous conntecter avec votre nouveau mot de passe","X", {
            duration: 10000,
            panelClass: ['my-snack-bar3','mat-success'],
            verticalPosition: 'top',
            horizontalPosition:'right',
         });

        },err=>{
          this.loader = false;
          this.snackB.open("Une erreur s'est survenue, assurez-vous que vous avez renseigner le bon mot de passe","X", {
            duration: 10000,
            panelClass: ['my-snack-bar3','mat-success'],
            verticalPosition: 'top',
            horizontalPosition:'right',
         });
        }
      ) 
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { LoginService } from '../login.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-mot-passe-oublie',
  templateUrl: './mot-passe-oublie.component.html',
  styleUrls: ['./mot-passe-oublie.component.css']
})
export class MotPasseOublieComponent implements OnInit {
  motPassOublForm:FormGroup;
  isSend:boolean = false;
  constructor(private fb:FormBuilder,private loginService:LoginService,private snackB: MatSnackBar) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.motPassOublForm=this.fb.group({
      email:new FormControl('', Validators.required),
      password:new FormControl('', Validators.required),
      passwordConf:new FormControl('', Validators.required)
    })
  }



  resetPassword(){
    if(this.motPassOublForm.value['email'].indexOf("@") == -1 || this.motPassOublForm.value['email'].indexOf(".") == -1){
      this.snackB.open("Veuillez renseigner une adresse e-mail valide","X", {
        duration: 10000,
        panelClass: ['my-snack-bar3','mat-success'],
        verticalPosition: 'top',
        horizontalPosition:'right',
     });
    }else{
      
      this.loginService.resetPasswordInit(this.motPassOublForm.value['email'])
      .subscribe(
        (data)=>{
          console.log(data)
          this.isSend = true;
        },err=>{
          console.log(err)
          this.snackB.open("Une erreur s'est survenue, veuillez s'assurer que vous avez renseigner une adresse e-mail valide","X", {
            duration: 10000,
            panelClass: ['my-snack-bar3','mat-success'],
            verticalPosition: 'top',
            horizontalPosition:'right',
         });
        }
      )
    }
  //  this.loginService.resetPasswordInit()
   
  }
}

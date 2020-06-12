import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';

import { MatSnackBar } from '@angular/material';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mot-passe-oublie',
  templateUrl: './mot-passe-oublie.component.html',
  styleUrls: ['./mot-passe-oublie.component.css']
})
export class MotPasseOublieComponent implements OnInit {
  motPassOublForm:FormGroup;
  key:string;
  isEmailSended:boolean = false;
  isSend:boolean = false;
  constructor(private fb:FormBuilder,
    private loginService:LoginService,
    private route:ActivatedRoute,
    private router:Router,
    private snackB: MatSnackBar) { }

  ngOnInit() {
    this.initForm();
    this.route.paramMap.subscribe( 
      paramMap => {
        if(paramMap){
          
          this.key = paramMap.get('key');
          if(this.key){
            console.log(paramMap.get('key'));
            if(this.key.length > 5){
              this.isSend = true;
              /*
              this.authService.activateAccount(key)
              .subscribe(
                (data:any)=>{
                  if(data.code == 200){
                    this.toast.success(data.message,"Compte activé");
                  }else{
                    this.toast.warning("Votre compte n'est pas encore activé, Vueillez utiliser le lien envoyé sur votre messagérie pour l'activer.");
                  }
                },err=>{
                  console.log(err);
                }
              )
             */
  
            }else{
              console.log("KEY non valide")
              this.isEmailSended = false;
            }
           
          }else{
           this.isEmailSended = false;
            console.log("KEY non présent")
          }
         
        }
    
      },
      err=>{
        console.error(err);
      }
      )
  }
  initForm(){
    this.motPassOublForm=this.fb.group({
      email:new FormControl('',Validators.required),
      currentPassword:new FormControl('', Validators.required),
      password:new FormControl('', Validators.required),
      newPassword:new FormControl('', Validators.required),
      passwordConf:new FormControl('',Validators.required)

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


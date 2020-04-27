import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CreationCompteService } from '../services/creation-compte.service';

@Component({
  selector: 'app-creationcompte',
  templateUrl: './creationcompte.component.html',
  styleUrls: ['./creationcompte.component.css'],
  providers: []
})
export class CreationcompteComponent implements OnInit {
emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
creationCpteForm:FormGroup;
loader:boolean;
  constructor(private fb:FormBuilder,private creCompteServ:CreationCompteService,
   private router:Router,private routerActive:ActivatedRoute,private snackB: MatSnackBar) {
   
    }
   key:string;
  ngOnInit() {
    this.initForm();
   /*  this.getKey(); */
  }
/* getKey(){
 this.routerActive.params.subscribe(data=>{
   this.key = data['key'];
   console.log(this.key);
   this.creCompteServ.activationCompte(this.key).subscribe(resp=>{
     console.log(resp)}
   )
  }
 )
} */
  initForm(){
    this.creationCpteForm=this.fb.group({
      firstName:new FormControl('',Validators.required),
      lastName:new FormControl('', Validators.required),
      email:new FormControl('',{ updateOn: 'blur', validators: [Validators.required,Validators.pattern(this.emailPattern)]}),
      login:new FormControl('', Validators.required),
      password:new FormControl('', Validators.required)
      
    })
  }
  creationCompte(){
    this.loader=true;
    if(this.creationCpteForm.invalid==true){
      this.loader=false;
    }
   this.creCompteServ.creationCompte(this.creationCpteForm.value).subscribe(
     resp=>{
      console.log(resp);
     if(resp==null){
       this.loader=false;
        this.router.navigate(['/redirect']); 
     }
    
    },error =>{
      this.loader=false;
      if(error.status==400){
        this.loader=false;
        this.snackB.open("Eurreur d'envoi veiller réessayer","", {
          duration: 5000,
          panelClass: ['my-snack-bar4', "mat-warn"],
          verticalPosition: 'bottom',
          horizontalPosition:'center',
       })
      }
    }
    )
  }
}

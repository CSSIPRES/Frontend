import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { CreationCompteService } from '../creation-compte.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-creationcompte',
  templateUrl: './creationcompte.component.html',
  styleUrls: ['./creationcompte.component.css'],
  providers: []
})
export class CreationcompteComponent implements OnInit {
creationCpteForm:FormGroup;
loader:boolean;
  constructor(private fb:FormBuilder,private creCompteServ:CreationCompteService,
   private router:Router,private routerActive:ActivatedRoute) { }
   key:string;
  ngOnInit() {
    this.initForm();
    this.getKey();
  }
getKey(){
 this.routerActive.params.subscribe(data=>{
   this.key = data['key'];
   console.log(this.key);
   this.creCompteServ.activationCompte(this.key).subscribe(resp=>{
     console.log(resp)}
   )
  }
 )
}
  initForm(){
    this.creationCpteForm=this.fb.group({
      firstName:new FormControl('',Validators.required),
      lastName:new FormControl('', Validators.required),
      email:new FormControl('', Validators.required),
      login:new FormControl('', Validators.required),
      password:new FormControl('', Validators.required),
      
    })
  }
  creationCompte(){
   this.creCompteServ.creationCompte(this.creationCpteForm.value).subscribe(
     resp=>{
     if(resp==200){
       this.router.navigate(['/accueil']);
       this.creationCpteForm.reset();
      
     }
    })
  }
}

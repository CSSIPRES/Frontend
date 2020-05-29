import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CreationCompteService } from '../services/creation-compte.service';
import Swal from 'sweetalert2';


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



  initForm(){
    this.creationCpteForm=this.fb.group({
      firstName:new FormControl('',Validators.required),
      lastName:new FormControl('', Validators.required),
      email:new FormControl('',{ updateOn: 'blur', validators: [Validators.required,Validators.pattern(this.emailPattern)]}),
      login:new FormControl('', Validators.required),
      langKey:new FormControl('fr', Validators.required),
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
       this.opensweetalert("Votre compte a été créé avec succés","success");
        this.router.navigate(['/accueil']); 
     }
    
    },error =>{
      console.log(error.error.title);
       this.loader=false;
      if(error.status==400){
        this.loader=false;
        this.snackB.open(error.error.title,"", {
          duration: 5000,
          panelClass: ['my-snack-bar4', "mat-warn"],
          verticalPosition: 'bottom',
          horizontalPosition:'center',
       })
      } 
    }
    )
  }
  get email(){
   return this.creationCpteForm.get('email');
  }
}

import { Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CreationCompteService } from '../services/creation-compte.service';
import Swal from 'sweetalert2';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  isLogin:boolean = true;
  loginForm:FormGroup;
  connection:boolean=false;
  newAccout:boolean=true;
  loader:boolean=false;
  errorMess:boolean=false;
  panelOpenState1:boolean=false;
  windowScrolled: boolean;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  /* passwordPattern="/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/" */
  passwordPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  
  creationCpteForm:FormGroup;
  key:string;
  @ViewChild('confirmPassword',{static:false}) confirmPassword:ElementRef;
  confPass:boolean=false;
  constructor(private fb:FormBuilder,
    private creCompteServ:CreationCompteService,
    private routerActive:ActivatedRoute,private snackB: MatSnackBar,
    private router:Router,
    private login: LoginService,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.isLogin = true;
    this.initForm();
    this.initFormCreateCompte();
  }

  initForm(){
    this.loginForm=this.fb.group({
     username:new FormControl('', Validators.required),
     password:new FormControl('', Validators.required)
    })
  }

  authenticate(){
    this.loader=true;
    if(this.loginForm.invalid==true){
      this.loader=false;
    }
    this.login.authenticate(this.loginForm.value).subscribe(
     
      (resp:any)=>{
     
      console.log(resp.id_token);
      if(resp.id_token!=null) {
            this.loader=false;
            this.router.navigate(['/espaceEmploye']);
             window.localStorage.setItem("token",resp.id_token ); 
             window.localStorage.setItem("user",this.loginForm.get('username').value)
             this.dialog.closeAll();
          }
       else{
         this.errorMess=true;
       }   
      },error=>{
        this.loader=false;
        this.errorMess=true;
      })
  }
  conn_account(){
     this.newAccout=false; 
    if(!this.newAccout){
      this.connection=true;
    }
  }
  close_conn(){
    if(this.connection==true){
      this.newAccout=true;
    }
    this.connection=false;
  }


  forgetPassword(){
    this.router.navigate(['/motPasseOublie']);
    this.dialog.closeAll();
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



  initFormCreateCompte(){
    this.creationCpteForm=this.fb.group({
      firstName:new FormControl('',Validators.required),
      lastName:new FormControl('', Validators.required),
      email:new FormControl('',{ updateOn: 'blur', validators: [Validators.required,Validators.pattern(this.emailPattern)]}),
      login:new FormControl('', Validators.required),
      langKey:new FormControl('fr', Validators.required),
      password:new FormControl('', { updateOn: 'blur', validators: [Validators.required,Validators.pattern(this.passwordPattern)]})
      /* password:new FormControl('', { updateOn: 'blur', validators: [Validators.required,Validators.pattern(this.passwordPattern)]}) */
      
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
        this.dialog.closeAll();
     }
    
    },error =>{
      console.log(error.error.title);
       this.loader=false;
      if(error.status==400){
        this.loader=false;
        this.snackB.open(error.error.title,"", {
          duration: 2500000,
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
  get password(){
    return this.creationCpteForm.get('password');
   }
  confirmPasswords(){
   let password=this.creationCpteForm.get('password').value;
   let confPassword=this.confirmPassword.nativeElement.value;
   if(password!=confPassword && confPassword!=""){
     this.confPass=true;
   }
   else{
     this.confPass=false;
   }
  }
}

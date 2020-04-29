import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

import { Router } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import { LoginService } from '../services/login.service';
import { EmployeExistService } from '../services/employe-exist.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  loginForm:FormGroup;
  connection:boolean=false;
  newAccout:boolean=true;
  loader:boolean=false;
  errorMess:boolean=false;
  panelOpenState1:boolean=false;

  constructor(private fb:FormBuilder,@Inject(DOCUMENT) private document: Document,
  private login: LoginService,private router:Router,private empExistServ:EmployeExistService) {
    
   }

  ngOnInit() {
    this.initForm();
    this.getEmpExist();
    /* this.wowService.init(); */
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
  windowScrolled: boolean;
  
  @HostListener("window:scroll", [])
  onWindowScroll() {
      if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
          this.windowScrolled = true;
      } 
     else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
          this.windowScrolled = false;
      }
  }
  scrollToTop() {
      (function smoothscroll() {
          var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
              window.requestAnimationFrame(smoothscroll);
              window.scrollTo(0, currentScroll - (currentScroll / 8));
          }
      })();
  }
  getEmpExist(){
    this.empExistServ.getEmpExist().subscribe(resp=>console.log(resp));
  }
}

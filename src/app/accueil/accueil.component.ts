import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

import { Router } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import { LoginService } from '../services/login.service';
import { EmployeExistService } from '../services/employe-exist.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ConnexionComponent } from '../connexion/connexion.component';

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
  isCSS:boolean = true;
  isClickAgence:boolean = false;
  checkConn:boolean=false;

  windowScrolled: boolean;
  constructor(private dialog:MatDialog,private fb:FormBuilder,@Inject(DOCUMENT) private document: Document,
  private login: LoginService,private router:Router) {
    
   }

  ngOnInit() {
    this.isCSS = true;
    this.checkConn =false;
    this.isClickAgence = false;
    this.initForm();
    this.isAuth();
    
    /* this.wowService.init(); */
  }
  initForm(){
    this.loginForm=this.fb.group({
     username:new FormControl('', Validators.required),
     password:new FormControl('', Validators.required)
    })
  }
  

  
  
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
   /* displayButton1:boolean=false
  displayButton(){
    if(this.router.navigate['/accueil']){
      this.displayButton1=true;
      console.log(this.displayButton1);
    }
  } */





  openConnexionDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
   /*   dialogConfig.data={
        title:this.title, 
      }*/
      dialogConfig.width='500px',
      dialogConfig.height='600px'
     this.dialog.open(ConnexionComponent, dialogConfig);
  }


    
  isAuth(){
    if(localStorage.getItem('token')!=null){
    this.checkConn=true;
    }
  }

}

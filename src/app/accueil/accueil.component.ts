import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  loginForm:FormGroup;
  connection:boolean=false;
  newAccout:boolean=true;

  constructor(private fb:FormBuilder,@Inject(DOCUMENT) private document: Document,
  private login: LoginService,private router:Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.loginForm=this.fb.group({
     username:new FormControl('', Validators.required),
     password:new FormControl('', Validators.required)
    })

  }
  authenticate(){
    this.login.authenticate(this.loginForm.value).subscribe(
     
      (resp:any)=>{
     
      console.log(resp.id_token);
      if(resp.id_token!=null) {
            this.router.navigate(['/espaceEmploye']);
            window.localStorage.setItem("token",resp.id_token );
          }
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
}

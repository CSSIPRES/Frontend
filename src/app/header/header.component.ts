import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AstTransformer } from '@angular/compiler/src/output/output_ast';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
@Output() event:EventEmitter<any>;
user:any=""
checkConn:boolean=false;
constructor(private ref: ChangeDetectorRef,private loginService:LoginService,
  private router:Router) {
    this.user=window.localStorage.getItem("token");

   }
  ngOnDestroy(): void {
    this.user="";
  }
  
      
  getUser(){
    if(this.user!=null){
    this.checkConn=true;
    this.ref.detectChanges();
    }
  }
  ngOnInit() {
     this.getUser(); 
  }

  logout(){
    this.checkConn = false;
    this.loginService.logout();
    this.checkConn = false;
    if( localStorage.getItem('token')!=null){
      this.checkConn = true;
      console.log(this.checkConn);
     }   
    else{
      this.checkConn = false;
      console.log( this.checkConn);
    } 
    this.router.navigate(['/accueil']);


     
  }


  goToProfil(){
    this.router.navigate(['/mon-profil']);
  }
}

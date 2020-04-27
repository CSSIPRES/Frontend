import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AstTransformer } from '@angular/compiler/src/output/output_ast';
import { LoginService } from '../services/login.service';


const user=window.localStorage.getItem("token");
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
checkConn:boolean=false;
  constructor(private ref: ChangeDetectorRef,private loginService:LoginService) {
   }
  
  
  getUser(){
    if(user!=null){
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
  }

}

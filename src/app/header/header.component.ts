import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const user=window.localStorage.getItem("token");
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
checkConn:boolean=false;
  constructor() {
    
   }
  getUser(){
    if(user!=null){
    this.checkConn=true
    console.log(this.checkConn);
  }
  }
  ngOnInit() {
    this.getUser();
  }

}

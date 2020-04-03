import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AstTransformer } from '@angular/compiler/src/output/output_ast';

const user=window.localStorage.getItem("token");
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
checkConn:boolean=false;
  constructor(private ref: ChangeDetectorRef) {
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

}

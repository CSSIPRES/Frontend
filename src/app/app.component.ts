import { Component, OnInit } from '@angular/core';
import {  WelcomeService } from './welcome.service';

import 'hammerjs'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
   /* this.getMessage(); */
  }
  hello:any;
  title = 'csswebproject';
  constructor(private welcome:WelcomeService){
  }
   getMessage(){
    return this.welcome.sayHello().subscribe(resp=>
      this.hello=resp)
  } 
}
import { Component, OnInit } from '@angular/core';


import 'hammerjs'; 
import { WelcomeService } from './services/welcome.service';

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
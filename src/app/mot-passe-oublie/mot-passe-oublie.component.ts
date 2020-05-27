import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';

import { MatSnackBar } from '@angular/material';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-mot-passe-oublie',
  templateUrl: './mot-passe-oublie.component.html',
  styleUrls: ['./mot-passe-oublie.component.css']
})   
export class MotPasseOublieComponent implements OnInit {
  motPassOublForm:FormGroup;
  constructor(private fb:FormBuilder) { }   

  ngOnInit() {
    this.initForm();     
  }
  initForm(){
    this.motPassOublForm=this.fb.group({
      email:new FormControl('',Validators.required),
      currentPassword:new FormControl('', Validators.required),
      newPassword:new FormControl('', Validators.required)
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';

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
      email:new FormControl('', Validators.required),
      password:new FormControl('', Validators.required),
      passwordConf:new FormControl('', Validators.required)
    })
  }
}

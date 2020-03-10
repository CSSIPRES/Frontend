import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

@Component({
  selector: 'app-creationcompte',
  templateUrl: './creationcompte.component.html',
  styleUrls: ['./creationcompte.component.css'],
  providers: []
})
export class CreationcompteComponent implements OnInit {
creationCpteForm:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.creationCpteForm=this.fb.group({
      nom:new FormControl('',Validators.required),
      prenom:new FormControl('', Validators.required),
      email:new FormControl('', Validators.required),
      icn:new FormControl('', Validators.required),
      password:new FormControl('', Validators.required),
      passwordConf:new FormControl('', Validators.required),
      recaptcha:new FormControl('', Validators.required)
    })
  }

}

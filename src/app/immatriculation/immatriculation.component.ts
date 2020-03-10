import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-immatriculation',
  templateUrl: './immatriculation.component.html',
  styleUrls: ['./immatriculation.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
  })
export class ImmatriculationComponent implements OnInit {
  
  showFiller = false;
  infoGenForm:FormGroup;
  infoJuridiqueForm:FormGroup;
  repLegalForm:FormGroup;
  infoSalarieForm:FormGroup;
  docJoindreForm:FormGroup;
  srcResult:any;
  
  
  constructor(private fb:FormBuilder,private dialog:MatDialog) { }

  ngOnInit() {
    
  }
  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
  
  }

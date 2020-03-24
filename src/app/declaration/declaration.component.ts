import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css']
})
export class DeclarationComponent implements OnInit {
declarationForm=new FormGroup({
  typeIdentifiant:new FormControl('', Validators.required),
  identifiantNumber:new FormControl('', Validators.required),
  raison_social:new FormControl('', Validators.required),
  adress:new FormControl('', Validators.required),
  startDateCot:new FormControl('', Validators.required),
  endDateCot:new FormControl('', Validators.required) 
}

)
dateErrors:boolean=false;
  constructor() { }

  ngOnInit() {
  }
  dateDiff1(d1, d2) {
    return ((d2.getTime() - d1.getTime()) / 31536000000);
  }
  compareDate(event){
    let start_cot:Date=this.declarationForm.get('startDateCot').value;
    let end_cot:Date=this.declarationForm.get('endDateCot').value;
    let diffYears: number = this.dateDiff1(new Date(start_cot),new Date(end_cot));
    console.log(diffYears);
    if(diffYears<0){
      this.dateErrors=true;
      console.log(this.dateErrors);
    }
    else{
      this.dateErrors=false;
    }
  }

}

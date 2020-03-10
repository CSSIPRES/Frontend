import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-immatriculation-exist',
  templateUrl: './immatriculation-exist.component.html',
  styleUrls: ['./immatriculation-exist.component.css']
})
export class ImmatriculationExistComponent implements OnInit {
  infoGenForm:FormGroup;
  constructor() { }

  ngOnInit() {
  }

}

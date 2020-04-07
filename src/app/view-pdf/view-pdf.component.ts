import { Component, OnInit } from '@angular/core';
import { ImmatriculationService } from '../immatriculation.service';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.css']
})
export class ViewPdfComponent implements OnInit {

  attestationTitle:string = "";
  attestationUrl:string = "";

  constructor(private immatriculationService:ImmatriculationService) { }

  ngOnInit() {
    this.attestationTitle = this.immatriculationService.attestationType;
    this.attestationUrl = this.immatriculationService.urlAttestation;

  }



  getURL(){
    return this.attestationUrl;
  }

}

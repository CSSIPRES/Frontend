import { Component, OnInit, Input } from '@angular/core';
import { ImmatriculationService } from '../immatriculation.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.css']
})
export class ViewPdfComponent implements OnInit {



  @Input() attestationTitle:string;
  @Input() attestationUrl:any;

  constructor(private immatriculationService:ImmatriculationService,private sanitizer: DomSanitizer) { 
  
 

  }

  ngOnInit() {
    this.attestationTitle = this.immatriculationService.attestationType;
    this.attestationUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.immatriculationService.urlAttestation);
    //this.attestationUrl = this.immatriculationService.urlAttestation;

  }



  getURL(){
    return this.attestationUrl;
  }

}

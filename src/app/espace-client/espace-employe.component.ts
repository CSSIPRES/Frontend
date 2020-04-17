import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatSidenav, MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { ImmatriculationComponent } from '../immatriculation/immatriculation.component';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { ImmatriculationExistComponent } from '../immatriculation-exist/immatriculation-exist.component';
import { DeclarationComponent } from '../declaration/declaration.component';
import { SuiviDemandeComponent } from '../suivi-demande/suivi-demande.component';
import { PaiementComponent } from '../paiement/paiement.component';

export interface Declaration {
  num_id: string;
  type_declaration: string;
  total_sal: number;
  mtn_cot: number;
}



const ELEMENT_DATA: Declaration[] = [
  {num_id: "12220300033", type_declaration: 'D1', total_sal: 1.0079, mtn_cot: 1223098376564},
  {num_id: "KANE", type_declaration: 'D2', total_sal: 1.0079, mtn_cot: 2430053734563}
];

@Component({
  selector: 'app-espace-client',
  templateUrl: './espace-employe.component.html',
  styleUrls: ['./espace-employe.component.css']
})

export class EspaceEmployeComponent implements OnInit {
  validated:boolean=false;
  isExpanded:boolean=false;
  displayedColumns: string[] = ['nom', 'prenom', 'num_secu', 'icn'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  title:string;
  loader:boolean=true;

  @ViewChild('drawer', { static: false })
  drawer: MatSidenav; 
  constructor(private dialog:MatDialog) {
   
   }

  ngOnInit() {
    
  }
  openImmatPopup(template:TemplateRef<any>){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(template, dialogConfig,
     
      );
  }

  openImmatDialogExist(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(ImmatriculationExistComponent, 
      {width: '900px'});
  }
  openImmatDialog(){
    const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data={
        title:this.title
      } 
      dialogConfig.width='1000px',
      dialogConfig.height='600px'
     
     this.dialog.open(ImmatriculationComponent,
      
      dialogConfig);
  }
  openDeclarationDialog(){
    const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data={
        title:this.title, 
      }
      dialogConfig.width='1000px',
      dialogConfig.height='600px'
     this.dialog.open(DeclarationComponent, dialogConfig);
  }




  openDemandeAttestationDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
      dialogConfig.data={
        title:this.title, 
      }
      dialogConfig.width='800px',
      dialogConfig.height='600px'
     this.dialog.open(SuiviDemandeComponent, dialogConfig);
  }




  openPaiementDialog(titre,url){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
      dialogConfig.data={
        title:titre, 
      }
      dialogConfig.width='800px',
      dialogConfig.height='600px'
     this.dialog.open(PaiementComponent, dialogConfig);
  }
 
}

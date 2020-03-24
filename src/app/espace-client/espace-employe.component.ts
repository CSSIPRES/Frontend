import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatSidenav, MatDialog, MatDialogConfig } from '@angular/material';
import { ImmatriculationComponent } from '../immatriculation/immatriculation.component';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { ImmatriculationExistComponent } from '../immatriculation-exist/immatriculation-exist.component';
import { DeclarationComponent } from '../declaration/declaration.component';

export interface PeriodicElement {
  nom: string;
  prenom: string;
  num_secu: string;
  icn: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {nom: 'CAMARA', prenom: 'Al Hassane', num_secu:'332423', icn: '11323'},
  {nom: 'DIOP', prenom: 'Ousmane', num_secu:'122323', icn: '344232'}, 
];
@Component({
  selector: 'app-espace-client',
  templateUrl: './espace-employe.component.html',
  styleUrls: ['./espace-employe.component.css']
})

export class EspaceEmployeComponent implements OnInit {
  validated:boolean=false;
  displayedColumns: string[] = ['nom', 'prenom', 'num_secu', 'icn'];
  dataSource = ELEMENT_DATA;
  title:string;
  loader:boolean=false;

  @ViewChild('drawer', { static: false })
  drawer: MatSidenav; 
  constructor(private dialog:MatDialog) { }

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

      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.data={
        title:this.title,
       
      } 
     
     this.dialog.open(ImmatriculationComponent, dialogConfig);
  }
  openDeclarationDialog(){
    const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.data={
        title:this.title, 
      }
     this.dialog.open(DeclarationComponent, dialogConfig);
  }
 
}

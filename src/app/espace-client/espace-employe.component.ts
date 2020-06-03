import { Component, OnInit, ViewChild, TemplateRef ,ChangeDetectorRef} from '@angular/core';
import { MatSidenav, MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { ImmatriculationComponent } from '../immatriculation/immatriculation.component';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { ImmatriculationExistComponent } from '../immatriculation-exist/immatriculation-exist.component';
import { DeclarationComponent } from '../declaration/declaration.component';
import { SuiviDemandeComponent } from '../suivi-demande/suivi-demande.component';
import { PaiementComponent } from '../paiement/paiement.component';
import { LoginService } from '../services/login.service';
import { EmployeExistService } from '../services/employe-exist.service';



export interface Declaration {
  num_id: string;
  type_declaration: string;
  total_sal: number;
  mtn_cot: number;
}


//  const userName=window.localStorage.getItem("user");
const ELEMENT_DATA: Declaration[] = [
  {num_id: "12220300033", type_declaration: 'D1', total_sal: 1.0079, mtn_cot: 1223098376564}
];

@Component({
  selector: 'app-espace-client',
  templateUrl: './espace-employe.component.html',
  styleUrls: ['./espace-employe.component.css']
})

export class EspaceEmployeComponent implements OnInit {
  userName:string = "";
  validated:boolean=false;
  isExpanded:boolean=false;
  displayedColumns: string[] = ['nom', 'prenom', 'num_secu', 'icn'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  listEmp:any;
  title:string;
  loader:boolean=true;
  currentEmpl:any=[];
  @ViewChild('drawer', { static: false })
  drawer: MatSidenav; 
  tok:any=""
  constructor(private dialog:MatDialog,private userService:LoginService, private empExistServ:EmployeExistService,
    private changeDecRef:ChangeDetectorRef) {
   
   }

  ngOnInit() {
    this.userName=window.localStorage.getItem("user");
    this.tok=window.localStorage.getItem("token");
    this.getUserByLogin();
    this.getListEmploye();
  }

  getListEmploye(){
    this.empExistServ.getEmpExist().subscribe(resp=>
      {
      this.listEmp=resp;
      console.log(this.listEmp);
    });
  }
  getUserByLogin(){
   this.userService.getUserByLogin( this.userName).subscribe(
     resp=>{
      console.log(resp)
      if(resp){
        localStorage.setItem("userConnecter",JSON.stringify(resp));
      }
      
     }
     
     
     )
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
    let dialogRef= this.dialog.open(ImmatriculationExistComponent, 
      {width: '900px'});
    dialogRef.afterClosed().subscribe(()=>{
        this.getListEmploye();
      })     
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
     
      let dialogRef=  this.dialog.open(ImmatriculationComponent,
        dialogConfig);
        dialogRef.afterClosed().subscribe(()=>{
          this.getListEmploye();
        })
  }
  openDeclarationDialog(emp?:any){
    console.log(emp);
    const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      /* dialogConfig.data={
        title:this.title, 
      } */
      dialogConfig.data={
        idIdentifiant:emp.numeroIdentifiant,
        raisonSociale:emp.raisonSociale,
        typeIdentifiant:emp.typeIdentifiant,
        address:emp.address
      }
      console.log(dialogConfig.data);
      dialogConfig.width='1000px',
      dialogConfig.height='600px'
     this.dialog.open(DeclarationComponent, dialogConfig);
     
  }


getEmployer(i){
this.currentEmpl=this.listEmp[i];
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



   openPaiementDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
      dialogConfig.data={
        title:"Mes Paiements", 
      }
      dialogConfig.width='1000px',
      dialogConfig.height='650px'
     this.dialog.open(PaiementComponent, dialogConfig);
  }
 
} 

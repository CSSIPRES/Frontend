import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Paiement } from '../models/paiement';
import { PaiementService } from '../paiement.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})

export class PaiementComponent implements OnInit {
  creationPaiementForm:FormGroup;
  dataSource = new MatTableDataSource();
  paiements:Paiement[] = [];
  loader:boolean = false;
  isLoadData:boolean = false;
  
  userConnecter:any;

  isPaiementSelect:boolean = false;
 
 
  displayedColumns: string[] = ['numeroOrdreVirement', 'banqueSource', 'numeroCompteSource', 'banqueDestination', 'numeroCompteDestination', 'referenceFacture','etat'];
  paiement:Paiement = {
    numeroOrdreVirement:"",
    banqueSource:"",
    numeroCompteSource:"",
    banqueDestination:"",
    numeroCompteDestination:"",
    referenceFacture:"",
    montantAccount:0,
    etat:"",
    fileJoin:""
  };
  constructor(private fb:FormBuilder,
    private paiementService:PaiementService,
    private snackB: MatSnackBar,
    private loginService:LoginService) { }

  ngOnInit() {
    
    this.loader = true;
   this.isLoadData = false;


    
   // this.userConnecter = JSON.parse(localStorage.getItem("user"));
    this.loginService.getUserByLogin(localStorage.getItem("user_login"))
    .subscribe(
      data=>{
        this.loader = false;
        this.userConnecter = data;
        this.paiementService.getPaiementsByUser(this.userConnecter.id)
        .subscribe(
          (data:Paiement[])=>{
            this.loader = false;
            this.isLoadData = true;
            this.paiements = data;
            this.dataSource = new MatTableDataSource(this.paiements);
          },err=>{
            this.loader = false;
            this.isLoadData = true;
             console.log(err)
          }
        )
      },err=>{
        this.loader = false;
        console.log(err);
      }
    )
    this.isPaiementSelect = false;
    this.initForm();
  }

  initForm(){
    this.creationPaiementForm=this.fb.group({
      numeroOrdreVirement:new FormControl('',Validators.required),
      banqueSource:new FormControl('', Validators.required),
      numeroCompteSource:new FormControl('', Validators.required),
      banqueDestination:new FormControl('', Validators.required),
      numeroCompteDestination:new FormControl('', Validators.required),
      referenceFacture:new FormControl('', Validators.required),
      montantAccount:new FormControl('', Validators.required),
      etat:new FormControl('', Validators.required)
    })
  
  }


  openPaiement(){
    this.isPaiementSelect = true;
  }


  addPaiement(){
    this.paiement.numeroOrdreVirement = this.creationPaiementForm.value['numeroOrdreVirement'];
    this.paiement.banqueSource = this.creationPaiementForm.value['banqueSource'];
    this.paiement.numeroCompteSource = this.creationPaiementForm.value['numeroCompteSource'];
    this.paiement.banqueDestination = this.creationPaiementForm.value['banqueDestination'];
    this.paiement.numeroCompteDestination = this.creationPaiementForm.value['numeroCompteDestination'];
    this.paiement.referenceFacture = this.creationPaiementForm.value['referenceFacture'];
    this.paiement.montantAccount = this.creationPaiementForm.value['montantAccount'];
    this.paiement.etat = this.creationPaiementForm.value['etat'];
    this.paiement.userId = this.userConnecter.id;
 
      
      console.log(this.paiement);
     this.loader = true;
      this.paiementService.savePaiement(this.paiement)
      .subscribe(
        (data)=>{
          this.loader = false;
        //  console.log(data);
          this.isPaiementSelect = false;
          this.creationPaiementForm.reset();
        },err=>{
          this.loader = false;
          console.log(err);
          this.snackB.open("Une erreur s'est produite","X", {
            duration: 10000,
            panelClass: ['my-snack-bar3','mat-success'],
            verticalPosition: 'bottom',
            horizontalPosition:'left',
         });
         this.creationPaiementForm.reset();
        }
      )
    }

    fileChangeEvent(fileInput: any) {

      if (fileInput.target.files && fileInput.target.files[0]) {
   
          // Size Filter Bytes
          const max_size = 20971520;
          const allowed_types = ['image/png', 'image/jpeg','image/jpg'];
          const max_height = 15200;
          const max_width = 25600;
   
          if (fileInput.target.files[0].size > max_size) {
              console.log('Votre image est trop volumuneux');
   
              return false;
          }
   
          if (!allowed_types.includes(fileInput.target.files[0].type)) {
              console.log('Seuls les images au format ( JPG | JPEG | PNG ) sont prises en compte');
              return false;
          }
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const image = new Image();
              image.src = e.target.result;
              image.onload = rs => {
                  const img_height = rs.currentTarget['height'];
                  const img_width = rs.currentTarget['width'];
   
                  console.log(img_height, img_width);
   
   
                  if (img_height > max_height && img_width > max_width) {
                      console.log('La taille de votre image ne doit pas dépasse ');
                          
                      return false;
                  } else {
                      const imgBase64Path = e.target.result;
                      this.paiement.fileJoin = imgBase64Path;
                     // console.log(this.paiement);
                      //this.cardImageBase64 = imgBase64Path;
                     // let img:Image = { content:imgBase64Path};
                     // this.boutique.logo = img;
                    //  if(this.boutique.logo.content.length != 0){
                       //   this.isLogoSaved = true;
                     // }else{
                      //  this.isLogoSaved = false;
                    //  }
                      // this.previewImagePath = imgBase64Path;
                  }
              };
          };
   
          reader.readAsDataURL(fileInput.target.files[0]);
      }
   }
   

}

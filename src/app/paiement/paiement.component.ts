import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Paiement } from '../models/paiement';
import { PaiementService } from '../paiement.service';





const ELEMENT_DATA_PAIEMENT: Paiement[] = [
 {numeroOrdreVirement:"17268390",banqueSource:"SGBS",numeroCompteSource:"12973432",numeroCompteDestination:"17628390",referenceFacture:"FAC_2910",montantAccount:150000,montantTotal:500000,etat:"EN COUR"},
 {numeroOrdreVirement:"83627180",banqueSource:"SGBS",numeroCompteSource:"138712900",numeroCompteDestination:"82908789",referenceFacture:"FAC_2919",montantAccount:190000,montantTotal:500000,etat:"PAYER"}
];





@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})

export class PaiementComponent implements OnInit {
  creationPaiementForm:FormGroup;
  
  userConnecter:any;

  isPaiementSelect:boolean = false;
 
  dataSource = new MatTableDataSource(ELEMENT_DATA_PAIEMENT);
  displayedColumns: string[] = ['numeroOrdreVirement', 'banqueSource', 'numeroCompteSource', 'banqueDestination', 'numeroCompteDestination', 'referenceFacture','etat' , 'payer'];
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
  constructor(private fb:FormBuilder,private paiementService:PaiementService,private snackB: MatSnackBar) { }

  ngOnInit() {
    this.userConnecter = JSON.parse(localStorage.getItem("user"));

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
 
      
      console.log(this.paiement);

      this.paiementService.savePaiement(this.paiement)
      .subscribe(
        (data)=>{
          console.log(data);
          this.isPaiementSelect = false;
        },err=>{
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

import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import * as departement from '../departement.json';
import * as regions from '../regions.json';
import * as communes from '../communes.json';
import * as arrondissement from '../arrondissement.json';
import * as quarties from '../quarties.json';
import * as countries from '../countries.json';
import * as sectors from '../sectors.json';
import * as main_sectors from '../main_sectors.json';
import { FormGroup, FormBuilder, Validators, 
  FormControl, FormArray } from '@angular/forms';  
import {  MatDialog, MatSnackBar,  NativeDateAdapter
  ,MatTableDataSource, MatDatepickerInputEvent, DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import { LOCALE_ID } from '@angular/core'; 
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { ImmatriculationService } from '../services/immatriculation.service';
import { SaveEmployeeService } from '../services/save-employee.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
/* import Swal from 'sweetalert2/dist/sweetalert2.js'; */
import * as XLSX from 'xlsx';

 export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
      if (displayFormat === 'input') {
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          return `${year}-${month}-${day}`;
      }
      return date.toDateString();
  }
  parse(value: any): Date | null {
    const date = moment(value, 'YYYY-MM-DD');
    return date.isValid() ? date.toDate() : null;
}
}
export const APP_DATE_FORMATS =
{
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
}; 
@Component({
  selector: 'app-immatriculation',
  templateUrl: './immatriculation.component.html',
  styleUrls: ['./immatriculation.component.css'],
  /* encapsulation: ViewEncapsulation.None, */
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}}
  ]
  })
  
export class ImmatriculationComponent implements OnInit {
  listAct:any=[];
  listSect:any=[];
  listPrAct:any=[];
  listProfession:any=[];
  showFiller = false;
  currentUser:any=[]
  empl:any={}; 
  documents:FormGroup;
  dateErrors:boolean=false
  listPays:any=[];
  listMainSectors:any=[];
  listSectors:any=[];
  list:any=[];
  validError:boolean=false;
  listactivitePrincipal:any=[];
  activitePrincipal:any=[];
  listRegions:any=[];
  listD:any=[];
  listD1:any=[];
  listD2:any=[];
  listA2:any=[];
  listA:any=[];
  listA1:any=[];
  listC:any=[];
  listC1:any=[];
  sectorName:string="";
  initlistDept:any=[];
  listCommune:any=[];
  listArrondissemnt:any=[];
  listQuartie:any=[];
   listQ:any=[];
  listQ1:any=[]; 
  listC2:any=[];
  listQ2:any=[];
  listSector:any=[];
  listMainSector:any=[];
  ninea:any=[];
  loader:boolean=false;
  userName:string="";
  dataSource:MatTableDataSource<any>;
  nineaExist:boolean=false;
  validICN:boolean=false;
  validPassport:boolean=false;
  validDateNaiss:boolean=false;
  snackBar:boolean=true;
  immatForm:FormGroup;
  mainRegistrationForm:FormGroup;    
  srcResult:any;
  validNumbOfworker:boolean=false;
  addEmpForm:boolean=false;
  editEmpForm:boolean=false;
  disabledDate:boolean=true;
  addIndex:number;
  editIndex:number;
  immatFormBoolean:Boolean=false;
  immatPara:boolean=false;
  immatDip:boolean=false;
  immatDom:boolean=false;
  sectorName1:string="";
  
  domesticRegistrationForm:FormGroup;

  public employeData: EmployeData[];
  data = [];

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  icnpattern = "^[1,2][0-9]{12,13}$";
  phonePattern = "^((\\+91-?)|0)?[0-9]{9}$";
  registreComPattern="^(SN)[.][A-Za-z0-9]{3}[.][0-9]{4}[.](A|B|C|E|M){1}[.][0-9]{1,5}$"
  
  displayedColumns: string[] = ['nomEmploye', 'prenomEmploye', 'dateNaissance', 'numPieceIdentite','adresse','action'];  
  displayedColumns1 = ['nomEmploye', 'prenomEmploye', 'dateNaissance', 'numPieceIdentite','adresse'];


  employeInfo={
    employerType: "",
    typeEtablissement: "",
    raisonSociale: "",
    maisonMere: "",
    prenom: "",
    nom: "",
    tauxAT:"",
    typeIdentifiant: "",
    numeroIdentifiant: "",
    legalStatus: "",
    shortName: "",
    businessSector: "",
    mainLineOfBusiness: "",
    noOfWorkersInGenScheme: "",
    noOfWorkersInBasicScheme: "",
    region: "",
    department: "",
    arondissement: "",
    commune: "",
    qartier: "",
    address: "",
    postboxNo: "",
    telephone: "",
    email: "",
    website: "",
    zoneCss: "",
    zoneIpres: "",
    sectorCss: "",
    sectorIpres: "",
    agencyCss: "",
    agencyIpres: "",
    processFlowId: "",
    statutDossier: "",
    statutImmatriculation: "",
    idDossiers: "",
    user: {
      id: "",
      login: "",
      firstName: "",
      lastName: "",
      email: "",
      activated: "",
      langKey: "",
      imageUrl: "",
      resetDate: ""
    },
    documents:{
      demandeEcrit:{url:""},
      formDemande:{url:""},
      registreCommerce:{url:""},
      declarationEtablissement:{url:""},
      photocopieStatus:{url:""},
      decretMinisteriel:{url:""},
      avisImmatriculation:{url:""},
      dmt:{url:""},
      contratsTravail:{url:""},
      cni:{url:""},
      carteIdentiteConsulaire:{url:""},
      etatRecensement:{url:""},
      attestationChomage:{url:""},
      bulletinsSalaire:{url:""},
      cessationActivity:{url:""},
      carteNationaleIdentite:{url:""},
      derniersBulletins:{url:""},
      manuscriteAdessee:{url:""},
      passportDoc:{url:""},
      pieceIdDoc:{url:""},
      pieceIdGerantDoc:{url:""}
    }
   
  }

  constructor(private fb:FormBuilder,private dialog:MatDialog,
    private immService:ImmatriculationService,private snackB: MatSnackBar
    ,private saveEmp:SaveEmployeeService,private userService:UserService) {}
///// File Upload //////

    onFileChange(evt: any) {
      //debugger
      /* wire up file reader */
      const target: DataTransfer = <DataTransfer>(evt.target);
      if (target.files.length == 1) {
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
          /* read workbook */
          const bstr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(bstr, 
             {type:'binary', 
             cellDates:true, 
             cellNF: false, 
             cellText:false
            });
         // console.log(wb);
          /* grab first sheet */
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];
          /* save data */
          ws.A1.v = "rechercheEmploye";
          ws.B1.v = "nomEmploye";
          ws.C1.v = "prenomEmploye";
          ws.D1.v = "sexe";
          ws.E1.v = "etatCivil";
          ws.F1.v = "dateNaissance";
          ws.G1.v = "numRegNaiss";
          ws.H1.v = "nomPere";
          ws.I1.v = "prenomPere";
          ws.J1.v = "nomMere";
          ws.K1.v = "prenomMere";
          ws.L1.v = "nationalite";
          ws.M1.v = "typePieceIdentite";
          ws.N1.v = "nin";
          ws.O1.v = "ninCedeao";
          ws.P1.v = "numPieceIdentite";
          ws.Q1.v = "delivreLe";
          ws.R1.v = "lieuDelivrance";
          ws.S1.v = "expireLe";
          ws.T1.v = "paysNaissance";
          ws.U1.v = "villeNaissance";
          ws.V1.v = "pays";
          ws.W1.v = "region";
          ws.X1.v = "departement";
          ws.Y1.v = "arrondissement";
          ws.Z1.v = "commune";
          ws.AA1.v = "quartier";
          ws.AB1.v = "adresse";
          ws.AC1.v = "boitePostale";
          ws.AD1.v = "typeMouvement";
          ws.AE1.v = "natureContrat";
          ws.AF1.v = "dateDebutContrat";
          ws.AG1.v = "dateFinContrat";
          ws.AH1.v = "profession";
          ws.AI1.v = "emploi";
          ws.AJ1.v = "ouiCadre";
          ws.AK1.v = "conventionApplicable";
          ws.AL1.v = "salaireContractuel";
          ws.AM1.v = "tempsTravail";
          ws.AN1.v = "categorie";
          this.data = <any>(XLSX.utils.sheet_to_json(ws, 
            { raw: false,
            dateNF: "YYYY-MM-DD",
            header:1,
            defval: "" ,
            range:0
        }));
        };
        reader.readAsBinaryString(target.files[0]);
        console.log(this.data);
      }
    }

    uploadfile() { 
      let keys = this.data.shift();
      let resArr = this.data.map((e) => {
        let obj = {};
        keys.forEach((key, i) => {
          obj[key] = e[i];
          if(key = "rechercheEmploye"){
            obj[key] = "";
          }
        });
        return obj;
      }); 
      this.employeData = resArr;
      console.log(this.employeData);
      let decXslsFile= this.immatForm.get('input').get('employeList') as FormArray;
      for(let i=0;i< this.employeData.length;i++){
        decXslsFile.push(this.fillEmployeeForm(this.employeData[i])); 
      }
      console.log(decXslsFile);
      
      console.log(decXslsFile.value);
     this.dataSource=this.immatForm.get('input').get('employeList').value; 
      /* this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; */
    }

    ////// End File Upload 

    opensweetalert(title, icon, text){
      Swal.fire({
        icon: icon,
        title: title,
        text: text,
        timer: 7000
      })
      
    }

  addImmatriculation(){
    let listSal=  this.immatForm.get('input').get('employeList').value   
    for(let i=0;i<listSal.length;i++){
    let dateNaiss1= listSal[i].dateNaissance;   
    let dateNaiss=moment(dateNaiss1).format('YYYY-MM-DD');
    listSal[i].dateNaissance=dateNaiss;
    let delivLe1= listSal[i].delivreLe;   
    let delivLe=moment(delivLe1).format('YYYY-MM-DD');
    listSal[i].delivreLe=delivLe;
    let expLe1= listSal[i].expireLe;   
    let expLe=moment(expLe1).format('YYYY-MM-DD');
    listSal[i].expireLe=expLe;
    let debutCont1= listSal[i].dateDebutContrat;   
    let debutCont=moment(debutCont1).format('YYYY-MM-DD');
    listSal[i].dateDebutContrat=debutCont;
    let finCon1= listSal[i].dateFinContrat;   
    let finCon=moment(finCon1).format('YYYY-MM-DD');
    listSal[i].dateFinContrat=finCon;

    }
    console.log(listSal); 
     let immatForm=this.immatForm.get('input').get('mainRegistrationForm');
     let immatForm1=this.immatForm.get('input').get('legalRepresentativeForm');
     let immatForm2=this.immatForm.get('input').get('employerQuery');
     let dateInsp= this.immatForm.get('input').get('mainRegistrationForm').get('dateOfInspection').value;
     let datefinInsp= this.immatForm.get('input').get('mainRegistrationForm').get('dateOfFirstHire').value;   
     let isueDate=immatForm1.get('issuedDate').value;
     let birthday=immatForm1.get('birthdate').value;
     let expDate=immatForm1.get('expiryDate').value;
     let tradDate=immatForm2.get('tradeRegisterDate').value;
     let taxDate=immatForm2.get('taxIdDate').value;
     /* let finCot= this.declarationForm.get('dateFinPeriodeCotisation').value;    */
    console.log(dateInsp);
    let d1=moment(datefinInsp).format('YYYY-MM-DD');
    let d2=moment(datefinInsp).format('YYYY-MM-DD');
    let d3=moment(birthday).format('YYYY-MM-DD');
    let d4=moment(isueDate).format('YYYY-MM-DD');
    let d5=moment(expDate).format('YYYY-MM-DD'); 
    let d6=moment(tradDate).format('YYYY-MM-DD'); 
    let d7=moment(taxDate).format('YYYY-MM-DD'); 
    console.log(d1);
    immatForm.get('dateOfInspection').patchValue(d1);
    immatForm.get('dateOfFirstHire').patchValue(d2); 
    immatForm1.get('birthdate').patchValue(d3);
    immatForm1.get('issuedDate').patchValue(d4);
    immatForm1.get('expiryDate').patchValue(d5);
    immatForm2.get('tradeRegisterDate').patchValue(d6); 
    immatForm2.get('taxIdDate').patchValue(d7); 
    let v= this.immatForm.get('input').get('mainRegistrationForm').get('dateOfInspection').value;
    moment(v).format('YYYY-MM-DD');

  this.loader=true;
  this.immService.addImmatriculation(this.immatForm.value).subscribe((resp:any)=>{
       console.log(resp);
       localStorage.setItem('employerData', JSON.stringify(resp.value.output));
       localStorage.setItem('employerDataInput', JSON.stringify(resp.value.input));
       console.log(resp);
       if(resp.value.output.employerRegistrationFormId!=0){
         console.log(resp)
         this.loader=false;
        this.opensweetalert("","success","Demande immatriculation soumise avec succès");
        this.dialog.closeAll();
        let emplObject=this.getEmployee(resp.value.output);
        this.saveEmp.saveEmploye(emplObject).subscribe(resp=>console.log(resp)) ;
       }
       
     }, error =>{
       console.log(error);
       if(error.status==500){
        
         this.loader=false;      
         
        this.opensweetalert("", "error", error.error.detail) ;
       }
       else if(error.status==0){
          this.loader=false;  
        this.opensweetalert("","error","Erreur d'envoi veuillez vérifier la connexion");
       }   
     })
   }    
   
   initImmatForm(){
     this.immatForm=this.fb.group({
          input:  this.fb.group({
      mainRegistrationForm:this.fb.group({
    dateOfInspection:new FormControl('', Validators.required),
    dateOfFirstHire:this.fb.control('', Validators.required),
    shortName:this.fb.control(''),
    businessSector:this.fb.control('', Validators.required),
    mainLineOfBusiness:this.fb.control('', Validators.required),     
    region:this.fb.control('', Validators.required),
    department:this.fb.control('', Validators.required),
    arondissement:this.fb.control('', Validators.required),
    commune:this.fb.control('', Validators.required),
    qartier:this.fb.control('', Validators.required),
    address:this.fb.control('', Validators.required),
    telephone:this.fb.control('', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.phonePattern)]}),
    email:this.fb.control('', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.emailPattern)]}),
    website:this.fb.control(''),
    noOfWorkersInBasicScheme:this.fb.control('', Validators.required),
    noOfWorkersInGenScheme:this.fb.control('', Validators.required)
      }),
      employerQuery:this.fb.group({
        employerType:this.fb.control('', Validators.required),
        legalStatus: this.fb.control('',Validators.required),
        typeEtablissement:this.fb.control('', Validators.required),
        employerName:this.fb.control('', Validators.required),
        nineaNumber:this.fb.control('',{ updateOn: 'blur',validators: [Validators.required,Validators.maxLength(9),Validators.minLength(9)]}),
        ninetNumber:this.fb.control(''),
        regType:this.fb.control('BVOLN', Validators.required),
        taxId:this.fb.control('2G3'),
        taxIdDate:this.fb.control('',Validators.required),
        tradeRegisterDate: this.fb.control('',Validators.required),
        tradeRegisterNumber:this.fb.control('',{ updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.registreComPattern)]}),
      }),
      legalRepresentativeForm:new FormGroup({
        lastName:this.fb.control('', Validators.required),
        firstName:this.fb.control('', Validators.required),
        birthdate:this.fb.control('', Validators.required),
        nationality:this.fb.control('', Validators.required),
        nin:this.fb.control('', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.icnpattern)]}),
        placeOfBirth:this.fb.control('', Validators.required),
        cityOfBirth:this.fb.control('', Validators.required),
        typeOfIdentity:this.fb.control('', Validators.required),
        /* ninCedeo:this.fb.control('', Validators.required),  */
        ninCedeo:this.fb.control(''),
        issuedDate:this.fb.control('', Validators.required),
        landLineNumber:this.fb.control('', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.phonePattern)]}),
        expiryDate:this.fb.control('', Validators.required),
        region:this.fb.control('', Validators.required),
        department:this.fb.control('', Validators.required),
        arondissement:this.fb.control('', Validators.required),
        commune:this.fb.control('', Validators.required),
        qartier:this.fb.control('', Validators.required),
        address:this.fb.control('', Validators.required),
        mobileNumber:this.fb.control('', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.phonePattern)]}),
        email:this.fb.control('', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.emailPattern)]}),
        identityIdNumber:this.fb.control(''),
        legalRepPerson:this.fb.control(''),
      }),
         employeList: this.fb.array([])  
    })
    })
   }

   initImmatFormPP(){
    this.immatForm=this.fb.group({
     input:  this.fb.group({ 
      employerQuery:this.fb.group({
      regType:this.fb.control('BVOLN', Validators.required),
      employerType:this.fb.control('', Validators.required),
      estType:this.fb.control('', Validators.required),
      employerName:this.fb.control('', Validators.required),
      hqId:this.fb.control(''),
      nineaNumber:this.fb.control('',{ updateOn: 'blur',validators: [Validators.required,Validators.maxLength(9),Validators.minLength(9)]}),
      arretOuDecret:this.fb.control(''),
      dateArreteOuDecret:this.fb.control(''),
      companyOriginId:this.fb.control('')
      }),
       mainRegistrationForm:this.fb.group({
   dateOfInspection:new FormControl('', Validators.required),
   dateOfFirstHire:this.fb.control('', Validators.required),
   shortName:this.fb.control(''),
   businessSector:this.fb.control('', Validators.required),
   mainLineOfBusiness:this.fb.control('', Validators.required),
   region:this.fb.control('', Validators.required),
   department:this.fb.control('', Validators.required),
   arondissement:this.fb.control('', Validators.required),
   commune:this.fb.control('', Validators.required),
   qartier:this.fb.control('', Validators.required),
   address:this.fb.control('', Validators.required),
   telephone:this.fb.control('', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.phonePattern)]}),
   email:this.fb.control('', { updateOn: 'blur',validators: [Validators.pattern(this.emailPattern)]}),
   website:this.fb.control(''),
   noOfWorkersInBasicScheme:this.fb.control('', Validators.required),
   noOfWorkersInGenScheme:this.fb.control('', Validators.required)
  }),
  personneContact:new FormGroup({
   /*  recherche: null, */
    nom:this.fb.control( "BEYE"),
    prenom: this.fb.control( "Mamadou"),        
    typeOfIdentity: this.fb.control("NIN"),
    nin:this.fb.control( "1547199058954"),
    identityIdNumber:this.fb.control( "1547199058954"), 
    ninCedeo: this.fb.control( ""),
    telephoneFixe:this.fb.control( "339412307"),
    numeroMobile: this.fb.control( "771147628"),
    email:this.fb.control( "test@test.com"),
  }),
   employeList: this.fb.array([])  
   })
   })
   return this.immatForm;
  }
 
   
   initImmatFormRD(){
    this.immatForm=this.fb.group({
    input:  this.fb.group({
    domesticRegistrationForm:this.fb.group({
     dateEmbauchePremierSalarie:new FormControl('dateEmbauchePremierSalarie', Validators.required), 
     regType:this.fb.control('BVOLN', Validators.required),
     idType:this.fb.control('NIN', Validators.required),
     nin:this.fb.control('1549198204473', Validators.required),
     lastName:this.fb.control('', Validators.required),
     firstName:this.fb.control('', Validators.required),
     ninCedeao:this.fb.control('', Validators.required),
     nationality:this.fb.control('SEN', Validators.required),
     idNumber:this.fb.control('SEN', Validators.required),
     issuedDate:this.fb.control('2020-01-01', Validators.required),
     expiryDate:this.fb.control('2020-01-01', Validators.required),
     dateOfBirth:this.fb.control('2020-01-01', Validators.required),
     countryOfBirth:this.fb.control('SEN', Validators.required),
     cityOfBirth:this.fb.control('SEN', Validators.required),
     phoneNumber:this.fb.control('', Validators.required),
     email:this.fb.control('', Validators.required),
     businessSector:this.fb.control('', Validators.required),
     mainLineOfBusiness:this.fb.control('', Validators.required),
     atRate:this.fb.control('', Validators.required),
     region:this.fb.control('DAKAR', Validators.required),
     department:this.fb.control('DAKAR', Validators.required),
     arrondissement:this.fb.control('DAKAR', Validators.required),
     commune:this.fb.control('DAKAR', Validators.required),
     quartier:this.fb.control('DAKAR', Validators.required),
     address:this.fb.control('DAKAR', Validators.required),
     zoneCss:this.fb.control('DAKAR', Validators.required),
     zoneIpres:this.fb.control('DAKAR', Validators.required),
     sectorCss:this.fb.control('DAKAR', Validators.required),
     sectorIpres:this.fb.control('DAKAR', Validators.required),
     agencyCss:this.fb.control('DAKAR', Validators.required),
     agencyIpres:this.fb.control('DAKAR', Validators.required)
     }),
      employerQuery:this.fb.group({
        employerType:this.fb.control('', Validators.required),
        employerName:this.fb.control('', Validators.required),
        nineaNumber:this.fb.control('',{ updateOn: 'blur',validators: [Validators.required,Validators.maxLength(9),Validators.minLength(9)]}),
        regType:this.fb.control('BVOLN', Validators.required),
        estType:this.fb.control('AMB', Validators.required)
     }),  
   
       employeList: this.fb.array([])  
    })
    })
    return  this.immatForm;      
    }
  
  initImmatFormSD(){
    this.immatForm=this.fb.group({
    input:  this.fb.group({  
    mainRegistrationForm:this.fb.group({
    dateOfInspection:new FormControl('2020-01-01', Validators.required),
    dateOfFirstHire:this.fb.control('2020-01-01', Validators.required),
    shortName:this.fb.control(''),
    businessSector:this.fb.control('', Validators.required),
    mainLineOfBusiness:this.fb.control('', Validators.required),
    region:this.fb.control('', Validators.required),
    department:this.fb.control('', Validators.required),
    arondissement:this.fb.control('', Validators.required),
    commune:this.fb.control('', Validators.required),
    qartier:this.fb.control('', Validators.required),
    address:this.fb.control('', Validators.required),
    telephone:this.fb.control('', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.phonePattern)]}),
    email:this.fb.control('', { updateOn: 'blur',validators: [Validators.pattern(this.emailPattern)]}),
    website:this.fb.control(''),
    noOfWorkersInBasicScheme:this.fb.control('', Validators.required),
    noOfWorkersInGenScheme:this.fb.control('', Validators.required),
    postboxNo:this.fb.control('', Validators.required),
      }),
        employeList: this.fb.array([])  
     })
    })
    }
    /* controlPara:boolean=false;
    controlRd:boolean=false;
    controlPv:boolean=false;
    controlRp:boolean=false; */
infoGen:boolean=false;
infoEmp:boolean=false;
infoRepLeg:boolean=false;
infoPersoneContact:boolean=false;
empInfoField:boolean=false;
domInfo:boolean=false;
    selectForm(event){
      let empType=this.immatForm.get('input').get('employerQuery').get('employerType').value;
      if(empType=='DOM'){  
        this.initImmatFormSD();
        this.infoGen=true;
        this.infoEmp=false;
        this.infoRepLeg=false;
        this.infoPersoneContact=false;
      }
       if(empType=='PUB_PARA') {       
        this.initImmatFormPP();
        console.log(this.initImmatFormPP())
        this.infoGen=true;
        this.infoEmp=true;
        this.empInfoField=true;
        this.infoPersoneContact=true;
        this.infoRepLeg=false;
      } 
      if(empType=='REP_DIP') {
        this.initImmatFormRD();
        this.domInfo=true;
        this.infoGen=false;
        this.infoEmp=false;
        this.empInfoField=false;
        this.infoPersoneContact=false;
        this.infoRepLeg=false;
      }
     
    }  

  
  ngOnInit() {
    this.initImmatForm();
    window.localStorage.getItem("token");
    this.userName=window.localStorage.getItem("user");
    console.log(this.immatForm.value);
    this.listRegions=(regions as any).default[0];
    this.initlistDept=(departement as any).default[0];
    this.listCommune=(communes as any).default[0];
    this.listArrondissemnt=(arrondissement as any).default[0];
    this.listQuartie=(quarties as any).default[0]; 
    this.listPays=(countries as any).default[0];
    this.listSectors=(sectors as any).default[0];
    this.listactivitePrincipal=(main_sectors as any).default[0];
    console.log(this.listactivitePrincipal);
    this.getUser();

    this.infoGen=true;
    this.infoEmp=true;
    this.infoRepLeg=true;
    this.infoPersoneContact=false;
}  
incrementDate(event){
  let identityType= this.immatForm.get('input').get('legalRepresentativeForm')
  .get('typeOfIdentity').value;
  let dateDebut= this.immatForm.get('input').get('legalRepresentativeForm')
  .get('issuedDate').value;
  let dateFin=this.immatForm.get('input').get('legalRepresentativeForm')
  .get('expiryDate');
  if(identityType=="NIN" || identityType=="CDEAO"){
  let endDate = moment(dateDebut).add(10,'year').format('YYYY-MM-DD');
  console.log(endDate); 
  dateFin.patchValue(endDate);
  }
  else if(identityType=="PASS"){
    let endDate1 = moment(dateDebut).add(5,'year').format('YYYY-MM-DD');
    console.log(endDate1); 
    dateFin.patchValue(endDate1);
  }
  /*else{
    dateDebut="";
     this.immatForm.get('input').get('legalRepresentativeForm').get('expiryDate').value=""; 
  }*/
}
getUser(){
  this.userService.getUser(this.userName).subscribe(
    resp=>{this.currentUser =resp;
     console.log(this.currentUser) 
  }
  )
}

getEmployee(outputValue){
 /*  console.log(this.employeInfo); */
 let legalRepInfo=this.immatForm.get('input').get('legalRepresentativeForm');
 let empMainInfo=this.immatForm.get('input').get('mainRegistrationForm');
 let employeurInfo=this.immatForm.get('input').get('employerQuery');
 this.employeInfo.prenom=employeurInfo.get('employerName').value;
 this.employeInfo.businessSector=empMainInfo.get('businessSector').value;
 this.employeInfo.mainLineOfBusiness=empMainInfo.get('mainLineOfBusiness').value;
 if(this.employeInfo.employerType)
 this.employeInfo.employerType=employeurInfo.get('employerType').value;
 this.employeInfo.typeEtablissement=employeurInfo.get('typeEtablissement').value;
 this.employeInfo.raisonSociale=employeurInfo.get('employerName').value;
 /* if(this.employeInfo.employerType==){
   this.employeInfo.typeIdentifiant='SCI';
 } */
 
 if(employeurInfo.get('employerType').value=="PVT"){
  console.log(employeurInfo.get('employerType').value);
  this.employeInfo.typeIdentifiant='SCI';
}
 /* this.employeInfo.typeIdentifiant=legalRepInfo.get('typeOfIdentity').value; */
 this.employeInfo.numeroIdentifiant=employeurInfo.get('nineaNumber').value;
 this.employeInfo.legalStatus=employeurInfo.get('legalStatus').value;
 this.employeInfo.shortName=empMainInfo.get('shortName').value;
 this.employeInfo.noOfWorkersInGenScheme= empMainInfo.get('noOfWorkersInGenScheme').value;
 this.employeInfo.noOfWorkersInBasicScheme= empMainInfo.get('noOfWorkersInBasicScheme').value;
 this.employeInfo.region= empMainInfo.get('region').value;
 this.employeInfo.department= empMainInfo.get('department').value;
 this.employeInfo.arondissement= empMainInfo.get('arondissement').value;
 this.employeInfo.commune= empMainInfo.get('commune').value;
  this.employeInfo.qartier= empMainInfo.get('qartier').value;
 this.employeInfo.address= empMainInfo.get('address').value;
 this.employeInfo.telephone= empMainInfo.get('telephone').value;
 this.employeInfo.email= empMainInfo.get('email').value;
 this.employeInfo.website= empMainInfo.get('website').value;
 this.employeInfo.zoneCss= outputValue.zoneCss;
 this.employeInfo.zoneIpres= outputValue.zoneIpres;
 this.employeInfo.sectorCss=outputValue.sectorCss;
 this.employeInfo.sectorIpres=outputValue.sectorIpres;
 this.employeInfo.tauxAT=outputValue.tauxAt
 this.employeInfo.agencyCss=outputValue.agenceCss;
 this.employeInfo.agencyIpres=outputValue.agenceIpres;
 this.employeInfo.processFlowId=outputValue.processFlowId;
 this.employeInfo.statutDossier="statutDossier";
  this.employeInfo.statutImmatriculation=""; 
 this.employeInfo.idDossiers=null;
 this.employeInfo.documents=null;
 this.employeInfo.user.id=this.currentUser.id;
 this.employeInfo.user.login=this.currentUser.login;
 this.employeInfo.user.firstName=this.currentUser.firstName;
 this.employeInfo.user.lastName=this.currentUser.lastName;
 this.employeInfo.user.email=this.currentUser.email;
 this.employeInfo.user.activated='true';
 this.employeInfo.user.langKey="fr";
 this.employeInfo.user.imageUrl="";
 this.employeInfo.user.resetDate=null; 
 return this.employeInfo;
}

  dateDiff1(d1, d2) {
    return ((d2.getTime() - d1.getTime()) / 31536000000);
  }
  compareDate(event){
    let date_insp:Date=this.immatForm.get('input').get('mainRegistrationForm').get('dateOfInspection').value;
    let date_ouv:Date=this.immatForm.get('input').get('mainRegistrationForm').get('dateOfFirstHire').value;
    let diffYears: number = this.dateDiff1(new Date(date_insp),new Date(date_ouv));
    console.log(diffYears);
    if(diffYears<0){
      this.dateErrors=true;
      console.log(this.dateErrors);
    }
    else{
      this.dateErrors=false;
    }
  }
  validationPiece(event){
    let d1:Date=this.immatForm.get('input').get('legalRepresentativeForm').get('issuedDate').value;
    let d2:Date=this.immatForm.get('input').get('legalRepresentativeForm').get('expiryDate').value;
    let d3: number = this.dateDiff1(new Date(d1),new Date(d2));
    let icn=this.immatForm.get('input').get('legalRepresentativeForm').get('typeOfIdentity').value;
    let pass=this.immatForm.get('input').get('legalRepresentativeForm').get('typeOfIdentity').value;
    if(icn=="NIN"){
      this.disabledDate=false;
    if(d3< 10 || d3> 10.008219178082191){
      this.validICN=true;
      this.validError=true;
      this.validPassport=false;
      console.log(this.validICN)
    }
    else{
      this.disabledDate=true;
      this.validICN=false;
      this.validError=false;

    }
  }
  else if(pass=="PASS"){
    this.disabledDate=true;
    {
    if(d3 < 5 || d3 > 5.008219178082191){
      this.validPassport=true;
      this.validError=true;
      this.validICN=false;
      
    }
    else{
      this.validPassport=false;
      this.validError=false;
     
    }
  }
  }
   else{
    this.disabledDate=true;
   }
  }  
    
  validDateNaissance(event){
    let param=this.immatForm.get('input').get('legalRepresentativeForm').get('birthdate').value;
    let current_date = new Date();
    let birth_date = new Date(param);
    let age = current_date.getFullYear() - birth_date.getFullYear();
    let month_age = current_date.getMonth() - birth_date.getMonth();
    if (month_age < 0 || (month_age === 0 && current_date.getDate() < current_date.getDate())) {
        age--;
    }
    if(age < 18){
      this.validDateNaiss = true;
      this.validError=true;
    }
    else{
      this.validDateNaiss = false;
      this.validError=false;
    }
  }
  
  validateNumbEmployee(){
    let n1=this.immatForm.get('input').get('mainRegistrationForm').get('noOfWorkersInGenScheme').value;
    let n2=this.immatForm.get('input').get('mainRegistrationForm').get('noOfWorkersInBasicScheme').value;
    if(n1<n2){
      this.validNumbOfworker=true;
      this.validError=true;
      /* console.log(this.validNumbOfworker); */
    }
    else{
      this.validNumbOfworker=false;
      this.validError=false;
    }
  }
 getNineaNumber(){
   this.immService.getNineaNumber(this.immatForm.get('input').get('employerQuery').get('nineaNumber').value).subscribe(
     (resp:any)=>{
       if(resp.value.output.isTaxpayerIdentifierExist.value==true){
           this.nineaExist=true;
            /* console.log(this.nineaExist);  */
       }
       else{
        this.nineaExist=false;
       }
     }
   )
 } 
 getNinNumber(){
   let numPiece=this.immatForm.get('input').get('legalRepresentativeForm').get('nin').value
   this.immService.getNinNumber(numPiece).subscribe(
     resp=>console.log(resp)
   )
 }
   createItem() {
    return this.fb.group({
      rechercheEmploye: this.fb.control(''),
      nomEmploye:  this.fb.control(''),
      prenomEmploye:  this.fb.control(''),
      sexe:  this.fb.control(''),
      etatCivil:  this.fb.control(''),
      dateNaissance:  this.fb.control(''),
      numRegNaiss:  this.fb.control(''),
      nomPere:  this.fb.control(''),
      prenomPere:  this.fb.control(''),
      nomMere:  this.fb.control(''),
      prenomMere:  this.fb.control(''),
      nationalite:  this.fb.control(''),  
      typePieceIdentite:  this.fb.control(''),
      nin:  this.fb.control(''),
      ninCedeao:  this.fb.control(''),
      numPieceIdentite:  this.fb.control(''),
      delivreLe:  this.fb.control(''),
      lieuDelivrance: this.fb.control(''),
      expireLe:  this.fb.control(''),
      villeNaissance:  this.fb.control(''),
      paysNaissance:  this.fb.control(''),
      employeurPrec: this.fb.control(''),
      pays:  this.fb.control(''),
      region: this.fb.control(''),
      departement:  this.fb.control(''),
      arrondissement:  this.fb.control(''),
      commune:  this.fb.control(''),
      quartier:  this.fb.control(''),
      adresse:  this.fb.control(''),
      boitePostale:  this.fb.control(''),
      typeMouvement:  this.fb.control(''),
      natureContrat:  this.fb.control(''),
      dateDebutContrat:  this.fb.control(''),
      dateFinContrat: this.fb.control(''),
      profession: this.fb.control(''),
      emploi: this.fb.control(''),
      nonCadre: this.fb.control(''),
      ouiCadre: this.fb.control(''),
      conventionApplicable:  this.fb.control(''),
      salaireContractuel:  this.fb.control(''),
      tempsTravail:  this.fb.control(''),
      categorie:  this.fb.control('')
  });
  }
  contrat:boolean=true;
  selectContrat(i){ 
  let emp=  this.immatForm.get('input').get('employeList').value;
  console.log(this.immatForm.get('input').get('employeList').value[i]);
    if(emp[i].natureContrat=="CDI"){
      this.contrat=false;
      console.log(this.contrat);
    }
    else{
      this.contrat=true;
    } 
  }
  /* selectDateEmbauchche(i){
    let entCreation=this.immatForm.get('input').get('mainRegistrationForm').get('dateOfFirstHire').value;  
    let dateOuv=this.immatForm.get('input').get('mainRegistrationForm').get('dateOfFirstHire').value;
    console.log(empCreation);
    let d3: number = this.dateDiff1(new Date(empCreation),new Date(dateOuv));
    console.log(d3);
  } */

  fillEmployeeForm(dec){
    return    new FormGroup({
      rechercheEmploye: this.fb.control(dec.rechercheEmploye),
      nomEmploye:  this.fb.control(dec.nomEmploye),
      prenomEmploye:  this.fb.control(dec.prenomEmploye),
      sexe:  this.fb.control(dec.sexe),
      etatCivil:  this.fb.control(dec.etatCivil),
      dateNaissance:  this.fb.control(dec.dateNaissance),
      numRegNaiss:  this.fb.control(dec.numRegNaiss),
      nomPere:  this.fb.control(dec.nomPere),
      prenomPere:  this.fb.control(dec.prenomPere),
      nomMere:  this.fb.control(dec.nomMere),
      prenomMere:  this.fb.control(dec.prenomMere),
      nationalite:  this.fb.control(dec.nationalite),  
      typePieceIdentite:  this.fb.control(dec.typePieceIdentite),
      nin:  this.fb.control(dec.nin),
      ninCedeao:  this.fb.control(dec.ninCedeao),
      numPieceIdentite:  this.fb.control(dec.numPieceIdentite),
      delivreLe:  this.fb.control(dec.delivreLe),
      lieuDelivrance: this.fb.control(dec.lieuDelivrance),
      expireLe:  this.fb.control(dec.expireLe),
      villeNaissance:  this.fb.control(dec.villeNaissance),
      paysNaissance:  this.fb.control(dec.paysNaissance),
      employeurPrec: this.fb.control(dec.employeurPrec),
      pays:  this.fb.control(dec.pays),
      region: this.fb.control(dec.region),
      departement:  this.fb.control(dec.departement),
      arrondissement:  this.fb.control(dec.arrondissement),
      commune:  this.fb.control(dec.commune),
      quartier:  this.fb.control(dec.quartier),
      adresse:  this.fb.control(dec.adresse),
      boitePostale:  this.fb.control(dec.boitePostale),
      typeMouvement:  this.fb.control(dec.typeMouvement),
      natureContrat:  this.fb.control(dec.natureContrat),
      dateDebutContrat:  this.fb.control(dec.dateDebutContrat),
      dateFinContrat: this.fb.control(dec.dateFinContrat),
      profession: this.fb.control(dec.profession),
      emploi: this.fb.control(dec.emploi),
      /* nonCadre: this.fb.control(dec.nonCadre), */
      ouiCadre: this.fb.control(dec.ouiCadre),
      conventionApplicable:  this.fb.control(dec.conventionApplicable),
      salaireContractuel:  this.fb.control(dec.salaireContractuel),
      tempsTravail:  this.fb.control(dec.tempsTravail),
      categorie:  this.fb.control('9B')
         })
    }
  addItem(): void { 
    this.employeList.push(this.createItem()); 
  }
selectRegion(event){
this.listD=[];
this.listD1=[];
this.listD2=[];
let r2:string="";
let r:string="";
let r1:string="";
let empType=this.immatForm.get('input').get('employerQuery').get('employerType').value;
 r=this.immatForm.get('input').get('mainRegistrationForm').get('region').value;

if(empType=='PVT'){
 r1=this.immatForm.get('input').get('legalRepresentativeForm').get('region').value;
}
 console.log(r);
let emplistRegion=this.immatForm.get('input').get('employeList').value;
for(let i=0;i<emplistRegion.length;i++){
 r2= emplistRegion[i].region;
}
this.initlistDept.items.forEach(element => {
  if(element.rgion==r){
    this.listD.push(element); 
  } 
  });
   this.initlistDept.items.forEach(element => {
    if(element.rgion==r1){
      this.listD1.push(element); 
    } 
    }); 
   this.initlistDept.items.forEach(element => {
      if(element.rgion==r2){
        this.listD2.push(element); 
      } 
      });
  }
  
selectDepartement(event){
  this.listA=[];
  this.listA1=[];
  this.listA2=[];
  let d3:string="";
  let d2:string="";
  let d1= this.immatForm.get('input').get('mainRegistrationForm').get('department').value;
  let empType=this.immatForm.get('input').get('employerQuery').get('employerType').value;
  if(empType=='PVT'){
  d2=this.immatForm.get('input').get('legalRepresentativeForm').get('department').value;
  }
  let emplistRegion=this.immatForm.get('input').get('employeList').value;
for(let i=0;i<emplistRegion.length;i++){
 d3= emplistRegion[i].departement;
  }
  
  this.listArrondissemnt.items.forEach(element => {
    if(element.departement==d1){
      this.listA.push(element);
       console.log(this.listA); 
    }
  }); 
  this.listArrondissemnt.items.forEach(element => {
    if(element.departement==d2){
      this.listA1.push(element);
       console.log(this.listA); 
    }
  });
  this.listArrondissemnt.items.forEach(element => {
    if(element.departement==d3){
      this.listA2.push(element);
       console.log(this.listA); 
    }
  });
  }

  selectArrondissement(event){
    this.listC=[];
    this.listC1=[];
    this.listC2=[];
    let c2:string="";
    let c1:string="";
    let c= this.immatForm.get('input').get('mainRegistrationForm').get('arondissement').value;
    let empType=this.immatForm.get('input').get('employerQuery').get('employerType').value;
  if(empType=='PVT'){
     c1= this.immatForm.get('input').get('legalRepresentativeForm').get('arondissement').value;
   }
    let emplistRegion=this.immatForm.get('input').get('employeList').value;
      for(let i=0;i<emplistRegion.length;i++){
       c2= emplistRegion[i].arrondissement;
      }
    this.listCommune.items.forEach(element => {
      if(element.arrondissement==c){
        this.listC.push(element);
      }
      });
      this.listCommune.items.forEach(element => {
        if(element.arrondissement==c1){
          this.listC1.push(element);
        }
        
        }
      );
      this.listCommune.items.forEach(element => {
        if(element.arrondissement==c2){
          this.listC2.push(element);
        }
        
        }
      );
  }
  
  selectCommne(event){
    this.listQ=[];
    this.listQ1=[]; 
    this.listQ2=[]; 
    let c3:string="";
    let c2:string="";
    let c1= this.immatForm.get('input').get('mainRegistrationForm').get('commune').value;
    let empType=this.immatForm.get('input').get('employerQuery').get('employerType').value;
  if(empType=='PVT'){
    c2= this.immatForm.get('input').get('legalRepresentativeForm').get('commune').value;
   }
    let emplistRegion=this.immatForm.get('input').get('employeList').value;
   for(let i=0;i<emplistRegion.length;i++){
      c3= emplistRegion[i].commune;
     }

    this.listQuartie.items.forEach(element => {
      if(element.commune==c1){
         this.listQ.push(element); 
      }
     }
    ); 
    this.listQuartie.items.forEach(element => {
      if(element.commune==c2){
         this.listQ1.push(element); 
      }
     }
    ); 
    this.listQuartie.items.forEach(element => {
      if(element.commune==c3){
         this.listQ2.push(element); 
      }
     }
    ); 
  }
  
  selectSector(event){ 
    let c1:string="";
    let c2:string="";
    let empType:string="";
      c1= this.immatForm.get('input').get('mainRegistrationForm').get('mainLineOfBusiness').value;
      console.log(empType)
      this.listactivitePrincipal.items.forEach(element => {
      if(element.activitesprincipal==c1 || element.activitesprincipal==c2){
      this.sectorName=element.secteuractivites;
      this.sectorName1=element.secteuractivites;
      let bs= this.immatForm.get('input').get('mainRegistrationForm').get('businessSector');
      bs.patchValue(this.sectorName); 
      }
      }
    ); 
  }
   
  maxRgGen:boolean=false;







  // Upload file 


fileChangeEvent(fileInput: any,fileName:string) {

  if (fileInput.target.files && fileInput.target.files[0]) {

      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg','image/jpg','application/pdf'];
     // const max_height = 15200;
     // const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
          console.log('Votre image est trop volumuneux');

          return false;
      }

      if (!allowed_types.includes(fileInput.target.files[0].type)) {
          console.log('Seuls les documents au format ( JPG | JPEG | PNG | PDF ) sont prises en compte');
          return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {

        const docBase64Path = e.target.result;
        if(fileName == "demandeEcrit"){
            this.employeInfo.documents.demandeEcrit.url = docBase64Path;
            console.log(this.employeInfo.documents.demandeEcrit.url);
        }
        if(fileName == "formDemande"){
          this.employeInfo.documents.formDemande.url = docBase64Path;
        }
        if(fileName == "registerCommerce"){
          this.employeInfo.documents.registreCommerce.url = docBase64Path;
        }
        if(fileName == "declarationEtablissement"){
          this.employeInfo.documents.declarationEtablissement.url = docBase64Path;
        }
        if(fileName == "photocopieStatus"){
          this.employeInfo.documents.photocopieStatus.url = docBase64Path;
        }
        if(fileName == "decretMinisteriel"){
          this.employeInfo.documents.decretMinisteriel.url = docBase64Path;
        }
        if(fileName == "avisImmatriculation"){
          this.employeInfo.documents.avisImmatriculation.url = docBase64Path;
        }
        if(fileName == "carteNationaleIdentite"){
          this.employeInfo.documents.carteNationaleIdentite.url = docBase64Path;
        }
        if(fileName == "dmt"){
          this.employeInfo.documents.dmt.url = docBase64Path;
        }
        if(fileName == "contratsTravail"){
          this.employeInfo.documents.contratsTravail.url = docBase64Path;
        }
        if(fileName == "cni"){
          this.employeInfo.documents.cni.url = docBase64Path;
        }
        if(fileName == "carteIdentiteConsulaire"){
          this.employeInfo.documents.carteIdentiteConsulaire.url = docBase64Path;
        }
        if(fileName == "etatRecensement"){
          this.employeInfo.documents.etatRecensement.url = docBase64Path;
        }
        if(fileName == "attestationChomage"){
          this.employeInfo.documents.attestationChomage.url = docBase64Path;
        }
        if(fileName == "bulletinsSalaire"){
          this.employeInfo.documents.bulletinsSalaire.url = docBase64Path;
        }
        if(fileName == "cessationActivity"){
          this.employeInfo.documents.cessationActivity.url = docBase64Path;
        }
        if(fileName == "derniersBulletins"){
          this.employeInfo.documents.derniersBulletins.url = docBase64Path;
        }
        if(fileName == "manuscrieAdressee"){
          this.employeInfo.documents.manuscriteAdessee.url = docBase64Path;
        }
        if(fileName == "passportDoc"){
          this.employeInfo.documents.passportDoc.url = docBase64Path;
        }
        if(fileName == "pieceIdDoc"){
          this.employeInfo.documents.pieceIdDoc.url = docBase64Path;
        }
        if(fileName == "pieceIdGerantDoc"){
          this.employeInfo.documents.pieceIdDoc.url = docBase64Path;
        }

      };

      reader.readAsDataURL(fileInput.target.files[0]);
  }
}

  addNewEmp() { 
    let empList=(this.immatForm.get('input').get('employeList') as FormArray)
    empList.push(this.createItem());
    this.addEmpForm=true;
    this.editEmpForm=false;
    for(let i=0;i<empList.value.length; i++){
      console.log(empList.value[i]);
    if(empList.value[i].rechercheEmploye==""){
      this.addIndex=i;
      console.log(this.addIndex);
     }
     if(this.immatForm.get('input').get('mainRegistrationForm').get('noOfWorkersInGenScheme').value 
     <= this.immatForm.get('input').get('employeList')['controls'].length){
      this.maxRgGen=true;
     }
     else{
      this.maxRgGen=false; 
     }

  }
               
   }
   fillEmpForm(i){
    this.editIndex=i;
    this.addEmpForm=false;
    this.editEmpForm=true;
  }
   removeEmp(i) {
    let empList=(this.immatForm.get('input').get('employeList') as FormArray)
    empList.removeAt(i); 
     this.dataSource=empList.value;
     /* console.log(this.dataSource); */
     if(this.immatForm.get('input').get('mainRegistrationForm').get('noOfWorkersInGenScheme').value 
     <= this.immatForm.get('input').get('employeList')['controls'].length){
      this.maxRgGen=true;
     }
     else{
      this.maxRgGen=false; 
     }
   }
   
 
  updateEmp(i){
    let empList=(this.immatForm.get('input').get('employeList') as FormArray)
    /* let emp=this.immatForm.get('input').get('employeList').value; */
    let d=empList.value[i].dateNaissance;
    let d1=moment(d).format('YYYY-MM-DD');
    empList.value[i].dateNaissance=d1;
    console.log(d1); 
    this.dataSource=empList.value; 
    /* this.dataSource.sort=this.sort; */
    this.addEmpForm=false;
    this.editEmpForm=false;
    
  }
 
  /*  @Input() private format = 'YYYY/MM/DD HH:mm:ss';
addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateValue = moment(event.value, this.format);
}
@Input() _dateValue: string = null;
 */
/* get dateValue() {
    return moment(this._dateValue, this.format);
}
set dateValue(val) {
    this._dateValue = moment(val).format(this.format);
} */
 /*  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  } */

  
/*  getNinNumber(){
    let numPiece=this.immatForm.get('input').get('legalRepresentativeForm').get('nin').value
    this.immService.getNinNumber(numPiece).subscribe(
      resp=>console.log(resp)
    )
  }
  */
  get dateOfInspection() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('dateOfInspection');
  }
  get dateOfFirstHire() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('dateOfFirstHire');
  }
  get shortName() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('shortName');
  }
  get businessSector() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('businessSector');
  }
  get mainLineOfBusiness() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('mainLineOfBusiness');
  }
  get region() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('region');
  }
  get department() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('department');
  }
  get arondissement() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('arondissement');
  }
  get commune() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('arondissement');
  }
  get qartier() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('qartier');
  }
  get address() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('address');
  }
  get telephone() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('telephone');
  }
  get email() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('email');
  }
  get noOfWorkersInBasicScheme() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('noOfWorkersInBasicScheme');
  }
  get noOfWorkersInGenScheme() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('noOfWorkersInGenScheme');
  }
  get website() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('website');
  }
  get employerType() {
    return this.immatForm.get('input').get('employerQuery').get('employerType');
  }
  get typeEtablissement() {
    return this.immatForm.get('input').get('employerQuery').get('typeEtablissement');
  }
  get employerName() {
    return this.immatForm.get('input').get('employerQuery').get('employerName');
  }
  get nineaNumber() {
    return this.immatForm.get('input').get('employerQuery').get('nineaNumber');
  }
  get tradeRegisterNumber() {
    return this.immatForm.get('input').get('employerQuery').get('tradeRegisterNumber');
  }
  get regType() {
    return this.immatForm.get('input').get('employerQuery').get('regType');
  }
  get ninetNumber() {
    return this.immatForm.get('input').get('employerQuery').get('ninetNumber');
  }
  get companyOriginId() {
    return this.immatForm.get('input').get('employerQuery').get('companyOriginId');
  }
  get firstName() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('firstName');
  }
  get lastName() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('lastName');
  }
  get birthdate() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('birthdate');
  }
  get nationality() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('nationality');
  }
  get nin() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('nin');
  }
  get placeOfBirth() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('placeOfBirth');
  }
  get cityOfBirth() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('cityOfBirth');
  }
  get typeOfIdentity() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('typeOfIdentity');
  }
  get ninCedeo() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('ninCedeo');
  }
  get issuedDate() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('issuedDate');
  }
  get expiryDate() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('expiryDate');
  }
  get region1() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('region');
  }
  get department1() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('department');
  }
  get arondissement1() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('arondissement');
  }
  get commune1() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('commune');
  }
  get qartier1() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('qartier');
  }
  get address1() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('address');
  }
  get mobileNumber() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('mobileNumber');
  }
  get email1() {
    return this.immatForm.get('input').get('legalRepresentativeForm').get('email');
  }
  get nomEmploye() {
    return this.immatForm.get('input').get('employeList').get('nomEmploye');
  }
  get employeList() {
    return this.immatForm.get('input').get('employeList') as FormArray;
  }
  
}






















  /* immatForm=new FormGroup({
  input:new FormGroup ({
    mainRegistrationForm:new FormGroup({
    dateOfInspection:new FormControl('2020-01-01', Validators.required),
    dateOfFirstHire:new FormControl('2020-01-01', Validators.required),
    shortName:new FormControl(''),
    businessSector:new FormControl('Activités de fabrication', Validators.required),
    mainLineOfBusiness:new FormControl('ABATTAGE BETAIL', Validators.required),
    region:new FormControl('DAKAR', Validators.required),
    department:new FormControl('RUFISQUE', Validators.required),
    arondissement:new FormControl('RUFISQUE', Validators.required),
    commune:new FormControl('RUFISQUE EST', Validators.required),
    qartier:new FormControl('KEURY KAW', Validators.required),
    address:new FormControl('KEURY KAW lot 123 B', Validators.required),
    telephone:new FormControl('774142082', Validators.required),
    email:new FormControl('aloucams2@gmail.com', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.emailPattern)]}),
    website:new FormControl(''),
    noOfWorkersInBasicScheme:new FormControl('1', Validators.required),
    noOfWorkersInGenScheme:new FormControl('1', Validators.required)
  }),
    employerQuery:new FormGroup({
      employerType:new FormControl('PVT', Validators.required),
      legalStatus: new FormControl('CONC',Validators.required),
      typeEtablissement:new FormControl('HDQT', Validators.required),
      employerName:new FormControl('KB REST WS', Validators.required),
      nineaNumber:new FormControl('505750888',[Validators.required,Validators.maxLength(9)]),
      ninetNumber:new FormControl(''),
      regType:new FormControl('BVOLN', Validators.required),
      taxId:new FormControl('2G3'),
      taxIdDate:new FormControl('2020-01-01',Validators.required),
      tradeRegisterDate: new FormControl('2020-01-01',Validators.required),
      tradeRegisterNumber:new FormControl('SN.AKH.2020.C.13312',Validators.required),
    }),
    legalRepresentativeForm:new FormGroup({
      lastName:new FormControl('Al Hassane', Validators.required),
      firstName:new FormControl('CAMARA', Validators.required),
      birthdate:new FormControl('1991-11-11', Validators.required),
      nationality:new FormControl('SEN', Validators.required),
      nin:new FormControl('1548119104473', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.icnpattern)]}),
      placeOfBirth:new FormControl('Dakar', Validators.required),
      cityOfBirth:new FormControl('Dakar', Validators.required),
      typeOfIdentity:new FormControl('NIN', Validators.required),
      ninCedeo:new FormControl('', Validators.required),
      issuedDate:new FormControl('2030-01-10', Validators.required),
      landLineNumber:new FormControl('77147628', Validators.required),
      expiryDate:new FormControl('2020-01-10', Validators.required),
      region:new FormControl('Dakar', Validators.required),
      department:new FormControl('Dakar', Validators.required),
      arondissement:new FormControl('Almadies', Validators.required),
      commune:new FormControl('Dakar', Validators.required),
      qartier:new FormControl('Dakar', Validators.required),
      address:new FormControl('Dakar', Validators.required),
      mobileNumber:new FormControl('784142082', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.phonePattern)]}),
      email:new FormControl('kebe1702@gmail.com', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.emailPattern)]}),
      identityIdNumber:new FormControl(''),
      legalRepPerson:new  FormControl(''),
    })
       employeList: new FormArray([this.createItem()])  
  })
}) */
  

interface EmployeData {
  [index: number]:  {
    rechercheEmploye:string,
    nomEmploye:string,
    prenomEmploye:string , 
    sexe:string,  
    etatCivil:string,
    dateNaissance:string ,  
    numRegNaiss: string,
    nomPere: string,
    prenomPere:string, 
    nomMere: string, 
    prenomMere: string, 
    nationalite: string, 
    typePieceIdentite: string, 
    nin: string, 
    ninCedeao: string, 
    numPieceIdentite: string, 
    delivreLe: string, 
    lieuDelivrance: string, 
    expireLe: string, 
    villeNaissance: string, 
    paysNaissance: string, 
    employeurPrec: string, 
    pays: string, 
    region:string,  
    departement:string,
    arrondissement: string,
    commune:  string,
    quartier: string,
    adresse: string,
    boitePostale: string,
    typeMouvement:string, 
    natureContrat: string,
    dateDebutContrat: Date,
    dateFinContrat: Date,
    profession:string, 
    emploi: string,
    nonCadre: string,
    ouiCadre: string,
    conventionApplicable: string,
    salaireContractuel: string,
    tempsTravail: string,
    categorie: string
     
};
  

  


}
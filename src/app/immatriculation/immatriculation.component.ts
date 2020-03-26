import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialogConfig, MatDialog, MatSnackBar, NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material';
import { ImmatriculationService } from '../immatriculation.service';
import { formatDate } from '@angular/common';

export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      let day: string = date.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (date.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = date.getFullYear();
      return `${year}-${month}-${day}`;
    }
    return date.toDateString();
  }
}
export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric'
    },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

@Component({
  selector: 'app-immatriculation',
  templateUrl: './immatriculation.component.html',
  styleUrls: ['./immatriculation.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}},
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}]
  })
export class ImmatriculationComponent implements OnInit {
  listAct:any=[];
  listSect:any=[];
  listPrAct:any=[];
  listProfession:any=[];
  showFiller = false;
 
  documents:FormGroup;
  dateErrors:boolean=false
  listPays:any=[];
  listMainSectors:any=[];
  listSectors:any=[];
  list:any=[];
  listactivitePrincipal:any=[];
  activitePrincipal:any=[];
  listRegions:any=[];
  listDepartments:any=[];
  listArrondissements:any=[];
  listCommunes:any=[];
  initlistDept:any=[];
  listCommune:any=[];
  listArrondissemnt:any=[];
  listSector:any=[];
  listMainSector:any=[];
  ninea:any=[];
  loader:boolean=false;
  
  nineaExist:boolean=false;
  validICN:boolean=false;
  validPassport:boolean=false;
  validDateNaiss:boolean=false;
  snackBar:boolean=true;
  immatForm:FormGroup;

  srcResult:any;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  icnpattern = "^[1,2][0-9]{12,13}";
  phonePattern = "^((\\+91-?)|0)?[0-9]{9}$";
  
   addImmatriculation(){
    this.loader=true;
    this.immService.addImmatriculation(this.immatForm.value).subscribe((resp:any)=>{
      if(resp.value.output.employerRegistrationFormId!=0){
        this.loader=false;
        this.dialog.closeAll();
        this.snackB.open("Demande immatriculation envoyée avec succes","Fermer", {
          duration: 10000,
          panelClass: ['my-snack-bar','mat-success']
       });
      }
      
    }, error =>{
      if(error.status==500){
        this.loader=false;
        this.snackB.open("Eurreur d'envoi veiller réessayer","", {
          duration: 5000,
          panelClass: ['my-snack-bar1', "mat-warn"]
       })
      }
      else if(error.status==0){
         this.loader=false;  
        this.snackB.open("Eurreur d'envoi veiller vérifier la connection","", {
          duration: 5000,
          panelClass: ['my-snack-bar1', "mat-warn"]
       })
      }
      
    })
    
   
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
  
  constructor(private fb:FormBuilder,private dialog:MatDialog,
    private immService:ImmatriculationService,private snackB: MatSnackBar) {
      
     
    }
   
   initImmatForm(){
     this.immatForm=this.fb.group({
      input:  this.fb.group({
      mainRegistrationForm:this.fb.group({
    dateOfInspection:new FormControl('2020-01-01', Validators.required),
    dateOfFirstHire:this.fb.control('2020-01-01', Validators.required),
    shortName:this.fb.control(''),
    businessSector:this.fb.control('Activités de fabrication', Validators.required),
    mainLineOfBusiness:this.fb.control('ABATTAGE BETAIL', Validators.required),
    region:this.fb.control('DAKAR', Validators.required),
    department:this.fb.control('RUFISQUE', Validators.required),
    arondissement:this.fb.control('RUFISQUE', Validators.required),
    commune:this.fb.control('RUFISQUE EST', Validators.required),
    qartier:this.fb.control('KEURY KAW', Validators.required),
    address:this.fb.control('KEURY KAW lot 123 B', Validators.required),
    telephone:this.fb.control('774142082', Validators.required),
    email:this.fb.control('aloucams2@gmail.com', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.emailPattern)]}),
    website:this.fb.control(''),
    noOfWorkersInBasicScheme:this.fb.control('1', Validators.required),
    noOfWorkersInGenScheme:this.fb.control('1', Validators.required)
      }),
      employerQuery:this.fb.group({
        employerType:this.fb.control('PVT', Validators.required),
        legalStatus: this.fb.control('CONC',Validators.required),
        typeEtablissement:this.fb.control('HDQT', Validators.required),
        employerName:this.fb.control('KB REST WS', Validators.required),
        nineaNumber:this.fb.control('505750888',[Validators.required,Validators.maxLength(9)]),
        ninetNumber:this.fb.control(''),
        regType:this.fb.control('BVOLN', Validators.required),
        taxId:this.fb.control('2G3'),
        taxIdDate:this.fb.control('2020-01-01',Validators.required),
        tradeRegisterDate: this.fb.control('2020-01-01',Validators.required),
        tradeRegisterNumber:this.fb.control('SN.AKH.2020.C.13312',Validators.required),
      }),
      legalRepresentativeForm:new FormGroup({
        lastName:this.fb.control('Al Hassane', Validators.required),
        firstName:this.fb.control('CAMARA', Validators.required),
        birthdate:this.fb.control('1991-11-11', Validators.required),
        nationality:this.fb.control('SEN', Validators.required),
        nin:this.fb.control('1548119104473', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.icnpattern)]}),
        placeOfBirth:this.fb.control('Dakar', Validators.required),
        cityOfBirth:this.fb.control('Dakar', Validators.required),
        typeOfIdentity:this.fb.control('NIN', Validators.required),
        ninCedeo:this.fb.control('', Validators.required),
        issuedDate:this.fb.control('2030-01-10', Validators.required),
        landLineNumber:this.fb.control('77147628', Validators.required),
        expiryDate:this.fb.control('2020-01-10', Validators.required),
        region:this.fb.control('Dakar', Validators.required),
        department:this.fb.control('Dakar', Validators.required),
        arondissement:this.fb.control('Almadies', Validators.required),
        commune:this.fb.control('Dakar', Validators.required),
        qartier:this.fb.control('Dakar', Validators.required),
        address:this.fb.control('Dakar', Validators.required),
        mobileNumber:this.fb.control('784142082', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.phonePattern)]}),
        email:this.fb.control('kebe1702@gmail.com', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.emailPattern)]}),
        identityIdNumber:this.fb.control(''),
        legalRepPerson:this.fb.control(''),
      }),
         employeList: this.fb.array([this.createItem()])  
    })
    })
   }
  ngOnInit() {
    this.initImmatForm()
    window.localStorage.getItem("token");
    console.log(this.immatForm.value);
   
   
   this.initlistDept={
  "items":
  [
  {"rgion":"EX REGION","departement":"EX DEPT","version":1}
  ,{"rgion":"DIOURBEL","departement":"BAMBEY","version":1}
  ,{"rgion":"KAOLACK","departement":"NIORO","version":1}
  ,{"rgion":"FATICK","departement":"GOSSAS","version":1}
  ,{"rgion":"KOLDA","departement":"MEDINA YORO FOULAH","version":1}
  ,{"rgion":"LOUGA","departement":"LINGUERE","version":1}
  ,{"rgion":"KAFFRINE","departement":"KOUNGHEUL","version":1}
  ,{"rgion":"KOLDA","departement":"KOLDA","version":1}
  ,{"rgion":"DAKAR","departement":"DAKAR","version":1}
  ,{"rgion":"MATAM","departement":"KANEL","version":1}
  ,{"rgion":"KEDOUGOU","departement":"SALEMATA","version":1}
  ,{"rgion":"DIOURBEL","departement":"MBACKE","version":1}
  ,{"rgion":"SAINT-LOUIS","departement":"PODOR","version":1}
  ,{"rgion":"THIES","departement":"THIES","version":1}
  ,{"rgion":"ZIGUINCHOR","departement":"BIGNONA","version":1}
  ,{"rgion":"THIES","departement":"MBOUR","version":1}
  ,{"rgion":"THIES","departement":"TIVAOUANE","version":1}
  ,{"rgion":"ZIGUINCHOR","departement":"ZIGUINCHOR","version":1}
  ,{"rgion":"KAOLACK","departement":"KAOLACK","version":1}
  ,{"rgion":"SEDHIOU","departement":"BOUNKILING","version":1}
  ,{"rgion":"KAFFRINE","departement":"BIRKELANE","version":1}
  ,{"rgion":"MATAM","departement":"MATAM","version":1}
  ,{"rgion":"TAMBACOUNDA","departement":"GOUDIRY","version":1}
  ,{"rgion":"TAMBACOUNDA","departement":"KOUPENTOUM","version":1}
  ,{"rgion":"KEDOUGOU","departement":"SARAYA","version":1}
,{"rgion":"ZIGUINCHOR","departement":"OUSSOUYE","version":1}
,{"rgion":"KAFFRINE","departement":"MALEM HODDAR","version":1}
,{"rgion":"DAKAR","departement":"RUFISQUE","version":1}
,{"rgion":"DAKAR","departement":"GUEDIAWAYE","version":1}
,{"rgion":"TAMBACOUNDA","departement":"TAMBACOUNDA","version":1}
,{"rgion":"KOLDA","departement":"VELINGARA","version":1}
,{"rgion":"MATAM","departement":"RANEROU","version":1}
,{"rgion":"DAKAR","departement":"PIKINE","version":1}
,{"rgion":"LOUGA","departement":"LOUGA","version":1}
,{"rgion":"KEDOUGOU","departement":"KEDOUGOU","version":1}
,{"rgion":"SAINT-LOUIS","departement":"SAINT LOUIS","version":1}
,{"rgion":"DIOURBEL","departement":"DIOURBEL","version":1}
,{"rgion":"KAOLACK","departement":"GUINGUINEO","version":1}
,{"rgion":"FATICK","departement":"FATICK","version":1}
,{"rgion":"FATICK","departement":"FOUNDIOUGNE","version":1}
,{"rgion":"KAFFRINE","departement":"KAFFRINE","version":1}
,{"rgion":"SEDHIOU","departement":"GOUDOMP","version":1}
,{"rgion":"TAMBACOUNDA","departement":"BAKEL","version":1}
,{"rgion":"LOUGA","departement":"KEBEMER","version":1}
,{"rgion":"SEDHIOU","departement":"SEDHIOU","version":1}
,{"rgion":"SAINT-LOUIS","departement":"DAGANA","version":1}
,{"rgion":"SEDHIOU","departement":"SEDHIOU DEPARTEMENT","version":1}
  ]}    

   this.listArrondissemnt={
  "items":
[
{"region":"DIOURBEL","departement":"DIOURBEL","arrondissement":"NDINDY","version":1}
,{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"COM. NDOFFANE","version":1}
,{"region":"DIOURBEL","departement":"BAMBEY","arrondissement":"LAMBAYE","version":1}
,{"region":"KAOLACK","departement":"GUINGUINEO","arrondissement":"MBADAKHOUNE","version":1}
,{"region":"KAOLACK","departement":"NIORO","arrondissement":"COM. KEUR MADIABEL","version":1}
,{"region":"FATICK","departement":"FATICK","arrondissement":"NDIOB","version":1}
,{"region":"FATICK","departement":"GOSSAS","arrondissement":"COM. GOSSAS","version":1}
,{"region":"LOUGA","departement":"LINGUERE","arrondissement":"BARKEDJI","version":1}
,{"region":"LOUGA","departement":"KEBEMER","arrondissement":"COM. GUEOUL","version":1}
,{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"DIAROUME","version":1}
,{"region":"KOLDA","departement":"MEDINA YORO FOULAH","arrondissement":"COM. MEDINA YORO FOULAH","version":1}
,{"region":"SEDHIOU","departement":"SEDHIOU","arrondissement":"COM. SEDHIOU","version":1}
,{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"COM. GOUDOMP","version":1}
,{"region":"KOLDA","departement":"KOLDA","arrondissement":"DIOULACOLON","version":1}
,{"region":"KAFFRINE","departement":"KAFFRINE","arrondissement":"KATAKEL","version":1}
,{"region":"KAFFRINE","departement":"MALEM HODDAR","arrondissement":"SAGNA","version":1}
,{"region":"DAKAR","departement":"RUFISQUE","arrondissement":"RUFISQUE","version":1}
,{"region":"THIES","departement":"MBOUR","arrondissement":"COM. MBOUR","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. GUEDE CHANTIER","version":1}
,{"region":"SAINT-LOUIS","departement":"DAGANA","arrondissement":"NDIAYE","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. PODOR","version":1}
,{"region":"LOUGA","departement":"LOUGA","arrondissement":"COM. LOUGA","version":1}
,{"region":"MATAM","departement":"KANEL","arrondissement":"OURO SIDY","version":1}
,{"region":"LOUGA","departement":"LOUGA","arrondissement":"KEUR MOMAR SARR","version":1}
,{"region":"MATAM","departement":"MATAM","arrondissement":"COM. THILOGNE","version":1}
,{"region":"KEDOUGOU","departement":"SALEMATA","arrondissement":"COM. SALEMATA","version":1}
,{"region":"THIES","departement":"THIES","arrondissement":"COM. KHOMBOLE","version":1}
,{"region":"THIES","departement":"TIVAOUANE","arrondissement":"COM. MEKHE","version":1}
,{"region":"TAMBACOUNDA","departement":"TAMBACOUNDA","arrondissement":"MAKACOULIBANTANG","version":1}
,{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"TENDOUCK","version":1}
,{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"TENGHORY","version":1}
,{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"SINDIAN","version":1}
,{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"NGOTHIE","version":1}
,{"region":"DIOURBEL","departement":"BAMBEY","arrondissement":"COM. BAMBEY","version":1}
,{"region":"DIOURBEL","departement":"MBACKE","arrondissement":"KAEL","version":1}
,{"region":"KAOLACK","departement":"NIORO","arrondissement":"COM. NIORO","version":1}
,{"region":"KAOLACK","departement":"GUINGUINEO","arrondissement":"NGUELOU","version":1}
,{"region":"LOUGA","departement":"LINGUERE","arrondissement":"COM. DAHRA","version":1}
,{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"COM. MADINA WANDIFA","version":1}
,{"region":"SEDHIOU","departement":"SEDHIOU","arrondissement":"COM. DIANAH MALARY","version":1}
,{"region":"KOLDA","departement":"VELINGARA","arrondissement":"SARE COLY SALLE","version":1}
,{"region":"KOLDA","departement":"MEDINA YORO FOULAH","arrondissement":"COM. PATA","version":1}
,{"region":"KAFFRINE","departement":"KOUNGHEUL","arrondissement":"LOUR ESCALE","version":1}
,{"region":"KOLDA","departement":"VELINGARA","arrondissement":"BONCONTO","version":1}
,{"region":"KAFFRINE","departement":"BIRKELANE","arrondissement":"COM. BIRKELANE","version":1}
,{"region":"KOLDA","departement":"VELINGARA","arrondissement":"PAKOUR","version":1}
,{"region":"KAFFRINE","departement":"MALEM HODDAR","arrondissement":"DAROU MINAM II","version":1}
,{"region":"KOLDA","departement":"KOLDA","arrondissement":"COM. DABO","version":1}
,{"region":"MATAM","departement":"RANEROU","arrondissement":"VELINGARA","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"SALDE","version":1}
,{"region":"SAINT-LOUIS","departement":"DAGANA","arrondissement":"MBANE","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. NDIANDANE","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. AERE LAO","version":1}
,{"region":"LOUGA","departement":"LOUGA","arrondissement":"MBEDIENE","version":1}
,{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"KOULOR","version":1}
,{"region":"KEDOUGOU","departement":"SALEMATA","arrondissement":"DAR  SALAM","version":1}
,{"region":"KEDOUGOU","departement":"SARAYA","arrondissement":"COM. SARAYA","version":1}
,{"region":"TAMBACOUNDA","departement":"TAMBACOUNDA","arrondissement":"KOUSSANAR","version":1}
,{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"COM. KOTHIARY","version":1}
,{"region":"TAMBACOUNDA","departement":"BAKEL","arrondissement":"COM. DIAWARA","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"GAMADJI SARE","version":1}
,{"region":"TAMBACOUNDA","departement":"BAKEL","arrondissement":"MOUDERY","version":1}
,{"region":"DAKAR","departement":"DAKAR","arrondissement":"GRAND DAKAR","version":1}
,{"region":"ZIGUINCHOR","departement":"OUSSOUYE","arrondissement":"CABROUSSE","version":1}
,{"region":"ZIGUINCHOR","departement":"OUSSOUYE","arrondissement":"LOUDIA OUOLOF","version":1}
,{"region":"DIOURBEL","departement":"DIOURBEL","arrondissement":"NDOULO","version":1}
,{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"KOUMBAL","version":1}
,{"region":"FATICK","departement":"FATICK","arrondissement":"COM. DIAKHAO","version":1}
,{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"COM. SOUM","version":1}
,{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"NIODIOR","version":1}
,{"region":"KAOLACK","departement":"GUINGUINEO","arrondissement":"COM. GUINGUINEO","version":1}
,{"region":"LOUGA","departement":"LINGUERE","arrondissement":"COM. MBEULEUKHE","version":1}
,{"region":"LOUGA","departement":"KEBEMER","arrondissement":"COM. KEBEMER","version":1}
,{"region":"KAFFRINE","departement":"KOUNGHEUL","arrondissement":"MISSIRAH WADENE","version":1}
,{"region":"KOLDA","departement":"KOLDA","arrondissement":"SARE BIDJI","version":1}
,{"region":"KOLDA","departement":"VELINGARA","arrondissement":"COM. KOUNKANE","version":1}
,{"region":"THIES","departement":"MBOUR","arrondissement":"COM. POPOGUINE","version":1}
,{"region":"THIES","departement":"MBOUR","arrondissement":"FISSEL","version":1}
,{"region":"SAINT-LOUIS","departement":"DAGANA","arrondissement":"COM. RICHARD-TOLL","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. GOLLERE","version":1}
,{"region":"THIES","departement":"MBOUR","arrondissement":"SINDIA","version":1}
,{"region":"MATAM","departement":"KANEL","arrondissement":"COM. KANEL","version":1}
,{"region":"MATAM","departement":"MATAM","arrondissement":"COM. OUROSSOGUI","version":1}
,{"region":"MATAM","departement":"MATAM","arrondissement":"COM. NGUIDILOGNE","version":1}
,{"region":"KEDOUGOU","departement":"SARAYA","arrondissement":"BEMBOU","version":1}
,{"region":"KEDOUGOU","departement":"KEDOUGOU","arrondissement":"COM. KEDOUGOU","version":1}
,{"region":"TAMBACOUNDA","departement":"BAKEL","arrondissement":"COM. KIDIRA","version":1}
,{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"KATABA I","version":1}
,{"region":"ZIGUINCHOR","departement":"OUSSOUYE","arrondissement":"COM. OUSSOUYE","version":1}
,{"region":"ZIGUINCHOR","departement":"ZIGUINCHOR","arrondissement":"COM. ZIGUINCHOR","version":1}
,{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"COM. THIONCK-ESSYL","version":1}
,{"region":"FATICK","departement":"GOSSAS","arrondissement":"OUADIOUR","version":1}
,{"region":"KAFFRINE","departement":"KAFFRINE","arrondissement":"COM. NGANDA","version":1}
,{"region":"FATICK","departement":"GOSSAS","arrondissement":"COLOBANE","version":1}
,{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"COM. PASSY","version":1}
,{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"DJIBANAR","version":1}
,{"region":"SEDHIOU","departement":"SEDHIOU","arrondissement":"DJIREDJI","version":1}
,{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"BONA","version":1}
,{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"COM. TANAFF","version":1}
,{"region":"KOLDA","departement":"KOLDA","arrondissement":"COM. KOLDA","version":1}
,{"region":"DAKAR","departement":"PIKINE","arrondissement":"NIAYES","version":1}
,{"region":"DAKAR","departement":"RUFISQUE","arrondissement":"COM. SEBIKOTANE","version":1}
,{"region":"THIES","departement":"MBOUR","arrondissement":"COM. GUEKOKH","version":1}
,{"region":"SAINT-LOUIS","departement":"DAGANA","arrondissement":"COM. ROSSO-SENEGAL","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. BODE LAO","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. PETE","version":1}
,{"region":"LOUGA","departement":"LOUGA","arrondissement":"SAKAL","version":1}
,{"region":"LOUGA","departement":"LINGUERE","arrondissement":"DODJI","version":1}
,{"region":"MATAM","departement":"RANEROU","arrondissement":"COM. RANEROU","version":1}
,{"region":"KEDOUGOU","departement":"SARAYA","arrondissement":"SABODOLA","version":1}
,{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"BOYNGUEL BAMBA","version":1}
,{"region":"DAKAR","departement":"DAKAR","arrondissement":"ALMADIES","version":1}
,{"region":"ZIGUINCHOR","departement":"ZIGUINCHOR","arrondissement":"NYASSIA","version":1}
,{"region":"DIOURBEL","departement":"MBACKE","arrondissement":"TAIF","version":1}
,{"region":"KAFFRINE","departement":"KAFFRINE","arrondissement":"GNIBY","version":1}
,{"region":"FATICK","departement":"FATICK","arrondissement":"COM. FATICK","version":1}
,{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"COM. SOKONE","version":1}
,{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"COM. KARANG POSTE","version":1}
,{"region":"KAOLACK","departement":"GUINGUINEO","arrondissement":"COM. FASS","version":1}
,{"region":"LOUGA","departement":"KEBEMER","arrondissement":"NDANDE","version":1}
,{"region":"SEDHIOU","departement":"SEDHIOU","arrondissement":"DJIBABOUYA","version":1}
,{"region":"KOLDA","departement":"MEDINA YORO FOULAH","arrondissement":"AR.NDORNA","version":1}
,{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"COM. BOUNKILING","version":1},
{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"BOGHAL","version":1}
,{"region":"KAFFRINE","departement":"MALEM HODDAR","arrondissement":"COM. MALEM HODDAR","version":1}
,{"region":"KAFFRINE","departement":"BIRKELANE","arrondissement":"MABO","version":1}
,{"region":"KOLDA","departement":"KOLDA","arrondissement":"COM. SARE YOBA DIEGA","version":1}
,{"region":"DAKAR","departement":"RUFISQUE","arrondissement":"COM. SANGALKAM","version":1}
,{"region":"THIES","departement":"MBOUR","arrondissement":"COM. JOAL- FADIOUTH","version":1}
,{"region":"THIES","departement":"MBOUR","arrondissement":"COM. NGAPAROU","version":1}
,{"region":"DAKAR","departement":"DAKAR","arrondissement":"PARCELLES ASSAINIES","version":1}
,{"region":"DAKAR","departement":"RUFISQUE","arrondissement":"COM. DIAMNIADIO","version":1}
,{"region":"SAINT-LOUIS","departement":"DAGANA","arrondissement":"COM. DAGANA","version":1}
,{"region":"SAINT-LOUIS","departement":"DAGANA","arrondissement":"COM. GAE","version":1}
,{"region":"DAKAR","departement":"RUFISQUE","arrondissement":"COM. SENDOU","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. MBOUMBA","version":1}
,{"region":"MATAM","departement":"KANEL","arrondissement":"COM. HAMADY OUNARE","version":1}
,{"region":"MATAM","departement":"KANEL","arrondissement":"ORKADIERE","version":1}
,{"region":"MATAM","departement":"MATAM","arrondissement":"AGNAM-CIVOL","version":1}
,{"region":"THIES","departement":"TIVAOUANE","arrondissement":"MEOUANE","version":1}
,{"region":"KEDOUGOU","departement":"KEDOUGOU","arrondissement":"BANDAFASSI","version":1}
,{"region":"THIES","departement":"THIES","arrondissement":"THIENABA","version":1}
,{"region":"KEDOUGOU","departement":"SALEMATA","arrondissement":"DAKATELI","version":1}
,{"region":"THIES","departement":"TIVAOUANE","arrondissement":"NIAKHENE","version":1}
,{"region":"THIES","departement":"TIVAOUANE","arrondissement":"COM. TIVAOUANE","version":1}
,{"region":"THIES","departement":"TIVAOUANE","arrondissement":"COM. MBORO","version":1}
,{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"DIANKE MAKHA","version":1}
,{"region":"SAINT-LOUIS","departement":"SAINT LOUIS","arrondissement":"RAO","version":1}
,{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"COM. GOUDIRY","version":1}
,{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"BALA","version":1}
,{"region":"DIOURBEL","departement":"BAMBEY","arrondissement":"NGOYE","version":1}
,{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"COM. KAOLACK","version":1}
,{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"COM. GANDIAYE","version":1}
,{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"NDIEDIENG","version":1}
,{"region":"KAOLACK","departement":"GUINGUINEO","arrondissement":"COM. MBOSS","version":1}
,{"region":"SEDHIOU","departement":"SEDHIOU","arrondissement":"DIENDE","version":1}
,{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"SIMBANDI BRASSOU","version":1}
,{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"COM. NDIAMACOUTA","version":1}
,{"region":"KOLDA","departement":"MEDINA YORO FOULAH","arrondissement":"NIAMING","version":1}
,{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"COM. DIATTACOUNDA","version":1}
,{"region":"KAFFRINE","departement":"KOUNGHEUL","arrondissement":"COM. KOUNGHEUL","version":1}
,{"region":"KOLDA","departement":"KOLDA","arrondissement":"COM. SALIKEGNE","version":1}
,{"region":"DAKAR","departement":"RUFISQUE","arrondissement":"COM. BARGNY","version":1}
,{"region":"DAKAR","departement":"RUFISQUE","arrondissement":"COM. JAXAAY PARCELLE NIAKOUL RAP","version":1}
,{"region":"DAKAR","departement":"PIKINE","arrondissement":"PIKINE DAGOUDANE","version":1}
,{"region":"THIES","departement":"MBOUR","arrondissement":"COM. SOMONE","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. DEMETTE","version":1}
,{"region":"MATAM","departement":"KANEL","arrondissement":"COM. SINTHIOU BAMANBE-BANADJI","version":1}
,{"region":"MATAM","departement":"KANEL","arrondissement":"COM. ODOBERE","version":1}
,{"region":"LOUGA","departement":"LOUGA","arrondissement":"COM. NDIAGNE","version":1}
,{"region":"TAMBACOUNDA","departement":"KOUPENTOUM","arrondissement":"BAMBA  THIALENE","version":1}
,{"region":"THIES","departement":"THIES","arrondissement":"COM. CAYAR","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"THILLE BOUBACAR","version":1}
,{"region":"TAMBACOUNDA","departement":"BAKEL","arrondissement":"KENIEBA","version":1}
,{"region":"TAMBACOUNDA","departement":"TAMBACOUNDA","arrondissement":"COM. TAMBACOUNDA","version":1}
,{"region":"THIES","departement":"TIVAOUANE","arrondissement":"PAMBAL","version":1}
,{"region":"ZIGUINCHOR","departement":"ZIGUINCHOR","arrondissement":"NIAGUIS","version":1}
,{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"COM. BIGNONA","version":1}
,{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"COM. DIOULOULOU","version":1}
,{"region":"DIOURBEL","departement":"MBACKE","arrondissement":"NDAME","version":1}
,{"region":"DIOURBEL","departement":"DIOURBEL","arrondissement":"COM. DIOURBEL","version":1}
,{"region":"DIOURBEL","departement":"MBACKE","arrondissement":"COM. MBACKE","version":1}
,{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"COM. KAHONE","version":1}
,{"region":"FATICK","departement":"FATICK","arrondissement":"FIMELA","version":1}
,{"region":"FATICK","departement":"FATICK","arrondissement":"NIAKHAR","version":1}
,{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"TOUBACOUTA","version":1}
,{"region":"KAFFRINE","departement":"KAFFRINE","arrondissement":"COM. KAFFRINE","version":1}
,{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"COM. FOUNDIOUGNE","version":1}
,{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"DJILOR","version":1}
,{"region":"KOLDA","departement":"MEDINA YORO FOULAH","arrondissement":"FAFACOUROU","version":1}
,{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"KARANTABA","version":1}
,{"region":"LOUGA","departement":"LINGUERE","arrondissement":"COM. LINGUERE","version":1}
,{"region":"SEDHIOU","departement":"SEDHIOU","arrondissement":"COM. MARSASSOUM","version":1}
,{"region":"KAFFRINE","departement":"BIRKELANE","arrondissement":"KEUR MBOUKI","version":1}
,{"region":"KAFFRINE","departement":"KOUNGHEUL","arrondissement":"IDA MOURIDE","version":1}
,{"region":"KOLDA","departement":"VELINGARA","arrondissement":"COM. DIAOUBE- KABENDOU","version":1}
,{"region":"DAKAR","departement":"RUFISQUE","arrondissement":"BAMBYLOR","version":1}
,{"region":"DAKAR","departement":"GUEDIAWAYE","arrondissement":"GUEDIAWAYE","version":1}
,{"region":"THIES","departement":"MBOUR","arrondissement":"COM. SALY PORTUDAL","version":1}
,{"region":"SAINT-LOUIS","departement":"DAGANA","arrondissement":"COM. ROSS-BETHIO","version":1}
,{"region":"LOUGA","departement":"LINGUERE","arrondissement":"SAGATTA DJOLOF","version":1}
,{"region":"MATAM","departement":"KANEL","arrondissement":"COM. WAOUNDE","version":1}
,{"region":"MATAM","departement":"MATAM","arrondissement":"COM. MATAM","version":1}
,{"region":"MATAM","departement":"MATAM","arrondissement":"OGO","version":1}
,{"region":"THIES","departement":"THIES","arrondissement":"COM. POUT","version":1}
,{"region":"SAINT-LOUIS","departement":"SAINT LOUIS","arrondissement":"COM. SAINT LOUIS","version":1}
,{"region":"TAMBACOUNDA","departement":"TAMBACOUNDA","arrondissement":"MISSIRAH","version":1}
,{"region":"DIOURBEL","departement":"BAMBEY","arrondissement":"BABA GARAGE","version":1}
,{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"COM. SIBASSOR","version":1}
,{"region":"KAOLACK","departement":"NIORO","arrondissement":"MEDINA-SABAKH","version":1}
,{"region":"FATICK","departement":"FATICK","arrondissement":"TATTAGUINE","version":1}
,{"region":"KAOLACK","departement":"NIORO","arrondissement":"PAOSKOTO","version":1}
,{"region":"FATICK","departement":"FATICK","arrondissement":"COM. DIOFIOR","version":1}
,{"region":"KAOLACK","departement":"NIORO","arrondissement":"WACK-NGOUNA","version":1}
,{"region":"LOUGA","departement":"KEBEMER","arrondissement":"DAROU MOUSTY","version":1}
,{"region":"LOUGA","departement":"KEBEMER","arrondissement":"SAGATTA GUETH","version":1}
,{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"COM. SAMINE","version":1}
,{"region":"KOLDA","departement":"KOLDA","arrondissement":"MAMPATIM","version":1}
,{"region":"KOLDA","departement":"VELINGARA","arrondissement":"COM. VELINGARA","version":1}
,{"region":"THIES","departement":"MBOUR","arrondissement":"COM. THIADIAYE","version":1}
,{"region":"DAKAR","departement":"DAKAR","arrondissement":"DAKAR PLATEAU","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"CAS-CAS","version":1}
,{"region":"SAINT-LOUIS","departement":"DAGANA","arrondissement":"COM. NDOMBO SANDJIRY","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. NDIOUM","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. GALOYA TOUCOULEUR","version":1}
,{"region":"THIES","departement":"MBOUR","arrondissement":"SESSENE","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. WALALDE","version":1}
,{"region":"MATAM","departement":"KANEL","arrondissement":"COM. SEMME","version":1}
,{"region":"MATAM","departement":"KANEL","arrondissement":"COM. DEMBANCANE","version":1}
,{"region":"LOUGA","departement":"LOUGA","arrondissement":"COKI","version":1}
,{"region":"LOUGA","departement":"LINGUERE","arrondissement":"YANG YANG","version":1}
,{"region":"KEDOUGOU","departement":"KEDOUGOU","arrondissement":"FONGOLEMBI","version":1}
,{"region":"THIES","departement":"TIVAOUANE","arrondissement":"MERINA-DAKHAR","version":1}
,{"region":"TAMBACOUNDA","departement":"KOUPENTOUM","arrondissement":"COM. KOUMPENTOUM","version":1}
,{"region":"TAMBACOUNDA","departement":"KOUPENTOUM","arrondissement":"COM. MALEM NIANI","version":1}
,{"region":"THIES","departement":"THIES","arrondissement":"KEUR MOUSSA","version":1},
{"region":"TAMBACOUNDA","departement":"KOUPENTOUM","arrondissement":"KOUTHIABA WOLOF","version":1},
{"region":"THIES","departement":"THIES","arrondissement":"VILLE DE THIES","version":1}
,{"region":"THIES","departement":"THIES","arrondissement":"NOTTO","version":1}
,{"region":"SAINT-LOUIS","departement":"SAINT LOUIS","arrondissement":"COM. MPAL","version":1}
,{"region":"TAMBACOUNDA","departement":"BAKEL","arrondissement":"COM. BAKEL","version":1}
,{"region":"TAMBACOUNDA","departement":"BAKEL","arrondissement":"BELE","version":1}
,{"region":"SEDHIOU","departement":"SEDHIOU DEPARTEMENT","arrondissement":"SEDHIOU ARRONDISSEMENT","version":1}]}
  
  
  this.listCommune={
  "items":
[
{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"NGOTHIE","commune":"DYA","version":1}
,{"region":"DIOURBEL","departement":"BAMBEY","arrondissement":"NGOYE","commune":"NGOYE","version":1}
,{"region":"DIOURBEL","departement":"BAMBEY","arrondissement":"NGOYE","commune":"THIAKAR","version":1}
,{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"COM. KAOLACK","commune":"COM. KAOLACK","version":1}
,{"region":"DIOURBEL","departement":"MBACKE","arrondissement":"KAEL","commune":"MADINA","version":1}
,{"region":"DIOURBEL","departement":"DIOURBEL","arrondissement":"NDINDY","commune":"TOUBA LAPPE","version":1}
,{"region":"KAOLACK","departement":"NIORO","arrondissement":"COM. NIORO","commune":"COM. NIORO","version":1}
,{"region":"KAOLACK","departement":"GUINGUINEO","arrondissement":"MBADAKHOUNE","commune":"KHELCOM BIRAME","version":1}
,{"region":"FATICK","departement":"FATICK","arrondissement":"NIAKHAR","commune":"PATAR","version":1}
,{"region":"KAFFRINE","departement":"KAFFRINE","arrondissement":"COM. KAFFRINE","commune":"COM. KAFFRINE","version":1}
,{"region":"FATICK","departement":"GOSSAS","arrondissement":"COLOBANE","commune":"COLOBANE","version":1}
,{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"COM. SOKONE","commune":"COM. SOKONE","version":1}
,{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"DJILOR","commune":"DIOSSONG","version":1}
,{"region":"KAOLACK","departement":"NIORO","arrondissement":"WACK-NGOUNA","commune":"NDRAME ESCALE","version":1}
,{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"DJILOR","commune":"MBAM","version":1}
,{"region":"KAOLACK","departement":"NIORO","arrondissement":"WACK-NGOUNA","commune":"WACK NGOUNA","version":1}
,{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"NIODIOR","commune":"BASSOUL","version":1}
,{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"NIODIOR","commune":"DJIRNDA","version":1}
,{"region":"KAOLACK","departement":"GUINGUINEO","arrondissement":"COM. FASS","commune":"COM. FASS","version":1}
,{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"DJIBANAR","commune":"SIMBADI BALANTE","version":1}
,{"region":"KOLDA","departement":"MEDINA YORO FOULAH","arrondissement":"AR.NDORNA","commune":"NDORNA","version":1}
,{"region":"LOUGA","departement":"LINGUERE","arrondissement":"COM. DAHRA","commune":"COM. DAHRA","version":1}
,{"region":"LOUGA","departement":"LINGUERE","arrondissement":"BARKEDJI","commune":"BARKEDJI","version":1}
,{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"SIMBANDI BRASSOU","commune":"BAGHERE","version":1}
,{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"BOGHAL","commune":"DJINANY","version":1}
,{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"BOGHAL","commune":"NDIAMALATHIEL","version":1}
,{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"DIAROUME","commune":"DIAROUME","version":1}
,{"region":"KOLDA","departement":"MEDINA YORO FOULAH","arrondissement":"COM. MEDINA YORO FOULAH","commune":"COM. MEDINA YORO FOULAH","version":1}
,{"region":"LOUGA","departement":"LINGUERE","arrondissement":"COM. DAHRA","commune":"COM. DAHRA","version":1}
,{"region":"LOUGA","departement":"LINGUERE","arrondissement":"BARKEDJI","commune":"BARKEDJI","version":1}
,{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"SIMBANDI BRASSOU","commune":"BAGHERE","version":1}
,{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"BOGHAL","commune":"DJINANY","version":1}
,{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"BOGHAL","commune":"NDIAMALATHIEL","version":1}
,{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"DIAROUME","commune":"DIAROUME","version":1}
,{"region":"KOLDA","departement":"MEDINA YORO FOULAH","arrondissement":"COM. MEDINA YORO FOULAH","commune":"COM. MEDINA YORO FOULAH","version":1}
,{"region":"KOLDA","departement":"VELINGARA","arrondissement":"BONCONTO","commune":"LINKERING","version":1}
,{"region":"KAFFRINE","departement":"KAFFRINE","arrondissement":"KATAKEL","commune":"DIAMAGADIO","version":1}
,{"region":"KAFFRINE","departement":"BIRKELANE","arrondissement":"KEUR MBOUKI","commune":"TOUBA MBELLA","version":1}
,{"region":"KOLDA","departement":"KOLDA","arrondissement":"MAMPATIM","commune":"MAMPATIM","version":1}
,{"region":"KAFFRINE","departement":"MALEM HODDAR","arrondissement":"DAROU MINAM II","commune":"NDIOUM  NGAINTH","version":1}
,{"region":"KAFFRINE","departement":"MALEM HODDAR","arrondissement":"DAROU MINAM II","commune":"KHELCOM","version":1}
,{"region":"KOLDA","departement":"KOLDA","arrondissement":"MAMPATIM","commune":"MEDINA CHERIF","version":1}
,{"region":"KAFFRINE","departement":"KOUNGHEUL","arrondissement":"COM. KOUNGHEUL","commune":"COM. KOUNGHEUL","version":1}
,{"region":"KAFFRINE","departement":"MALEM HODDAR","arrondissement":"SAGNA","commune":"DIANKE SOUF","version":1}
,{"region":"KOLDA","departement":"KOLDA","arrondissement":"SARE BIDJI","commune":"SARE BIDJI","version":1}
,{"region":"DAKAR","departement":"RUFISQUE","arrondissement":"COM. SANGALKAM","commune":"COM. SANGALKAM","version":1}
,{"region":"DAKAR","departement":"RUFISQUE","arrondissement":"COM. JAXAAY PARCELLE NIAKOUL RAP","commune":"COM. JAXAAY PARCELLE NIAKOUL RAP","version":1}
,{"region":"DAKAR","departement":"RUFISQUE","arrondissement":"BAMBYLOR","commune":"TIVAOUANE PEULH-NIAGHA","version":1}
,{"region":"MATAM","departement":"RANEROU","arrondissement":"VELINGARA","commune":"OUDALAYE","version":1}
,{"region":"DAKAR","departement":"PIKINE","arrondissement":"NIAYES","commune":"MALIKA","version":1}
,{"region":"DAKAR","departement":"DAKAR","arrondissement":"PARCELLES ASSAINIES","commune":"Parcelles Assainies","version":1}
,{"region":"SAINT-LOUIS","departement":"DAGANA","arrondissement":"COM. DAGANA","commune":"COM. DAGANA","version":1}
,{"region":"THIES","departement":"MBOUR","arrondissement":"FISSEL","commune":"NDIAGANIAO","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. NDIANDANE","commune":"COM. NDIANDANE","version":1}
,{"region":"SAINT-LOUIS","departement":"DAGANA","arrondissement":"MBANE","commune":"BOKHOL","version":1}
,{"region":"THIES","departement":"MBOUR","arrondissement":"SESSENE","commune":"SANDIARA","version":1}
,{"region":"MATAM","departement":"KANEL","arrondissement":"COM. KANEL","commune":"COM. KANEL","version":1}
,{"region":"MATAM","departement":"KANEL","arrondissement":"COM. WAOUNDE","commune":"COM. WAOUNDE","version":1}
,{"region":"MATAM","departement":"KANEL","arrondissement":"ORKADIERE","commune":"BOKILADJI","version":1}
,{"region":"LOUGA","departement":"LINGUERE","arrondissement":"DODJI","commune":"DODJI","version":1}
,{"region":"LOUGA","departement":"LINGUERE","arrondissement":"DODJI","commune":"OUARKHOH","version":1}
,{"region":"LOUGA","departement":"LINGUERE","arrondissement":"YANG YANG","commune":"TESSEKRE FORAGE","version":1}
,{"region":"LOUGA","departement":"LOUGA","arrondissement":"KEUR MOMAR SARR","commune":"NGUER MALAL","version":1}
,{"region":"LOUGA","departement":"LINGUERE","arrondissement":"SAGATTA DJOLOF","commune":"BOULAL","version":1}
,{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"KOULOR","commune":"KOULOR","version":1}
,{"region":"TAMBACOUNDA","departement":"KOUPENTOUM","arrondissement":"COM. MALEM NIANI","commune":"COM. MALEM NIANI","version":1}
,{"region":"THIES","departement":"TIVAOUANE","arrondissement":"NIAKHENE","commune":"NIAKHENE","version":1}
,{"region":"KEDOUGOU","departement":"SARAYA","arrondissement":"BEMBOU","commune":"MEDINA BAFFE","version":1}
,{"region":"TAMBACOUNDA","departement":"KOUPENTOUM","arrondissement":"KOUTHIABA WOLOF","commune":"KOUTHIABA WOLOF","version":1}
,{"region":"THIES","departement":"THIES","arrondissement":"VILLE DE THIES","commune":"THIES NORD","version":1}
,{"region":"THIES","departement":"THIES","arrondissement":"VILLE DE THIES","commune":"THIES EST","version":1}
,{"region":"KEDOUGOU","departement":"KEDOUGOU","arrondissement":"BANDAFASSI","commune":"BANDAFASSI","version":1}
,{"region":"KEDOUGOU","departement":"KEDOUGOU","arrondissement":"BANDAFASSI","commune":"TOMBORONKOTO","version":1}
,{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"DIANKE MAKHA","commune":"BANI   ISRAEL","version":1}
,{"region":"TAMBACOUNDA","departement":"BAKEL","arrondissement":"KENIEBA","commune":"SADATOU","version":1}
,{"region":"TAMBACOUNDA","departement":"BAKEL","arrondissement":"KENIEBA","commune":"TOUMBOURA","version":1}
,{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"TENDOUCK","commune":"MLOMP","version":1}
,{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"TENGHORY","commune":"NIAMONE","version":1}
,{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"KATABA I","commune":"DJINAKI","version":1}
,{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"KATABA I","commune":"KATABA I","version":1}
,{"region":"DAKAR","departement":"DAKAR","arrondissement":"GRAND DAKAR","commune":"SICAP LIBERTE","version":1}
,{"region":"ZIGUINCHOR","departement":"OUSSOUYE","arrondissement":"COM. OUSSOUYE","commune":"COM. OUSSOUYE","version":1}
,{"region":"DAKAR","departement":"DAKAR","arrondissement":"DAKAR PLATEAU","commune":"FANN POINT E AMITIE","version":1}
,{"region":"DAKAR","departement":"DAKAR","arrondissement":"GRAND DAKAR","commune":"BISCUITERIE","version":1}
,{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"COM. KAHONE","commune":"COM. KAHONE","version":1}
,{"region":"DIOURBEL","departement":"DIOURBEL","arrondissement":"NDINDY","commune":"GADE ESCALE","version":1}
,{"region":"DIOURBEL","departement":"MBACKE","arrondissement":"KAEL","commune":"DAROU NAHIM","version":1}
,{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"KOUMBAL","commune":"LATMINGUE","version":1}
,{"region":"DIOURBEL","departement":"MBACKE","arrondissement":"NDAME","commune":"DALLA NGABOU","version":1}
,{"region":"DIOURBEL","departement":"MBACKE","arrondissement":"NDAME","commune":"NGHAYE","version":1}
,{"region":"FATICK","departement":"FATICK","arrondissement":"NIAKHAR","commune":"NGAYOKHEME","version":1}
,{"region":"KAOLACK","departement":"NIORO","arrondissement":"MEDINA-SABAKH","commune":"KAYEMOR","version":1}
,{"region":"FATICK","departement":"GOSSAS","arrondissement":"OUADIOUR","commune":"NDIENE LAGANE","version":1}
,{"region":"KAOLACK","departement":"GUINGUINEO","arrondissement":"NGUELOU","commune":"OUROUR","version":1}
,{"region":"KAOLACK","departement":"NIORO","arrondissement":"PAOSKOTO","commune":"TAÏBA NIASSENE","version":1}
,{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"COM. KARANG POSTE","commune":"COM. KARANG POSTE","version":1}
,{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"DJILOR","commune":"NIASSENE","version":1}
,{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"NIODIOR","commune":"DIONEWAR","version":1}
,{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"TOUBACOUTA","commune":"KEUR S.DIANE","version":1}
,{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"COM. BOUNKILING","commune":"COM. BOUNKILING","version":1}
,{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"COM. MADINA WANDIFA","commune":"COM. MADINA WANDIFA","version":1}
,{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"BOGHAL","commune":"BOGHAL","version":1}
,{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"SIMBANDI BRASSOU","commune":"SIMBANDI BRASSOU","version":1}
,{"region":"KOLDA","departement":"MEDINA YORO FOULAH","arrondissement":"AR.NDORNA","commune":"BOUROUCO","version":1}
,{"region":"LOUGA","departement":"KEBEMER","arrondissement":"SAGATTA GUETH","commune":"THIOLOM FALL","version":1}
,{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"BONA","commune":"BONA","version":1}
,{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"DIAROUME","commune":"DIAMBATY","version":1}
,{"region":"SEDHIOU","departement":"SEDHIOU","arrondissement":"DIENDE","commune":"DIENDE","version":1}
,{"region":"KAFFRINE","departement":"KAFFRINE","arrondissement":"KATAKEL","commune":"MEDINATOUL SALAM 2","version":1}
,{"region":"KOLDA","departement":"KOLDA","arrondissement":"SARE BIDJI","commune":"THIETTY","version":1}
,{"region":"KOLDA","departement":"VELINGARA","arrondissement":"COM. KOUNKANE","commune":"COM. KOUNKANE","version":1}
,{"region":"DAKAR","departement":"PIKINE","arrondissement":"PIKINE DAGOUDANE","commune":"MBAO","version":1}
,{"region":"DAKAR","departement":"GUEDIAWAYE","arrondissement":"GUEDIAWAYE","commune":"MEDINA GOUNASS","version":1}
,{"region":"DAKAR","departement":"RUFISQUE","arrondissement":"COM. SEBIKOTANE","commune":"COM. SEBIKOTANE","version":1}
,{"region":"SAINT-LOUIS","departement":"DAGANA","arrondissement":"COM. NDOMBO SANDJIRY","commune":"COM. NDOMBO SANDJIRY","version":1}
,{"region":"THIES","departement":"MBOUR","arrondissement":"SINDIA","commune":"SINDIA","version":1}
,{"region":"LOUGA","departement":"LOUGA","arrondissement":"MBEDIENE","commune":"MBEDIENE","version":1}
,{"region":"MATAM","departement":"KANEL","arrondissement":"COM. HAMADY OUNARE","commune":"COM. HAMADY OUNARE","version":1}
,{"region":"MATAM","departement":"KANEL","arrondissement":"COM. ODOBERE","commune":"COM. ODOBERE","version":1}
,{"region":"LOUGA","departement":"LOUGA","arrondissement":"SAKAL","commune":"SAKAL","version":1}
,{"region":"MATAM","departement":"MATAM","arrondissement":"COM. OUROSSOGUI","commune":"COM. OUROSSOGUI","version":1}
,{"region":"TAMBACOUNDA","departement":"KOUPENTOUM","arrondissement":"BAMBA  THIALENE","commune":"BAMBA  THIALENE","version":1}
,{"region":"KEDOUGOU","departement":"SARAYA","arrondissement":"COM. SARAYA","commune":"COM. SARAYA","version":1}
,{"region":"KEDOUGOU","departement":"SARAYA","arrondissement":"BEMBOU","commune":"BEMBOU","version":1}
,{"region":"THIES","departement":"THIES","arrondissement":"COM. POUT","commune":"COM. POUT","version":1}
,{"region":"THIES","departement":"THIES","arrondissement":"NOTTO","commune":"NOTTO","version":1}
,{"region":"THIES","departement":"THIES","arrondissement":"THIENABA","commune":"NDIEYENE SIRAKH","version":1}
,{"region":"TAMBACOUNDA","departement":"BAKEL","arrondissement":"COM. BAKEL","commune":"COM. BAKEL","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"GAMADJI SARE","commune":"DODEL","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"GAMADJI SARE","commune":"GUEDE VILLAGE","version":1}
,{"region":"DAKAR","departement":"DAKAR","arrondissement":"ALMADIES","commune":"MERMOZ SACRE COEUR","version":1}
,{"region":"ZIGUINCHOR","departement":"OUSSOUYE","arrondissement":"CABROUSSE","commune":"DJEMBERING","version":1}
,{"region":"DAKAR","departement":"DAKAR","arrondissement":"GRAND DAKAR","commune":"Grand Dakar","version":1}
,{"region":"ZIGUINCHOR","departement":"ZIGUINCHOR","arrondissement":"NIAGUIS","commune":"NIAGUIS","version":1}
,{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"KOUMBAL","commune":"KEUR BAKA","version":1}
,{"region":"DIOURBEL","departement":"BAMBEY","arrondissement":"COM. BAMBEY","commune":"COM. BAMBEY","version":1}
,{"region":"DIOURBEL","departement":"BAMBEY","arrondissement":"BABA GARAGE","commune":"BABA GARAGE","version":1}
,{"region":"DIOURBEL","departement":"MBACKE","arrondissement":"TAIF","commune":"SADIO","version":1}
,{"region":"DIOURBEL","departement":"BAMBEY","arrondissement":"BABA GARAGE","commune":"DINGUIRAYE","version":1}
,{"region":"DIOURBEL","departement":"MBACKE","arrondissement":"COM. MBACKE","commune":"COM. MBACKE","version":1}
,{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"NDIEDIENG","commune":"KEUR SOCE","version":1}
,{"region":"DIOURBEL","departement":"BAMBEY","arrondissement":"LAMBAYE","commune":"NGOGOM","version":1}
,{"region":"DIOURBEL","departement":"BAMBEY","arrondissement":"NGOYE","commune":"DANGALMA","version":1}
,{"region":"DIOURBEL","departement":"BAMBEY","arrondissement":"NGOYE","commune":"NDONDOL","version":1}
,{"region":"KAOLACK","departement":"GUINGUINEO","arrondissement":"MBADAKHOUNE","commune":"NDIAGO","version":1}
,{"region":"FATICK","departement":"GOSSAS","arrondissement":"OUADIOUR","commune":"PATAR LIA","version":1}
,{"region":"KAFFRINE","departement":"KAFFRINE","arrondissement":"COM. NGANDA","commune":"COM. NGANDA","version":1}
,{"region":"FATICK","departement":"FATICK","arrondissement":"COM. DIAKHAO","commune":"COM. DIAKHAO","version":1}
,{"region":"FATICK","departement":"FATICK","arrondissement":"NDIOB","commune":"MBELACADIAO","version":1}
,{"region":"FATICK","departement":"FATICK","arrondissement":"NDIOB","commune":"THIARE  NDIALGUI","version":1}
,{"region":"FATICK","departement":"FATICK","arrondissement":"FIMELA","commune":"FIMELA","version":1}
,{"region":"FATICK","departement":"FATICK","arrondissement":"FIMELA","commune":"LOUL-SESSENE","version":1}
,{"region":"FATICK","departement":"FATICK","arrondissement":"FIMELA","commune":"PALMARIN FACAO","version":1}
,{"region":"LOUGA","departement":"KEBEMER","arrondissement":"DAROU MOUSTY","commune":"MBACKE CADIOR","version":1}
,{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"DJIBANAR","commune":"KAOUR","version":1}
,{"region":"SEDHIOU","departement":"SEDHIOU","arrondissement":"DJIBABOUYA","commune":"SANSAMBA","version":1}
,{"region":"LOUGA","departement":"KEBEMER","arrondissement":"SAGATTA GUETH","commune":"SAGATTA GUETH","version":1}
,{"region":"LOUGA","departement":"LINGUERE","arrondissement":"COM. LINGUERE","commune":"COM. LINGUERE","version":1}
,{"region":"LOUGA","departement":"KEBEMER","arrondissement":"DAROU MOUSTY","commune":"MBADIANE","version":1}
,{"region":"LOUGA","departement":"KEBEMER","arrondissement":"SAGATTA GUETH","commune":"LORO","version":1}
,{"region":"KOLDA","departement":"VELINGARA","arrondissement":"SARE COLY SALLE","commune":"KANDIAYE","version":1}
,{"region":"SEDHIOU","departement":"SEDHIOU","arrondissement":"DIENDE","commune":"DIANNAH BA","version":1}
,{"region":"KOLDA","departement":"KOLDA","arrondissement":"DIOULACOLON","commune":"TANKANTO ESCALE","version":1}
,{"region":"KOLDA","departement":"VELINGARA","arrondissement":"BONCONTO","commune":"BONCONTO","version":1}
,{"region":"KAFFRINE","departement":"BIRKELANE","arrondissement":"KEUR MBOUKI","commune":"KEUR MBOUKI","version":1}
,{"region":"KAFFRINE","departement":"KOUNGHEUL","arrondissement":"MISSIRAH WADENE","commune":"MISSIRAH WADENE","version":1}
,{"region":"KOLDA","departement":"VELINGARA","arrondissement":"PAKOUR","commune":"PAKOUR","version":1}
,{"region":"KOLDA","departement":"KOLDA","arrondissement":"MAMPATIM","commune":"DIALAMBERE","version":1}
,{"region":"KOLDA","departement":"KOLDA","arrondissement":"COM. KOLDA","commune":"COM. KOLDA","version":1}
,{"region":"KOLDA","departement":"KOLDA","arrondissement":"DIOULACOLON","commune":"DIOULACOLON","version":1}
,{"region":"DAKAR","departement":"RUFISQUE","arrondissement":"COM. BARGNY","commune":"COM. BARGNY","version":1}
,{"region":"THIES","departement":"MBOUR","arrondissement":"COM. JOAL- FADIOUTH","commune":"COM. JOAL- FADIOUTH","version":1}
,{"region":"DAKAR","departement":"PIKINE","arrondissement":"NIAYES","commune":"KEUR MASSAR","version":1}
,{"region":"DAKAR","departement":"PIKINE","arrondissement":"PIKINE DAGOUDANE","commune":"DJIDAH THIAROYE KAO","version":1}
,{"region":"THIES","departement":"MBOUR","arrondissement":"COM. THIADIAYE","commune":"COM. THIADIAYE","version":1}
,{"region":"DAKAR","departement":"DAKAR","arrondissement":"PARCELLES ASSAINIES","commune":"Grand YOFF","version":1}
,{"region":"SAINT-LOUIS","departement":"DAGANA","arrondissement":"COM. ROSSO-SENEGAL","commune":"COM. ROSSO-SENEGAL","version":1}
,{"region":"THIES","departement":"MBOUR","arrondissement":"SESSENE","commune":"NGUENIENE","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. AERE LAO","commune":"COM. AERE LAO","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. WALALDE","commune":"COM. WALALDE","version":1}
,{"region":"THIES","departement":"MBOUR","arrondissement":"SESSENE","commune":"SESSENE","version":1}
,{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. PODOR","commune":"COM. PODOR","version":1}
,{"region":"MATAM","departement":"KANEL","arrondissement":"COM. DEMBANCANE","commune":"COM. DEMBANCANE","version":1}
,{"region":"MATAM","departement":"KANEL","arrondissement":"ORKADIERE","commune":"ORKADIERE","version":1}
,{"region":"LOUGA","departement":"LINGUERE","arrondissement":"SAGATTA DJOLOF","commune":"AFFE DJOLOFF","version":1}
,{"region":"LOUGA","departement":"LOUGA","arrondissement":"COM. LOUGA","commune":"COM. LOUGA","version":1}
,{"region":"LOUGA","departement":"LINGUERE","arrondissement":"DODJI","commune":"LABGAR","version":1}
,{"region":"THIES","departement":"THIES","arrondissement":"THIENABA","commune":"NGOUNDIANE","version":1}
,{"region":"TAMBACOUNDA","departement":"KOUPENTOUM","arrondissement":"COM. KOUMPENTOUM","commune":"COM. KOUMPENTOUM","version":1}
,{"region":"KEDOUGOU","departement":"SALEMATA","arrondissement":"DAR  SALAM","commune":"DAR SALAM","version":1}
,{"region":"THIES","departement":"TIVAOUANE","arrondissement":"NIAKHENE","commune":"NGANDIOUF","version":1}
,{"region":"THIES","departement":"TIVAOUANE","arrondissement":"MEOUANE","commune":"TAIBA NDIAYE","version":1}
,{"region":"TAMBACOUNDA","departement":"TAMBACOUNDA","arrondissement":"KOUSSANAR","commune":"SINTHIOU MALEM","version":1}
,{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"COM. KOTHIARY","commune":"COM. KOTHIARY","version":1}
,{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"BALA","commune":"BALA","version":1}
,{"region":"TAMBACOUNDA","departement":"TAMBACOUNDA","arrondissement":"MAKACOULIBANTANG","commune":"NDOGA BABACAR","version":1},{"region":"TAMBACOUNDA","departement":"BAKEL","arrondissement":"KENIEBA","commune":"MADINA FOULBE","version":1},{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"DIANKE MAKHA","commune":"DIANKE MAKHA","version":1},{"region":"TAMBACOUNDA","departement":"BAKEL","arrondissement":"BELE","commune":"SINTHIOU-FISSA","version":1},{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"BOYNGUEL BAMBA","commune":"BOYNGUEL BAMBA","version":1},{"region":"TAMBACOUNDA","departement":"TAMBACOUNDA","arrondissement":"MAKACOULIBANTANG","commune":"NIANI TOUCOULEUR","version":1},{"region":"TAMBACOUNDA","departement":"TAMBACOUNDA","arrondissement":"COM. TAMBACOUNDA","commune":"COM. TAMBACOUNDA","version":1},{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"KATABA I","commune":"KAFOUNTINE","version":1},{"region":"DAKAR","departement":"DAKAR","arrondissement":"DAKAR PLATEAU","commune":"MEDINA","version":1},{"region":"ZIGUINCHOR","departement":"ZIGUINCHOR","arrondissement":"NYASSIA","commune":"ENAMPORE","version":1},{"region":"DIOURBEL","departement":"DIOURBEL","arrondissement":"NDOULO","commune":"TOCKY GARE","version":1},{"region":"DIOURBEL","departement":"DIOURBEL","arrondissement":"NDINDY","commune":"DANKH  SENE","version":1},{"region":"DIOURBEL","departement":"MBACKE","arrondissement":"KAEL","commune":"DAROU SALAM  TYP","version":1},{"region":"DIOURBEL","departement":"BAMBEY","arrondissement":"BABA GARAGE","commune":"K. SAMBA KANE","version":1},{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"COM. SIBASSOR","commune":"COM. SIBASSOR","version":1},{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"NDIEDIENG","commune":"NDIAFFATE","version":1},{"region":"KAOLACK","departement":"GUINGUINEO","arrondissement":"MBADAKHOUNE","commune":"MBADAKHOUNE","version":1},{"region":"KAOLACK","departement":"NIORO","arrondissement":"MEDINA-SABAKH","commune":"MEDINA-SABAKH","version":1},{"region":"KAOLACK","departement":"NIORO","arrondissement":"MEDINA-SABAKH","commune":"NGAYENE","version":1},{"region":"KAOLACK","departement":"GUINGUINEO","arrondissement":"NGUELOU","commune":"NGUELOU","version":1},{"region":"FATICK","departement":"FATICK","arrondissement":"TATTAGUINE","commune":"DIOUROUP","version":1},{"region":"FATICK","departement":"GOSSAS","arrondissement":"COLOBANE","commune":"MBAR","version":1},{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"COM. FOUNDIOUGNE","commune":"COM. FOUNDIOUGNE","version":1},{"region":"KAOLACK","departement":"NIORO","arrondissement":"WACK-NGOUNA","commune":"K. MANDONGO","version":1},{"region":"LOUGA","departement":"KEBEMER","arrondissement":"NDANDE","commune":"DIOKOUL DIAWRIGNE","version":1},{"region":"LOUGA","departement":"KEBEMER","arrondissement":"NDANDE","commune":"KAB GAYE","version":1},{"region":"LOUGA","departement":"KEBEMER","arrondissement":"DAROU MOUSTY","commune":"DAROU MARNANE","version":1},{"region":"LOUGA","departement":"KEBEMER","arrondissement":"NDANDE","commune":"NDANDE","version":1},{"region":"LOUGA","departement":"KEBEMER","arrondissement":"DAROU MOUSTY","commune":"TOUBA MERINA","version":1},{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"COM. GOUDOMP","commune":"COM. GOUDOMP","version":1},{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"COM. SAMINE","commune":"COM. SAMINE","version":1},{"region":"KAFFRINE","departement":"KAFFRINE","arrondissement":"KATAKEL","commune":"DIOKOUL MBELBOUCK","version":1},{"region":"KAFFRINE","departement":"KAFFRINE","arrondissement":"KATAKEL","commune":"KATHIOTE","version":1},{"region":"KAFFRINE","departement":"KOUNGHEUL","arrondissement":"LOUR ESCALE","commune":"RIBOT ESCALE","version":1},{"region":"KOLDA","departement":"VELINGARA","arrondissement":"BONCONTO","commune":"MEDINA GOUNASS","version":1},{"region":"KOLDA","departement":"KOLDA","arrondissement":"DIOULACOLON","commune":"GUIRO YERO BOCAR","version":1},{"region":"KAFFRINE","departement":"BIRKELANE","arrondissement":"COM. BIRKELANE","commune":"COM. BIRKELANE","version":1},{"region":"KAFFRINE","departement":"BIRKELANE","arrondissement":"KEUR MBOUKI","commune":"DIAMAL","version":1},{"region":"KAFFRINE","departement":"MALEM HODDAR","arrondissement":"COM. MALEM HODDAR","commune":"COM. MALEM HODDAR","version":1},{"region":"KAFFRINE","departement":"BIRKELANE","arrondissement":"MABO","commune":"MABO","version":1},{"region":"KAFFRINE","departement":"MALEM HODDAR","arrondissement":"DAROU MINAM II","commune":"NDIOBENE SAMBA LAMO","version":1},{"region":"KAFFRINE","departement":"KOUNGHEUL","arrondissement":"IDA MOURIDE","commune":"SALY ESCALE","version":1},{"region":"KAFFRINE","departement":"MALEM HODDAR","arrondissement":"SAGNA","commune":"SAGNA","version":1},{"region":"KOLDA","departement":"KOLDA","arrondissement":"COM. SALIKEGNE","commune":"COM. SALIKEGNE","version":1},{"region":"THIES","departement":"MBOUR","arrondissement":"COM. MBOUR","commune":"COM. MBOUR","version":1},{"region":"DAKAR","departement":"PIKINE","arrondissement":"NIAYES","commune":"YEUMBEUL SUD","version":1},{"region":"DAKAR","departement":"GUEDIAWAYE","arrondissement":"GUEDIAWAYE","commune":"NDIAREME LIMAMOULAYE","version":1},{"region":"DAKAR","departement":"PIKINE","arrondissement":"PIKINE DAGOUDANE","commune":"THIAROYE \/MER","version":1},{"region":"THIES","departement":"MBOUR","arrondissement":"COM. SALY PORTUDAL","commune":"COM. SALY PORTUDAL","version":1},{"region":"THIES","departement":"MBOUR","arrondissement":"COM. SOMONE","commune":"COM. SOMONE","version":1},{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"CAS-CAS","commune":"DOUNGA-LAO","version":1},{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. GOLLERE","commune":"COM. GOLLERE","version":1},{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. BODE LAO","commune":"COM. BODE LAO","version":1},{"region":"DAKAR","departement":"RUFISQUE","arrondissement":"COM. SENDOU","commune":"COM. SENDOU","version":1},{"region":"THIES","departement":"MBOUR","arrondissement":"SINDIA","commune":"MALICOUNDA","version":1},{"region":"LOUGA","departement":"LINGUERE","arrondissement":"SAGATTA DJOLOF","commune":"DEALI","version":1},{"region":"MATAM","departement":"KANEL","arrondissement":"COM. SEMME","commune":"COM. SEMME","version":1},{"region":"MATAM","departement":"KANEL","arrondissement":"COM. SINTHIOU BAMANBE-BANADJI","commune":"COM. SINTHIOU BAMANBE-BANADJI","version":1},{"region":"LOUGA","departement":"LINGUERE","arrondissement":"BARKEDJI","commune":"GASSANE","version":1},{"region":"MATAM","departement":"KANEL","arrondissement":"ORKADIERE","commune":"AOURE","version":1},{"region":"LOUGA","departement":"LOUGA","arrondissement":"SAKAL","commune":"LEONA","version":1},{"region":"MATAM","departement":"KANEL","arrondissement":"OURO SIDY","commune":"NDENDORY","version":1},{"region":"LOUGA","departement":"LOUGA","arrondissement":"COKI","commune":"THIAMENE CAYOR","version":1},{"region":"MATAM","departement":"MATAM","arrondissement":"COM. NGUIDILOGNE","commune":"COM. NGUIDILOGNE","version":1},{"region":"MATAM","departement":"MATAM","arrondissement":"AGNAM-CIVOL","commune":"OREFONDE","version":1},{"region":"KEDOUGOU","departement":"KEDOUGOU","arrondissement":"BANDAFASSI","commune":"DINDIFELO","version":1},{"region":"KEDOUGOU","departement":"KEDOUGOU","arrondissement":"FONGOLEMBI","commune":"DIMBOLI","version":1},{"region":"THIES","departement":"THIES","arrondissement":"THIENABA","commune":"THIENABA","version":1},{"region":"THIES","departement":"TIVAOUANE","arrondissement":"MERINA-DAKHAR","commune":"KOUL","version":1},{"region":"KEDOUGOU","departement":"SALEMATA","arrondissement":"DAKATELI","commune":"DAKATELI","version":1},{"region":"THIES","departement":"TIVAOUANE","arrondissement":"MERINA-DAKHAR","commune":"MERINA DAKHAR","version":1},{"region":"THIES","departement":"THIES","arrondissement":"KEUR MOUSSA","commune":"DIENDER GUEDJI","version":1},{"region":"KEDOUGOU","departement":"KEDOUGOU","arrondissement":"COM. KEDOUGOU","commune":"COM. KEDOUGOU","version":1},{"region":"TAMBACOUNDA","departement":"BAKEL","arrondissement":"MOUDERY","commune":"BALLOU","version":1},{"region":"TAMBACOUNDA","departement":"TAMBACOUNDA","arrondissement":"MISSIRAH","commune":"DIALACOTO","version":1},{"region":"TAMBACOUNDA","departement":"TAMBACOUNDA","arrondissement":"KOUSSANAR","commune":"KOUSSANAR","version":1},{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"TENGHORY","commune":"OUONCK","version":1},{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"TENGHORY","commune":"TENGHORY","version":1},{"region":"DAKAR","departement":"DAKAR","arrondissement":"GRAND DAKAR","commune":"HANN BEL AIR","version":1},{"region":"ZIGUINCHOR","departement":"ZIGUINCHOR","arrondissement":"NIAGUIS","commune":"BOUTOUPA CAMAR","version":1},{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"SINDIAN","commune":"SUELLE","version":1},{"region":"DIOURBEL","departement":"MBACKE","arrondissement":"TAIF","commune":"TAÏF","version":1},{"region":"DIOURBEL","departement":"DIOURBEL","arrondissement":"COM. DIOURBEL","commune":"COM. DIOURBEL","version":1},{"region":"DIOURBEL","departement":"MBACKE","arrondissement":"KAEL","commune":"KAEL","version":1},{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"COM. NDOFFANE","commune":"COM. NDOFFANE","version":1},{"region":"DIOURBEL","departement":"DIOURBEL","arrondissement":"NDINDY","commune":"KEUR NGALGOU","version":1},{"region":"DIOURBEL","departement":"MBACKE","arrondissement":"KAEL","commune":"TAIBA TIECKENE","version":1},{"region":"DIOURBEL","departement":"DIOURBEL","arrondissement":"NDOULO","commune":"NDOULO","version":1},{"region":"DIOURBEL","departement":"DIOURBEL","arrondissement":"NDOULO","commune":"NGOHE","version":1},
{"region":"FATICK","departement":"FATICK","arrondissement":"NIAKHAR","commune":"NIAKHAR","version":1}
,{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"TOUBACOUTA","commune":"TOUBACOUTA","version":1}
,{"region":"FATICK","departement":"FATICK","arrondissement":"COM. FATICK","commune":"COM. FATICK","version":1}
,{"region":"FATICK","departement":"FATICK","arrondissement":"TATTAGUINE","commune":"TATTAGUINE","version":1}
,{"region":"FATICK","departement":"GOSSAS","arrondissement":"COM. GOSSAS","commune":"COM. GOSSAS","version":1}
,{"region":"KAOLACK","departement":"NIORO","arrondissement":"PAOSKOTO","commune":"DAROU SALAM","version":1}
,{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"DJILOR","commune":"DJILOR","version":1}
,{"region":"KOLDA","departement":"MEDINA YORO FOULAH","arrondissement":"FAFACOUROU","commune":"FAFACOUROU","version":1}
,{"region":"SEDHIOU","departement":"SEDHIOU","arrondissement":"DIENDE","commune":"OUDOUCAR","version":1}
,{"region":"KOLDA","departement":"MEDINA YORO FOULAH","arrondissement":"FAFACOUROU","commune":"BADION","version":1}
,{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"BOGHAL","commune":"TANKON","version":1}
,{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"SIMBANDI BRASSOU","commune":"DIOUBOUDOU","version":1}
,{"region":"LOUGA","departement":"KEBEMER","arrondissement":"COM. KEBEMER","commune":"COM. KEBEMER","version":1}
,{"region":"KOLDA","departement":"MEDINA YORO FOULAH","arrondissement":"AR.NDORNA","commune":"KOULINTO","version":1}
,{"region":"KOLDA","departement":"MEDINA YORO FOULAH","arrondissement":"NIAMING","commune":"NIAMING","version":1}
,{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"COM. DIATTACOUNDA","commune":"COM. DIATTACOUNDA","version":1}
,{"region":"KOLDA","departement":"KOLDA","arrondissement":"DIOULACOLON","commune":"MEDINA  EL HADJI","version":1}
,{"region":"KOLDA","departement":"VELINGARA","arrondissement":"SARE COLY SALLE","commune":"SARE COLY SALLE","version":1}
,{"region":"KOLDA","departement":"VELINGARA","arrondissement":"PAKOUR","commune":"PAROUMBA","version":1}
,{"region":"KOLDA","departement":"VELINGARA","arrondissement":"SARE COLY SALLE","commune":"NEMATABA","version":1}
,{"region":"KOLDA","departement":"VELINGARA","arrondissement":"PAKOUR","commune":"OUASSADOU","version":1}
,{"region":"KAFFRINE","departement":"BIRKELANE","arrondissement":"MABO","commune":"NDIOGNICK","version":1}
,{"region":"KAFFRINE","departement":"BIRKELANE","arrondissement":"MABO","commune":"MBEULEUP","version":1}
,{"region":"KOLDA","departement":"KOLDA","arrondissement":"COM. DABO","commune":"COM. DABO","version":1}
,{"region":"DAKAR","departement":"RUFISQUE","arrondissement":"RUFISQUE","commune":"RUFISQUE EST","version":1}
,{"region":"DAKAR","departement":"PIKINE","arrondissement":"PIKINE DAGOUDANE","commune":"DALIFORD","version":1}
,{"region":"DAKAR","departement":"DAKAR","arrondissement":"DAKAR PLATEAU","commune":"Plateau","version":1}
,{"region":"SAINT-LOUIS","departement":"DAGANA","arrondissement":"MBANE","commune":"MBANE","version":1}
,{"region":"SAINT-LOUIS","departement":"DAGANA","arrondissement":"NDIAYE","commune":"RONKH","version":1}
,{"region":"LOUGA","departement":"LOUGA","arrondissement":"MBEDIENE","commune":"NIOMRE","version":1}
,{"region":"MATAM","departement":"KANEL","arrondissement":"OURO SIDY","commune":"OURO SIDY","version":1}
,{"region":"LOUGA","departement":"LINGUERE","arrondissement":"YANG YANG","commune":"MBOULA","version":1}
,{"region":"MATAM","departement":"MATAM","arrondissement":"COM. THILOGNE","commune":"COM. THILOGNE","version":1}
,{"region":"MATAM","departement":"MATAM","arrondissement":"OGO","commune":"NABADJI-CIVOL","version":1}
,{"region":"MATAM","departement":"MATAM","arrondissement":"OGO","commune":"OGO","version":1}
,{"region":"KEDOUGOU","departement":"KEDOUGOU","arrondissement":"BANDAFASSI","commune":"NINEFECHA","version":1}
,{"region":"THIES","departement":"THIES","arrondissement":"THIENABA","commune":"TOUBA TOUL","version":1}
,{"region":"KEDOUGOU","departement":"SALEMATA","arrondissement":"DAR  SALAM","commune":"ETHIOLO","version":1}
,{"region":"KEDOUGOU","departement":"SALEMATA","arrondissement":"DAR  SALAM","commune":"OUBADJI","version":1},{"region":"THIES","departement":"TIVAOUANE","arrondissement":"NIAKHENE","commune":"THILMAKHA","version":1},{"region":"THIES","departement":"THIES","arrondissement":"VILLE DE THIES","commune":"THIES OUEST","version":1},{"region":"THIES","departement":"TIVAOUANE","arrondissement":"COM. MEKHE","commune":"COM. MEKHE","version":1}
,{"region":"THIES","departement":"TIVAOUANE","arrondissement":"COM. MBORO","commune":"COM. MBORO","version":1},{"region":"THIES","departement":"THIES","arrondissement":"NOTTO","commune":"TASSETTE","version":1},{"region":"SAINT-LOUIS","departement":"SAINT LOUIS","arrondissement":"RAO","commune":"GANDON","version":1},{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"COM. GOUDIRY","commune":"COM. GOUDIRY","version":1},{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"BALA","commune":"GOUMBAYEL","version":1},{"region":"TAMBACOUNDA","departement":"BAKEL","arrondissement":"BELE","commune":"BELE","version":1},
{"region":"TAMBACOUNDA","departement":"BAKEL","arrondissement":"MOUDERY","commune":"GABOU","version":1},{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"GAMADJI SARE","commune":"GAMADJI SARE","version":1},{"region":"TAMBACOUNDA","departement":"BAKEL","arrondissement":"MOUDERY","commune":"MOUDERY","version":1},{"region":"TAMBACOUNDA","departement":"TAMBACOUNDA","arrondissement":"MISSIRAH","commune":"MISSIRAH","version":1},{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"TENDOUCK","commune":"DIEGOUNE","version":1},{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"TENDOUCK","commune":"KARTHIACK","version":1},{"region":"THIES","departement":"TIVAOUANE","arrondissement":"PAMBAL","commune":"PAMBAL","version":1},
{"region":"DAKAR","departement":"DAKAR","arrondissement":"DAKAR PLATEAU","commune":"COLOBANE\/FASS\/GUEULE TAPEE","version":1},{"region":"ZIGUINCHOR","departement":"ZIGUINCHOR","arrondissement":"COM. ZIGUINCHOR","commune":"COM. ZIGUINCHOR","version":1},{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"SINDIAN","commune":"DJIBIDIONE","version":1},{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"SINDIAN","commune":"OULAMPANE","version":1},{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"TENDOUCK","commune":"BALINGORE","version":1},{"region":"DIOURBEL","departement":"DIOURBEL","arrondissement":"NDOULO","commune":"PATAR","version":1},{"region":"DIOURBEL","departement":"DIOURBEL","arrondissement":"NDOULO","commune":"TOURE MBONDE","version":1},{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"COM. GANDIAYE","commune":"COM. GANDIAYE","version":1},{"region":"DIOURBEL","departement":"DIOURBEL","arrondissement":"NDINDY","commune":"TAIBA MOUTOUPHA","version":1},{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"NDIEDIENG","commune":"NDIEDIENG","version":1},{"region":"DIOURBEL","departement":"MBACKE","arrondissement":"NDAME","commune":"MISSIRAH","version":1},{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"TOUBACOUTA","commune":"KEUR  SAMBA GUEYE","version":1},{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"NGOTHIE","commune":"THIOMBY","version":1}
,{"region":"FATICK","departement":"GOSSAS","arrondissement":"OUADIOUR","commune":"OUADIOUR","version":1},{"region":"KAOLACK","departement":"NIORO","arrondissement":"PAOSKOTO","commune":"GAINTE KAYE","version":1},{"region":"KAOLACK","departement":"NIORO","arrondissement":"PAOSKOTO","commune":"PAOSKOTO","version":1},{"region":"FATICK","departement":"FATICK","arrondissement":"NDIOB","commune":"DIAOULE","version":1},{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"COM. SOUM","commune":"COM. SOUM","version":1},{"region":"FATICK","departement":"FATICK","arrondissement":"NDIOB","commune":"NDIOB","version":1}
,{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"DJILOR","commune":"DIAGANE BARKA","version":1},{"region":"LOUGA","departement":"KEBEMER","arrondissement":"NDANDE","commune":"BADEGNE OUOLOF","version":1},{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"DJIBANAR","commune":"DJIBANAR","version":1},{"region":"SEDHIOU","departement":"SEDHIOU","arrondissement":"DIENDE","commune":"SAMA KANTA PEULH","version":1}
,{"region":"SEDHIOU","departement":"SEDHIOU","arrondissement":"DJIBABOUYA","commune":"BENET- BIJINI","version":1},{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"KARANTABA","commune":"KARANTABA","version":1},{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"KARANTABA","commune":"KOLIBANTANG","version":1},{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"SIMBANDI BRASSOU","commune":"NIAGHA","version":1},{"region":"SEDHIOU","departement":"SEDHIOU","arrondissement":"DJIREDJI","commune":"DJIREDJI","version":1},{"region":"LOUGA","departement":"KEBEMER","arrondissement":"SAGATTA GUETH","commune":"NGOURANE OUOLOF","version":1},{"region":"LOUGA","departement":"KEBEMER","arrondissement":"SAGATTA GUETH","commune":"KANENE NDIOB","version":1}
,{"region":"LOUGA","departement":"KEBEMER","arrondissement":"COM. GUEOUL","commune":"COM. GUEOUL","version":1},{"region":"LOUGA","departement":"KEBEMER","arrondissement":"DAROU MOUSTY","commune":"DAROU MOUSTY","version":1},{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"BONA","commune":"DIACOUNDA","version":1},{"region":"KOLDA","departement":"MEDINA YORO FOULAH","arrondissement":"NIAMING","commune":"KEREWANE","version":1},{"region":"LOUGA","departement":"KEBEMER","arrondissement":"DAROU MOUSTY","commune":"NDOYENE","version":1},{"region":"LOUGA","departement":"KEBEMER","arrondissement":"DAROU MOUSTY","commune":"SAM YABAL","version":1},{"region":"SEDHIOU","departement":"SEDHIOU","arrondissement":"COM. MARSASSOUM","commune":"COM. MARSASSOUM","version":1},{"region":"SEDHIOU","departement":"SEDHIOU","arrondissement":"DIENDE","commune":"SAKAR","version":1}
,{"region":"KAFFRINE","departement":"KOUNGHEUL","arrondissement":"LOUR ESCALE","commune":"LOUR ESCALE","version":1},{"region":"KOLDA","departement":"VELINGARA","arrondissement":"BONCONTO","commune":"SINTHIANG  KOUNDARA","version":1},{"region":"KAFFRINE","departement":"KOUNGHEUL","arrondissement":"MISSIRAH WADENE","commune":"GAINTHE PATHE","version":1},{"region":"KAFFRINE","departement":"KOUNGHEUL","arrondissement":"MISSIRAH WADENE","commune":"MAKA YOP","version":1},{"region":"KAFFRINE","departement":"MALEM HODDAR","arrondissement":"DAROU MINAM II","commune":"DAROU MINAM II","version":1},{"region":"KOLDA","departement":"VELINGARA","arrondissement":"SARE COLY SALLE","commune":"KANDIA","version":1},{"region":"KOLDA","departement":"VELINGARA","arrondissement":"COM. DIAOUBE- KABENDOU","commune":"COM. DIAOUBE- KABENDOU","version":1}
,{"region":"DAKAR","departement":"RUFISQUE","arrondissement":"BAMBYLOR","commune":"BAMBYLOR","version":1},{"region":"DAKAR","departement":"PIKINE","arrondissement":"PIKINE DAGOUDANE","commune":"GUINAW RAIL SUD","version":1},{"region":"DAKAR","departement":"DAKAR","arrondissement":"PARCELLES ASSAINIES","commune":"CAMBERENE","version":1},{"region":"THIES","departement":"MBOUR","arrondissement":"FISSEL","commune":"FISSEL","version":1},{"region":"DAKAR","departement":"RUFISQUE","arrondissement":"BAMBYLOR","commune":"YENE","version":1},{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. GALOYA TOUCOULEUR","commune":"COM. GALOYA TOUCOULEUR","version":1},{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. MBOUMBA","commune":"COM. MBOUMBA","version":1},{"region":"LOUGA","departement":"LOUGA","arrondissement":"MBEDIENE","commune":"NGUIDILE","version":1},{"region":"LOUGA","departement":"LINGUERE","arrondissement":"SAGATTA DJOLOF","commune":"THIAMENE DJOLOF","version":1},{"region":"LOUGA","departement":"LOUGA","arrondissement":"COM. NDIAGNE","commune":"COM. NDIAGNE","version":1},{"region":"LOUGA","departement":"LOUGA","arrondissement":"COKI","commune":"PETE OUARACK","version":1},{"region":"MATAM","departement":"RANEROU","arrondissement":"VELINGARA","commune":"LOUGRE-THIOLY","version":1},{"region":"LOUGA","departement":"LINGUERE","arrondissement":"YANG YANG","commune":"YANG YANG","version":1},{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"KOULOR","commune":"SINTHIOU BOCAR ALI","version":1},{"region":"KEDOUGOU","departement":"KEDOUGOU","arrondissement":"FONGOLEMBI","commune":"FONGOLEMBI","version":1},{"region":"KEDOUGOU","departement":"SALEMATA","arrondissement":"DAKATELI","commune":"KEVOYE","version":1},{"region":"TAMBACOUNDA","departement":"KOUPENTOUM","arrondissement":"BAMBA  THIALENE","commune":"NDAME","version":1},{"region":"THIES","departement":"THIES","arrondissement":"KEUR MOUSSA","commune":"KEUR MOUSSA","version":1},{"region":"KEDOUGOU","departement":"SARAYA","arrondissement":"SABODOLA","commune":"SABODALA","version":1},{"region":"THIES","departement":"THIES","arrondissement":"COM. KHOMBOLE","commune":"COM. KHOMBOLE","version":1},{"region":"THIES","departement":"THIES","arrondissement":"COM. CAYAR","commune":"COM. CAYAR","version":1},{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"DIANKE MAKHA","commune":"KOMOTI","version":1},{"region":"SAINT-LOUIS","departement":"SAINT LOUIS","arrondissement":"COM. SAINT LOUIS","commune":"COM. SAINT LOUIS","version":1},{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"THILLE BOUBACAR","commune":"NDIAYENE PENDAO","version":1},{"region":"TAMBACOUNDA","departement":"BAKEL","arrondissement":"COM. DIAWARA","commune":"COM. DIAWARA","version":1},{"region":"TAMBACOUNDA","departement":"BAKEL","arrondissement":"KENIEBA","commune":"GATHIARY","version":1},{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"DIANKE MAKHA","commune":"BOUTOUCOUFARA","version":1},{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"TENDOUCK","commune":"MANGAGOULACK","version":1},{"region":"THIES","departement":"TIVAOUANE","arrondissement":"PAMBAL","commune":"NOTTO GOUYE DIAMA","version":1},{"region":"THIES","departement":"TIVAOUANE","arrondissement":"PAMBAL","commune":"PIRE GOUREYE","version":1},{"region":"DAKAR","departement":"DAKAR","arrondissement":"ALMADIES","commune":"YOFF","version":1},{"region":"DAKAR","departement":"DAKAR","arrondissement":"GRAND DAKAR","commune":"DIEUPPEUL DERKLE","version":1},{"region":"ZIGUINCHOR","departement":"OUSSOUYE","arrondissement":"LOUDIA OUOLOF","commune":"MLOMP","version":1},{"region":"ZIGUINCHOR","departement":"ZIGUINCHOR","arrondissement":"NIAGUIS","commune":"ADEANE","version":1},{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"COM. BIGNONA","commune":"COM. BIGNONA","version":1},{"region":"ZIGUINCHOR","departement":"ZIGUINCHOR","arrondissement":"NYASSIA","commune":"NYASSIA","version":1},{"region":"DIOURBEL","departement":"BAMBEY","arrondissement":"LAMBAYE","commune":"GAWANE","version":1},{"region":"DIOURBEL","departement":"MBACKE","arrondissement":"KAEL","commune":"NDIOUMANE  T. THIEKENE","version":1},{"region":"DIOURBEL","departement":"MBACKE","arrondissement":"KAEL","commune":"TOUBA  MBOUL","version":1},{"region":"DIOURBEL","departement":"BAMBEY","arrondissement":"LAMBAYE","commune":"REFANE","version":1},{"region":"DIOURBEL","departement":"MBACKE","arrondissement":"NDAME","commune":"TOUBA FALL","version":1},{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"KOUMBAL","commune":"THIARE","version":1},{"region":"FATICK","departement":"FATICK","arrondissement":"FIMELA","commune":"DJILASSE","version":1},{"region":"KAFFRINE","departement":"KAFFRINE","arrondissement":"GNIBY","commune":"BOULEL","version":1},{"region":"KAOLACK","departement":"GUINGUINEO","arrondissement":"NGUELOU","commune":"DARA MBOSS","version":1},{"region":"KAOLACK","departement":"GUINGUINEO","arrondissement":"NGUELOU","commune":"PANAL OUOLOF","version":1},{"region":"KAOLACK","departement":"NIORO","arrondissement":"PAOSKOTO","commune":"POROKHANE","version":1},{"region":"FATICK","departement":"FATICK","arrondissement":"COM. DIOFIOR","commune":"COM. DIOFIOR","version":1},{"region":"KAOLACK","departement":"NIORO","arrondissement":"PAOSKOTO","commune":"DABALY","version":1},{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"DJIBANAR","commune":"YARANG BALANTE","version":1},{"region":"SEDHIOU","departement":"SEDHIOU","arrondissement":"DJIREDJI","commune":"BAMBALI","version":1},{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"COM. NDIAMACOUTA","commune":"COM. NDIAMACOUTA","version":1},{"region":"LOUGA","departement":"KEBEMER","arrondissement":"NDANDE","commune":"THIEPPE","version":1},{"region":"KOLDA","departement":"MEDINA YORO FOULAH","arrondissement":"NIAMING","commune":"DINGUIRAYE","version":1},{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"BONA","commune":"KANDION MANGANA","version":1},{"region":"SEDHIOU","departement":"SEDHIOU","arrondissement":"COM. SEDHIOU","commune":"COM. SEDHIOU","version":1},{"region":"SEDHIOU","departement":"SEDHIOU","arrondissement":"COM. DIANAH MALARY","commune":"COM. DIANAH MALARY","version":1},{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"COM. TANAFF","commune":"COM. TANAFF","version":1},{"region":"KOLDA","departement":"KOLDA","arrondissement":"MAMPATIM","commune":"BAGADADJI","version":1},{"region":"KAFFRINE","departement":"BIRKELANE","arrondissement":"MABO","commune":"SEGRE GATTA","version":1},{"region":"KAFFRINE","departement":"KAFFRINE","arrondissement":"GNIBY","commune":"GNIBY","version":1},{"region":"KAFFRINE","departement":"KOUNGHEUL","arrondissement":"IDA MOURIDE","commune":"FASS THIEKENE","version":1},{"region":"KAFFRINE","departement":"KOUNGHEUL","arrondissement":"IDA MOURIDE","commune":"IDA MOURIDE","version":1},{"region":"KAFFRINE","departement":"KAFFRINE","arrondissement":"GNIBY","commune":"KAHI","version":1},{"region":"DAKAR","departement":"RUFISQUE","arrondissement":"RUFISQUE","commune":"RUFISQUE OUEST","version":1},{"region":"DAKAR","departement":"GUEDIAWAYE","arrondissement":"GUEDIAWAYE","commune":"SAM  NOTAIRE","version":1},{"region":"DAKAR","departement":"GUEDIAWAYE","arrondissement":"GUEDIAWAYE","commune":"GOLF SUD","version":1},{"region":"DAKAR","departement":"DAKAR","arrondissement":"PARCELLES ASSAINIES","commune":"PATTE D OIE","version":1},{"region":"DAKAR","departement":"PIKINE","arrondissement":"PIKINE DAGOUDANE","commune":"DIACK SAO","version":1},{"region":"DAKAR","departement":"PIKINE","arrondissement":"PIKINE DAGOUDANE","commune":"THIAROYE GARE","version":1},{"region":"DAKAR","departement":"DAKAR","arrondissement":"DAKAR PLATEAU","commune":"GOREE","version":1},{"region":"SAINT-LOUIS","departement":"DAGANA","arrondissement":"COM. ROSS-BETHIO","commune":"COM. ROSS-BETHIO","version":1},{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. NDIOUM","commune":"COM. NDIOUM","version":1},{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. PETE","commune":"COM. PETE","version":1},{"region":"SAINT-LOUIS","departement":"DAGANA","arrondissement":"NDIAYE","commune":"DIAMA","version":1},{"region":"LOUGA","departement":"LINGUERE","arrondissement":"SAGATTA DJOLOF","commune":"SAGATTA DJOLOF","version":1},{"region":"LOUGA","departement":"LINGUERE","arrondissement":"BARKEDJI","commune":"THIEL","version":1},{"region":"LOUGA","departement":"LOUGA","arrondissement":"COKI","commune":"COKI","version":1},{"region":"MATAM","departement":"RANEROU","arrondissement":"VELINGARA","commune":"VELINGARA","version":1},{"region":"LOUGA","departement":"LOUGA","arrondissement":"SAKAL","commune":"NGUEUNE SARR","version":1},{"region":"LOUGA","departement":"LOUGA","arrondissement":"KEUR MOMAR SARR","commune":"GANDE","version":1},{"region":"MATAM","departement":"MATAM","arrondissement":"AGNAM-CIVOL","commune":"DABIA","version":1},{"region":"LOUGA","departement":"LOUGA","arrondissement":"KEUR MOMAR SARR","commune":"SYER","version":1},{"region":"LOUGA","departement":"LOUGA","arrondissement":"MBEDIENE","commune":"KELLE GUEYE","version":1},{"region":"THIES","departement":"TIVAOUANE","arrondissement":"MEOUANE","commune":"DAROU KHOUDOSS","version":1},{"region":"THIES","departement":"THIES","arrondissement":"KEUR MOUSSA","commune":"FANDENE","version":1},{"region":"TAMBACOUNDA","departement":"KOUPENTOUM","arrondissement":"KOUTHIABA WOLOF","commune":"KOUTHIA GAYDI","version":1},{"region":"THIES","departement":"TIVAOUANE","arrondissement":"MERINA-DAKHAR","commune":"PEKESSE","version":1},{"region":"THIES","departement":"TIVAOUANE","arrondissement":"COM. TIVAOUANE","commune":"COM. TIVAOUANE","version":1},{"region":"SAINT-LOUIS","departement":"SAINT LOUIS","arrondissement":"COM. MPAL","commune":"COM. MPAL","version":1},{"region":"TAMBACOUNDA","departement":"TAMBACOUNDA","arrondissement":"MISSIRAH","commune":"NETTE BOULOU","version":1},{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"THILLE BOUBACAR","commune":"FANAYE","version":1},{"region":"TAMBACOUNDA","departement":"TAMBACOUNDA","arrondissement":"MAKACOULIBANTANG","commune":"MAKACOULIBATANG","version":1},{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"BALA","commune":"KOAR","version":1},{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"BOYNGUEL BAMBA","commune":"DOUGUE","version":1},{"region":"DAKAR","departement":"DAKAR","arrondissement":"ALMADIES","commune":"OUAKAM","version":1},{"region":"ZIGUINCHOR","departement":"OUSSOUYE","arrondissement":"CABROUSSE","commune":"SANTHIABA MANJACQUE","version":1},{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"COM. THIONCK-ESSYL","commune":"COM. THIONCK-ESSYL","version":1},{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"COM. DIOULOULOU","commune":"COM. DIOULOULOU","version":1},{"region":"DIOURBEL","departement":"MBACKE","arrondissement":"NDAME","commune":"TOUBA MOSQUEE","version":1},{"region":"DIOURBEL","departement":"MBACKE","arrondissement":"KAEL","commune":"DENDEYE GOUYE GUI","version":1},{"region":"DIOURBEL","departement":"DIOURBEL","arrondissement":"NDINDY","commune":"NDINDY","version":1},{"region":"DIOURBEL","departement":"BAMBEY","arrondissement":"LAMBAYE","commune":"LAMBAYE","version":1},{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"TOUBACOUTA","commune":"NIORO ALASSANE TALL","version":1},{"region":"KAOLACK","departement":"GUINGUINEO","arrondissement":"MBADAKHOUNE","commune":"NGATHIE NAOUDE","version":1},{"region":"KAOLACK","departement":"NIORO","arrondissement":"COM. KEUR MADIABEL","commune":"COM. KEUR MADIABEL","version":1},{"region":"KAOLACK","departement":"GUINGUINEO","arrondissement":"NGUELOU","commune":"GAGNICK","version":1},{"region":"FATICK","departement":"FATICK","arrondissement":"TATTAGUINE","commune":"DIARERE","version":1},{"region":"FATICK","departement":"FOUNDIOUGNE","arrondissement":"COM. PASSY","commune":"COM. PASSY","version":1},{"region":"KAOLACK","departement":"NIORO","arrondissement":"WACK-NGOUNA","commune":"KEUR MABA DIAKHOU","version":1},{"region":"KAOLACK","departement":"KAOLACK","arrondissement":"NGOTHIE","commune":"NDIEBEL","version":1},{"region":"KAOLACK","departement":"GUINGUINEO","arrondissement":"COM. GUINGUINEO","commune":"COM. GUINGUINEO","version":1},{"region":"KAOLACK","departement":"GUINGUINEO","arrondissement":"COM. MBOSS","commune":"COM. MBOSS","version":1},{"region":"SEDHIOU","departement":"SEDHIOU","arrondissement":"DIENDE","commune":"KOUSSY","version":1},{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"DJIBANAR","commune":"MANGAROUNGOU SANTO","version":1},{"region":"SEDHIOU","departement":"SEDHIOU","arrondissement":"DJIBABOUYA","commune":"DJIBABOUYA","version":1},{"region":"LOUGA","departement":"LINGUERE","arrondissement":"COM. MBEULEUKHE","commune":"COM. MBEULEUKHE","version":1},{"region":"KOLDA","departement":"MEDINA YORO FOULAH","arrondissement":"AR.NDORNA","commune":"BIGNARABE","version":1},{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"BONA","commune":"INOR","version":1},{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"DIAROUME","commune":"FAOUNE","version":1},{"region":"KOLDA","departement":"MEDINA YORO FOULAH","arrondissement":"COM. PATA","commune":"COM. PATA","version":1},{"region":"KOLDA","departement":"KOLDA","arrondissement":"MAMPATIM","commune":"COUMBACARA","version":1},{"region":"KOLDA","departement":"KOLDA","arrondissement":"COM. SARE YOBA DIEGA","commune":"COM. SARE YOBA DIEGA","version":1},{"region":"KOLDA","departement":"VELINGARA","arrondissement":"COM. VELINGARA","commune":"COM. VELINGARA","version":1},{"region":"DAKAR","departement":"RUFISQUE","arrondissement":"RUFISQUE","commune":"RUFISQUE CENTRE (NORD)","version":1},{"region":"DAKAR","departement":"PIKINE","arrondissement":"NIAYES","commune":"YEUMBEUL NORD","version":1},{"region":"DAKAR","departement":"PIKINE","arrondissement":"PIKINE DAGOUDANE","commune":"PIKINE SUD","version":1},{"region":"DAKAR","departement":"PIKINE","arrondissement":"PIKINE DAGOUDANE","commune":"Pikine EST","version":1},{"region":"DAKAR","departement":"GUEDIAWAYE","arrondissement":"GUEDIAWAYE","commune":"WAKHINANE NIMZATT","version":1},{"region":"DAKAR","departement":"PIKINE","arrondissement":"PIKINE DAGOUDANE","commune":"DIAMAGUENE\/SICAP MBAO","version":1},{"region":"DAKAR","departement":"PIKINE","arrondissement":"PIKINE DAGOUDANE","commune":"GUINAW RAIL NORD","version":1},{"region":"THIES","departement":"MBOUR","arrondissement":"COM. GUEKOKH","commune":"COM. GUEKOKH","version":1},{"region":"THIES","departement":"MBOUR","arrondissement":"COM. NGAPAROU","commune":"COM. NGAPAROU","version":1},{"region":"THIES","departement":"MBOUR","arrondissement":"COM. POPOGUINE","commune":"COM. POPOGUINE","version":1},{"region":"DAKAR","departement":"PIKINE","arrondissement":"PIKINE DAGOUDANE","commune":"Pikine OUEST","version":1},{"region":"DAKAR","departement":"RUFISQUE","arrondissement":"COM. DIAMNIADIO","commune":"COM. DIAMNIADIO","version":1},{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"CAS-CAS","commune":"MEDINA NDIATHBE","version":1},{"region":"SAINT-LOUIS","departement":"DAGANA","arrondissement":"COM. RICHARD-TOLL","commune":"COM. RICHARD-TOLL","version":1},{"region":"SAINT-LOUIS","departement":"DAGANA","arrondissement":"COM. GAE","commune":"COM. GAE","version":1},{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"CAS-CAS","commune":"MERY","version":1},{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"SALDE","commune":"BOKE DIALLOUBE","version":1},{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. DEMETTE","commune":"COM. DEMETTE","version":1},{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"COM. GUEDE CHANTIER","commune":"COM. GUEDE CHANTIER","version":1},{"region":"SAINT-LOUIS","departement":"DAGANA","arrondissement":"NDIAYE","commune":"NGNITH","version":1},{"region":"THIES","departement":"MBOUR","arrondissement":"SINDIA","commune":"DIASS","version":1},{"region":"LOUGA","departement":"LINGUERE","arrondissement":"BARKEDJI","commune":"THIARGNY","version":1},{"region":"LOUGA","departement":"LOUGA","arrondissement":"COKI","commune":"GUET ARDO","version":1},{"region":"MATAM","departement":"RANEROU","arrondissement":"COM. RANEROU","commune":"COM. RANEROU","version":1},{"region":"LOUGA","departement":"LINGUERE","arrondissement":"YANG YANG","commune":"KAMB","version":1},{"region":"LOUGA","departement":"LOUGA","arrondissement":"KEUR MOMAR SARR","commune":"K.MOMAR SARR","version":1},{"region":"MATAM","departement":"MATAM","arrondissement":"COM. MATAM","commune":"COM. MATAM","version":1},{"region":"MATAM","departement":"MATAM","arrondissement":"AGNAM-CIVOL","commune":"AGNAM-CIVOL","version":1},{"region":"MATAM","departement":"MATAM","arrondissement":"OGO","commune":"BOKIDIAWE","version":1},{"region":"KEDOUGOU","departement":"SALEMATA","arrondissement":"COM. SALEMATA","commune":"COM. SALEMATA","version":1},{"region":"TAMBACOUNDA","departement":"KOUPENTOUM","arrondissement":"BAMBA  THIALENE","commune":"KAHENE","version":1},{"region":"THIES","departement":"TIVAOUANE","arrondissement":"NIAKHENE","commune":"MBAYENE","version":1},{"region":"TAMBACOUNDA","departement":"KOUPENTOUM","arrondissement":"BAMBA  THIALENE","commune":"MERETO","version":1},{"region":"KEDOUGOU","departement":"SARAYA","arrondissement":"SABODOLA","commune":"KHOSSANTO","version":1},{"region":"KEDOUGOU","departement":"SARAYA","arrondissement":"SABODOLA","commune":"MISSIRAH SIRIMANA","version":1},{"region":"TAMBACOUNDA","departement":"KOUPENTOUM","arrondissement":"KOUTHIABA WOLOF","commune":"PASS KOTO","version":1},{"region":"TAMBACOUNDA","departement":"KOUPENTOUM","arrondissement":"KOUTHIABA WOLOF","commune":"PAYAR","version":1},{"region":"THIES","departement":"TIVAOUANE","arrondissement":"MEOUANE","commune":"MEOUANE","version":1},{"region":"SAINT-LOUIS","departement":"PODOR","arrondissement":"SALDE","commune":"MBOLO BIRANE","version":1},{"region":"SAINT-LOUIS","departement":"SAINT LOUIS","arrondissement":"RAO","commune":"FASS NGOM","version":1},{"region":"SAINT-LOUIS","departement":"SAINT LOUIS","arrondissement":"RAO","commune":"NDIEBENE GANDIOLE","version":1},{"region":"TAMBACOUNDA","departement":"BAKEL","arrondissement":"COM. KIDIRA","commune":"COM. KIDIRA","version":1},{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"BOYNGUEL BAMBA","commune":"KOUSSAN","version":1},{"region":"TAMBACOUNDA","departement":"GOUDIRY","arrondissement":"BOYNGUEL BAMBA","commune":"SINTHIOU MAMADOU BOUBOU","version":1},{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"TENGHORY","commune":"COUBALAN","version":1},{"region":"THIES","departement":"TIVAOUANE","arrondissement":"PAMBAL","commune":"MONT- ROLLAND","version":1},{"region":"DAKAR","departement":"DAKAR","arrondissement":"ALMADIES","commune":"NGOR","version":1},{"region":"DAKAR","departement":"DAKAR","arrondissement":"GRAND DAKAR","commune":"HLM","version":1},{"region":"THIES","departement":"TIVAOUANE","arrondissement":"PAMBAL","commune":"CHERIF LÖ","version":1},{"region":"ZIGUINCHOR","departement":"BIGNONA","arrondissement":"SINDIAN","commune":"SINDIAN","version":1}
]}

  this.listRegions={"items":
[{"region":"KAFFRINE","version":1}
,{"region":"KAOLACK","version":1}
,{"region":"ZIGUINCHOR","version":1}
,{"region":"FATICK","version":1}
,{"region":"LOUGA","version":1}
,{"region":"DAKAR","version":1}
,{"region":"MATAM","version":1}
,{"region":"SAINT-LOUIS","version":1}
,{"region":"DIOURBEL","version":1}
,{"region":"KOLDA","version":1}
,{"region":"SEDHIOU","version":1}
,{"region":"THIES","version":1}
,{"region":"KEDOUGOU","version":1}
  ,{"region":"TAMBACOUNDA","version":1}]}
  this.listPays={"items":
    [{"codenat":"ABW ","descr":"Aruba","version":1,"language_cd":"ENG"}
    ,{"codenat":"AFG ","descr":"Afghanistan","version":1,"language_cd":"ENG"}
    ,{"codenat":"AGO","descr":"Angola","version":1,"language_cd":"ENG"}
    ,{"codenat":"AIA","descr":"Anguilla","version":1,"language_cd":"ENG"}
    ,{"codenat":"ALB","descr":"Albanie","version":1,"language_cd":"ENG"}
    ,{"codenat":"AND","descr":"Andorre","version":1,"language_cd":"ENG"}
    ,{"codenat":"ANT","descr":"Antilles néerlandaises","version":1,"language_cd":"ENG"}
    ,{"codenat":"ARE","descr":"Emirats Arabes Unis","version":1,"language_cd":"ENG"}
    ,{"codenat":"ARG","descr":"Argentine","version":1,"language_cd":"ENG"}
    ,{"codenat":"ARM","descr":"Arménie","version":1,"language_cd":"ENG"}
    ,{"codenat":"ASM","descr":"Samoa orientales","version":1,"language_cd":"ENG"}
    ,{"codenat":"ATA","descr":"Antarctique","version":1,"language_cd":"ENG"}
    ,{"codenat":"ATF","descr":"Territoires Antarctiques français","version":1,"language_cd":"ENG"}
    ,{"codenat":"ATG","descr":"Antigua-et-Barbuda","version":1,"language_cd":"ENG"}
    ,{"codenat":"AU","descr":"Australia","version":1,"language_cd":"ENG"}
    ,{"codenat":"AUT","descr":"Autriche","version":1,"language_cd":"ENG"}
    ,{"codenat":"AZE","descr":"Azerbaïdjan","version":1,"language_cd":"ENG"}
    ,{"codenat":"BDI","descr":"Burundi","version":1,"language_cd":"ENG"}
    ,{"codenat":"BEL","descr":"Belgique","version":1,"language_cd":"ENG"}
    ,{"codenat":"BEN","descr":"Bénin","version":1,"language_cd":"ENG"}
    ,{"codenat":"BFA","descr":"Burkina Faso","version":1,"language_cd":"ENG"}
    ,{"codenat":"BGD","descr":"Bangladesh","version":1,"language_cd":"ENG"}
    ,{"codenat":"BGR","descr":"Bulgarie","version":1,"language_cd":"ENG"}
    ,{"codenat":"BHR","descr":"Bahreïn","version":1,"language_cd":"ENG"}
    ,{"codenat":"BHS","descr":"Bahamas","version":1,"language_cd":"ENG"}
    ,{"codenat":"BIH","descr":"Bosnie-Herzégovine","version":1,"language_cd":"ENG"}
    ,{"codenat":"BLR","descr":"Biélorussie","version":1,"language_cd":"ENG"}
    ,{"codenat":"BLZ","descr":"Bélize","version":1,"language_cd":"ENG"}
    ,{"codenat":"BMU","descr":"Bermudes","version":1,"language_cd":"ENG"}
    ,{"codenat":"BOL","descr":"Bolivie","version":1,"language_cd":"ENG"}
    ,{"codenat":"BRA","descr":"Brésil","version":1,"language_cd":"ENG"}
    ,{"codenat":"BRB","descr":"Barbade","version":1,"language_cd":"ENG"}
    ,{"codenat":"BRN","descr":"Bruneï","version":1,"language_cd":"ENG"}
    ,{"codenat":"BTN","descr":"Bhoutan","version":1,"language_cd":"ENG"}
    ,{"codenat":"BVT","descr":"Bouvet (Île)","version":1,"language_cd":"ENG"}
    ,{"codenat":"BWA","descr":"Botswana","version":1,"language_cd":"ENG"}
    ,{"codenat":"CAF","descr":"République Centrafricaine","version":1,"language_cd":"ENG"}
    ,{"codenat":"CAN","descr":"Canada","version":1,"language_cd":"ENG"}
    ,{"codenat":"CCK","descr":"Cocos \/ Keeling (Îles)","version":1,"language_cd":"ENG"}
    ,{"codenat":"CHL","descr":"Chili","version":1,"language_cd":"ENG"}
    ,{"codenat":"CHN","descr":"Chine","version":1,"language_cd":"ENG"}
    ,{"codenat":"CIV","descr":"Côte D'Ivoire","version":1,"language_cd":"ENG"}
    ,{"codenat":"CMR","descr":"Cameroun","version":1,"language_cd":"ENG"}
    ,{"codenat":"COD","descr":"République Démocratique du Congo","version":1,"language_cd":"ENG"}
    ,{"codenat":"COG","descr":"Congo","version":1,"language_cd":"ENG"}
    ,{"codenat":"COK","descr":"Cook (Îles)","version":1,"language_cd":"ENG"}
    ,{"codenat":"COL","descr":"Colombie","version":1,"language_cd":"ENG"}
    ,{"codenat":"COM","descr":"Comores","version":1,"language_cd":"ENG"}
    ,{"codenat":"CPV","descr":"Cap Vert","version":1,"language_cd":"ENG"}
    ,{"codenat":"CRI","descr":"Costa Rica","version":1,"language_cd":"ENG"}
    ,{"codenat":"CUB","descr":"Cuba","version":1,"language_cd":"ENG"}
    ,{"codenat":"CXR","descr":"Christmas (Île)","version":1,"language_cd":"ENG"}
    ,{"codenat":"CYM","descr":"Caïmans (Îles)","version":1,"language_cd":"ENG"}
    ,{"codenat":"CYP","descr":"Chypre","version":1,"language_cd":"ENG"}
    ,{"codenat":"CZE","descr":"République Tchèque","version":1,"language_cd":"ENG"}
    ,{"codenat":"DEU","descr":"Allemagne","version":1,"language_cd":"ENG"}
    ,{"codenat":"DJI","descr":"Djibouti","version":1,"language_cd":"ENG"}
    ,{"codenat":"DMA","descr":"Dominique","version":1,"language_cd":"ENG"}
    ,{"codenat":"DNK","descr":"Danemark","version":1,"language_cd":"ENG"}
    ,{"codenat":"DOM","descr":"République Dominicaine","version":1,"language_cd":"ENG"}
    ,{"codenat":"DZA","descr":"Algérie","version":1,"language_cd":"ENG"}
    ,{"codenat":"ECU","descr":"Equateur","version":1,"language_cd":"ENG"}
    ,{"codenat":"EGY","descr":"Egypte","version":1,"language_cd":"ENG"}
    ,{"codenat":"ERI","descr":"Erythrée","version":1,"language_cd":"ENG"}
    ,{"codenat":"ESH","descr":"Sahara Occidental","version":1,"language_cd":"ENG"}
    ,{"codenat":"EST","descr":"Estonie","version":1,"language_cd":"ENG"}
    ,{"codenat":"ETH","descr":"Ethiopie","version":1,"language_cd":"ENG"}
    ,{"codenat":"FI","descr":"Fiji","version":1,"language_cd":"ENG"}
    ,{"codenat":"FIN","descr":"Finlande","version":1,"language_cd":"ENG"}
    ,{"codenat":"FLK","descr":"Falkland \/ Malouines (Îles)","version":1,"language_cd":"ENG"}
    ,{"codenat":"FRA","descr":"France","version":1,"language_cd":"ENG"}
    ,{"codenat":"FRO","descr":"Féroé (Îles)","version":1,"language_cd":"ENG"}
    ,{"codenat":"FSM","descr":"Micronésie (Etats fédérés de)","version":1,"language_cd":"ENG"}
    ,{"codenat":"FXX","descr":"France métropolitaine","version":1,"language_cd":"ENG"}
    ,{"codenat":"GAB","descr":"Gabon","version":1,"language_cd":"ENG"}
    ,{"codenat":"GEO","descr":"Géorgie","version":1,"language_cd":"ENG"}
    ,{"codenat":"GHA","descr":"Ghana","version":1,"language_cd":"ENG"}
    ,{"codenat":"GIB","descr":"Gibraltar","version":1,"language_cd":"ENG"}
    ,{"codenat":"GIN","descr":"Guinée","version":1,"language_cd":"ENG"}
    ,{"codenat":"GLP","descr":"Guadeloupe","version":1,"language_cd":"ENG"}
    ,{"codenat":"GMB","descr":"Gambie","version":1,"language_cd":"ENG"}
    ,{"codenat":"GNB","descr":"Guinée-Bissau","version":1,"language_cd":"ENG"}
    ,{"codenat":"GNQ","descr":"Guinée Equatoriale","version":1,"language_cd":"ENG"}
    ,{"codenat":"GRC","descr":"Grèce","version":1,"language_cd":"ENG"}
    ,{"codenat":"GRD","descr":"Grenade","version":1,"language_cd":"ENG"}
    ,{"codenat":"GRL","descr":"Groënland","version":1,"language_cd":"ENG"}
    ,{"codenat":"GTM","descr":"Guatemala","version":1,"language_cd":"ENG"}
    ,{"codenat":"GUF","descr":"Guyane française","version":1,"language_cd":"ENG"}
    ,{"codenat":"GUM","descr":"Guam","version":1,"language_cd":"ENG"}
    ,{"codenat":"GUY","descr":"Guyana","version":1,"language_cd":"ENG"}
    ,{"codenat":"HKG","descr":"Hong Kong","version":1,"language_cd":"ENG"}
    ,{"codenat":"HMD","descr":"Territoire des Îles Heard et McDonald","version":1,"language_cd":"ENG"}
    ,{"codenat":"HND","descr":"Honduras","version":1,"language_cd":"ENG"}
    ,{"codenat":"HRV","descr":"Croatie","version":1,"language_cd":"ENG"}
    ,{"codenat":"HTI","descr":"Haïti","version":1,"language_cd":"ENG"}
    ,{"codenat":"HUN","descr":"Hongrie","version":1,"language_cd":"ENG"}
    ,{"codenat":"IDN","descr":"Indonésie","version":1,"language_cd":"ENG"}
    ,{"codenat":"IND","descr":"Inde","version":1,"language_cd":"ENG"}
    ,{"codenat":"IOT","descr":"Territoire britannique de l'Océan Indien","version":1,"language_cd":"ENG"}
    ,{"codenat":"IRL","descr":"Irlande","version":1,"language_cd":"ENG"}
    ,{"codenat":"IRN","descr":"Iran (République islamique d') ","version":1,"language_cd":"ENG"}
    ,{"codenat":"IRQ","descr":"Irak","version":1,"language_cd":"ENG"}
    ,{"codenat":"ISL","descr":"Islande","version":1,"language_cd":"ENG"}
    ,{"codenat":"ISR","descr":"Israël","version":1,"language_cd":"ENG"}
    ,{"codenat":"IT","descr":"Italy","version":1,"language_cd":"ENG"}
    ,{"codenat":"JAM","descr":"Jamaïque","version":1,"language_cd":"ENG"}
    ,{"codenat":"JOR","descr":"Jordanie","version":1,"language_cd":"ENG"}
    ,{"codenat":"JPN","descr":"Japon","version":1,"language_cd":"ENG"}
    ,{"codenat":"KAZ","descr":"Kazakstan","version":1,"language_cd":"ENG"}
    ,{"codenat":"KEN","descr":"Kenya","version":1,"language_cd":"ENG"}
    ,{"codenat":"KGZ","descr":"Kyrgyzstan","version":1,"language_cd":"ENG"}
    ,{"codenat":"KHM","descr":"Cambodge","version":1,"language_cd":"ENG"}
    ,{"codenat":"KIR","descr":"Kiribati","version":1,"language_cd":"ENG"}
    ,{"codenat":"KNA","descr":"Saint Kitts et Nevis","version":1,"language_cd":"ENG"}
    ,{"codenat":"KOR","descr":"Corée (République démocratique du)","version":1,"language_cd":"ENG"}
    ,{"codenat":"KWT","descr":"Koweït","version":1,"language_cd":"ENG"}
    ,{"codenat":"LAO","descr":"Laos (République populaire démocratique du)","version":1,"language_cd":"ENG"}
    ,{"codenat":"LBN","descr":"Liban","version":1,"language_cd":"ENG"}
    ,{"codenat":"LBR","descr":"Libéria","version":1,"language_cd":"ENG"}
    ,{"codenat":"LBY","descr":"Libye (Jamahiriya Arabe Libyenne)","version":1,"language_cd":"ENG"}
    ,{"codenat":"LCA","descr":"Sainte Lucie","version":1,"language_cd":"ENG"}
    ,{"codenat":"LIE","descr":"Liechtenstein","version":1,"language_cd":"ENG"}
    ,{"codenat":"LSO","descr":"Lesotho","version":1,"language_cd":"ENG"}
    ,{"codenat":"LTU","descr":"Lithuanie","version":1,"language_cd":"ENG"}
    ,{"codenat":"LUX","descr":"Luxembourg","version":1,"language_cd":"ENG"}
    ,{"codenat":"LVA","descr":"Lettonie","version":1,"language_cd":"ENG"}
    ,{"codenat":"MAC","descr":"Macau","version":1,"language_cd":"ENG"}
    ,{"codenat":"MAR","descr":"Maroc","version":1,"language_cd":"ENG"}
    ,{"codenat":"MCO","descr":"Monaco","version":1,"language_cd":"ENG"}
    ,{"codenat":"MDA","descr":"Moldavie","version":1,"language_cd":"ENG"}
    ,{"codenat":"MDG","descr":"Madagascar","version":1,"language_cd":"ENG"}
    ,{"codenat":"MDV","descr":"Maldives","version":1,"language_cd":"ENG"}
    ,{"codenat":"MEX","descr":"Mexique","version":1,"language_cd":"ENG"}
    ,{"codenat":"MHL","descr":"Marshall (Îles)","version":1,"language_cd":"ENG"}
    ,{"codenat":"MKD","descr":"Macédoine (ancienne République yougoslave de)","version":1,"language_cd":"ENG"}
    ,{"codenat":"MLI","descr":"Mali","version":1,"language_cd":"ENG"}
    ,{"codenat":"MLT","descr":"Malte","version":1,"language_cd":"ENG"}
    ,{"codenat":"MMR","descr":"Myanmar","version":1,"language_cd":"ENG"}
    ,{"codenat":"MNG","descr":"Mongolie","version":1,"language_cd":"ENG"}
    ,{"codenat":"MNP","descr":"Mariannes (Îles)","version":1,"language_cd":"ENG"}
    ,{"codenat":"MOZ","descr":"Mozambique","version":1,"language_cd":"ENG"}
    ,{"codenat":"MRT","descr":"Mauritanie","version":1,"language_cd":"ENG"}
    ,{"codenat":"MSR","descr":"Montserrat","version":1,"language_cd":"ENG"}
    ,{"codenat":"MTQ","descr":"Martinique","version":1,"language_cd":"ENG"}
    ,{"codenat":"MUS","descr":"Maurice","version":1,"language_cd":"ENG"}
    ,{"codenat":"MWI","descr":"Malawi","version":1,"language_cd":"ENG"}
    ,{"codenat":"MYS","descr":"Malaysie","version":1,"language_cd":"ENG"}
    ,{"codenat":"MYT","descr":"Mayotte","version":1,"language_cd":"ENG"}
    ,{"codenat":"NAM","descr":"Namibie","version":1,"language_cd":"ENG"}
    ,{"codenat":"NCL","descr":"Nouvelle-Calédonie","version":1,"language_cd":"ENG"}
    ,{"codenat":"NER","descr":"Niger","version":1,"language_cd":"ENG"}
    ,{"codenat":"NFK","descr":"Norfolk (Île)","version":1,"language_cd":"ENG"}
    ,{"codenat":"NGA","descr":"Nigéria","version":1,"language_cd":"ENG"}
    ,{"codenat":"NIC","descr":"Nicaragua","version":1,"language_cd":"ENG"}
    ,{"codenat":"NIU","descr":"Niue","version":1,"language_cd":"ENG"}
    ,{"codenat":"NL","descr":"Netherlands","version":1,"language_cd":"ENG"}
    ,{"codenat":"NLD","descr":"Pays-Bas","version":1,"language_cd":"ENG"}
    ,{"codenat":"NOR","descr":"Norvège","version":1,"language_cd":"ENG"}
    ,{"codenat":"NPL","descr":"Népal","version":1,"language_cd":"ENG"}
    ,{"codenat":"NRU","descr":"Nauru","version":1,"language_cd":"ENG"}
    ,{"codenat":"NZL","descr":"Nouvelle-Zélande","version":1,"language_cd":"ENG"}
    ,{"codenat":"OMN","descr":"Oman","version":1,"language_cd":"ENG"}
    ,{"codenat":"PAK","descr":"Pakistan","version":1,"language_cd":"ENG"}
    ,{"codenat":"PAN","descr":"Panama","version":1,"language_cd":"ENG"}
    ,{"codenat":"PCN","descr":"Pitcaïrn","version":1,"language_cd":"ENG"}
    ,{"codenat":"PER","descr":"Pérou","version":1,"language_cd":"ENG"}
    ,{"codenat":"PHL","descr":"Philippines","version":1,"language_cd":"ENG"}
    ,{"codenat":"PLW","descr":"Palau","version":1,"language_cd":"ENG"}
    ,{"codenat":"PNG","descr":"Papouasie Nouvelle-Guinée","version":1,"language_cd":"ENG"}
    ,{"codenat":"POL","descr":"Pologne","version":1,"language_cd":"ENG"}
    ,{"codenat":"PRI","descr":"Porto Rico","version":1,"language_cd":"ENG"}
    ,{"codenat":"PRK","descr":"Corée (République populaire démocratique du)","version":1,"language_cd":"ENG"}
    ,{"codenat":"PRT","descr":"Portugal","version":1,"language_cd":"ENG"}
    ,{"codenat":"PRY","descr":"Paraguay","version":1,"language_cd":"ENG"}
    ,{"codenat":"PYF","descr":"Polynésie française","version":1,"language_cd":"ENG"}
    ,{"codenat":"QAT","descr":"Quatar","version":1,"language_cd":"ENG"}
    ,{"codenat":"REU","descr":"Réunion","version":1,"language_cd":"ENG"}
    ,{"codenat":"ROM","descr":"Romania","version":1,"language_cd":"ENG"}
    ,{"codenat":"RSA","descr":"Republic of South Africa","version":1,"language_cd":"ENG"}
    ,{"codenat":"RUS","descr":"Russie (Fédération de)","version":1,"language_cd":"ENG"}
    ,{"codenat":"RWA","descr":"Rwanda","version":1,"language_cd":"ENG"}
    ,{"codenat":"SAU","descr":"Arabie Séoudite","version":1,"language_cd":"ENG"}
    ,{"codenat":"SLV","descr":"Salvador","version":1,"language_cd":"ENG"}
    ,{"codenat":"SMR","descr":"San Marin","version":1,"language_cd":"ENG"}
    ,{"codenat":"STP","descr":"Sao Tomé et Principe","version":1,"language_cd":"ENG"}
    ,{"codenat":"SYR","descr":"Syrie (République arabe syrienne)","version":1,"language_cd":"ENG"}
    ,{"codenat":"TCA","descr":"Turks et Caicos (Îles)","version":1,"language_cd":"ENG"}
    ,{"codenat":"TCD","descr":"Tchad","version":1,"language_cd":"ENG"}
    ,{"codenat":"TGO","descr":"Togo","version":1,"language_cd":"ENG"}
    ,{"codenat":"THA","descr":"Thaïlande","version":1,"language_cd":"ENG"}
    ,{"codenat":"TJK","descr":"Tadjikistan","version":1,"language_cd":"ENG"}
    ,{"codenat":"TKL","descr":"Tokelau","version":1,"language_cd":"ENG"}
    ,{"codenat":"TKM","descr":"Turkménistan","version":1,"language_cd":"ENG"}
    ,{"codenat":"TMP","descr":"Timor-Oriental","version":1,"language_cd":"ENG"}
    ,{"codenat":"TON","descr":"Tonga","version":1,"language_cd":"ENG"}
    ,{"codenat":"TTO","descr":"Trinidad et Tobago","version":1,"language_cd":"ENG"}
    ,{"codenat":"TUN","descr":"Tunisie","version":1,"language_cd":"ENG"}
    ,{"codenat":"TUR","descr":"Turquie","version":1,"language_cd":"ENG"}
    ,{"codenat":"TUV","descr":"Tuvalu","version":1,"language_cd":"ENG"}
    ,{"codenat":"TWN","descr":"Taïwan","version":1,"language_cd":"ENG"}
    ,{"codenat":"TZA","descr":"Tanzanie","version":1,"language_cd":"ENG"}
    ,{"codenat":"UGA","descr":"Ouganda","version":1,"language_cd":"ENG"}
    ,{"codenat":"UK","descr":"United Kingdom","version":1,"language_cd":"ENG"}
    ,{"codenat":"UKR","descr":"Ukraine","version":1,"language_cd":"ENG"}
    ,{"codenat":"UMI","descr":"Territoires non incorporés des États-Unis ","version":1,"language_cd":"ENG"}
    ,{"codenat":"URY","descr":"Uruguay","version":1,"language_cd":"ENG"}
    ,{"codenat":"USA","descr":"United States of America","version":1,"language_cd":"ENG"}
    ,{"codenat":"BMU","descr":"Bermudes","version":1,"language_cd":"FRA"}
    ,{"codenat":"BOL","descr":"Bolivie","version":1,"language_cd":"FRA"}
    ,{"codenat":"BRA","descr":"Brésil","version":1,"language_cd":"FRA"}
    ,{"codenat":"BRB","descr":"Barbade","version":1,"language_cd":"FRA"}
    ,{"codenat":"BRN","descr":"Bruneï","version":1,"language_cd":"FRA"}
    ,{"codenat":"BTN","descr":"Bhoutan","version":1,"language_cd":"FRA"}
    ,{"codenat":"BVT","descr":"Bouvet (Île)","version":1,"language_cd":"FRA"}
    ,{"codenat":"BWA","descr":"Botswana","version":1,"language_cd":"FRA"}
    ,{"codenat":"CAF","descr":"République Centrafricaine","version":1,"language_cd":"FRA"}
    ,{"codenat":"CAN","descr":"Canada","version":1,"language_cd":"FRA"}
    ,{"codenat":"CCK","descr":"Cocos \/ Keeling (Îles)","version":1,"language_cd":"FRA"}
    ,{"codenat":"CHL","descr":"Chili","version":1,"language_cd":"FRA"}
    ,{"codenat":"CHN","descr":"Chine","version":1,"language_cd":"FRA"}
    ,{"codenat":"CIV","descr":"Côte D'Ivoire","version":1,"language_cd":"FRA"}
    ,{"codenat":"CMR","descr":"Cameroun","version":1,"language_cd":"FRA"}
    ,{"codenat":"COD","descr":"République Démocratique du Congo","version":1,"language_cd":"FRA"}
    ,{"codenat":"COG","descr":"Congo","version":1,"language_cd":"FRA"}
    ,{"codenat":"COK","descr":"Cook (Îles)","version":1,"language_cd":"FRA"}
    ,{"codenat":"COL","descr":"Colombie","version":1,"language_cd":"FRA"}
    ,{"codenat":"COM","descr":"Comores","version":1,"language_cd":"FRA"}
    ,{"codenat":"CPV","descr":"Cap Vert","version":1,"language_cd":"FRA"}
    ,{"codenat":"CRI","descr":"Costa Rica","version":1,"language_cd":"FRA"}
    ,{"codenat":"CUB","descr":"Cuba","version":1,"language_cd":"FRA"}
    ,{"codenat":"CXR","descr":"Christmas (Île)","version":1,"language_cd":"FRA"}
    ,{"codenat":"CYM","descr":"Caïmans (Îles)","version":1,"language_cd":"FRA"}
    ,{"codenat":"CYP","descr":"Chypre","version":1,"language_cd":"FRA"}
    ,{"codenat":"CZE","descr":"République Tchèque","version":1,"language_cd":"FRA"}
    ,{"codenat":"DEU","descr":"Allemagne","version":1,"language_cd":"FRA"}
    ,{"codenat":"DJI","descr":"Djibouti","version":1,"language_cd":"FRA"}
    ,{"codenat":"DMA","descr":"Dominique","version":1,"language_cd":"FRA"}
    ,{"codenat":"DNK","descr":"Danemark","version":1,"language_cd":"FRA"}
    ,{"codenat":"DOM","descr":"République Dominicaine","version":1,"language_cd":"FRA"}
    ,{"codenat":"DZA","descr":"Algérie","version":1,"language_cd":"FRA"}
    ,{"codenat":"ECU","descr":"Equateur","version":1,"language_cd":"FRA"}
    ,{"codenat":"EGY","descr":"Egypte","version":1,"language_cd":"FRA"}
    ,{"codenat":"ERI","descr":"Erythrée","version":1,"language_cd":"FRA"}
    ,{"codenat":"ESH","descr":"Sahara Occidental","version":1,"language_cd":"FRA"}
    ,{"codenat":"EST","descr":"Estonie","version":1,"language_cd":"FRA"}
    ,{"codenat":"ETH","descr":"Ethiopie","version":1,"language_cd":"FRA"}
    ,{"codenat":"FI","descr":"Fiji","version":1,"language_cd":"FRA"}
    ,{"codenat":"FIN","descr":"Finlande","version":1,"language_cd":"FRA"}
    ,{"codenat":"FLK","descr":"Falkland \/ Malouines (Îles)","version":1,"language_cd":"FRA"}
    ,{"codenat":"FRA","descr":"France","version":1,"language_cd":"FRA"}
    ,{"codenat":"FRO","descr":"Féroé (Îles)","version":1,"language_cd":"FRA"}
    ,{"codenat":"FSM","descr":"Micronésie (Etats fédérés de)","version":1,"language_cd":"FRA"}
    ,{"codenat":"FXX","descr":"France métropolitaine","version":1,"language_cd":"FRA"}
    ,{"codenat":"GAB","descr":"Gabon","version":1,"language_cd":"FRA"}
    ,{"codenat":"GEO","descr":"Géorgie","version":1,"language_cd":"FRA"}
    ,{"codenat":"GHA","descr":"Ghana","version":1,"language_cd":"FRA"}
    ,{"codenat":"GIB","descr":"Gibraltar","version":1,"language_cd":"FRA"}
    ,{"codenat":"GIN","descr":"Guinée","version":1,"language_cd":"FRA"}
    ,{"codenat":"GLP","descr":"Guadeloupe","version":1,"language_cd":"FRA"}
    ,{"codenat":"GMB","descr":"Gambie","version":1,"language_cd":"FRA"}
    ,{"codenat":"GNB","descr":"Guinée-Bissau","version":1,"language_cd":"FRA"}
    ,{"codenat":"GNQ","descr":"Guinée Equatoriale","version":1,"language_cd":"FRA"}
    ,{"codenat":"GRC","descr":"Grèce","version":1,"language_cd":"FRA"}
    ,{"codenat":"GRD","descr":"Grenade","version":1,"language_cd":"FRA"}
    ,{"codenat":"GRL","descr":"Groënland","version":1,"language_cd":"FRA"}
    ,{"codenat":"GTM","descr":"Guatemala","version":1,"language_cd":"FRA"}
    ,{"codenat":"GUF","descr":"Guyane française","version":1,"language_cd":"FRA"}
    ,{"codenat":"GUM","descr":"Guam","version":1,"language_cd":"FRA"}
    ,{"codenat":"GUY","descr":"Guyana","version":1,"language_cd":"FRA"}
    ,{"codenat":"HKG","descr":"Hong Kong","version":1,"language_cd":"FRA"}
    ,{"codenat":"HMD","descr":"Territoire des Îles Heard et McDonald","version":1,"language_cd":"FRA"}
    ,{"codenat":"HND","descr":"Honduras","version":1,"language_cd":"FRA"}
    ,{"codenat":"HRV","descr":"Croatie","version":1,"language_cd":"FRA"}
    ,{"codenat":"HTI","descr":"Haïti","version":1,"language_cd":"FRA"}
    ,{"codenat":"HUN","descr":"Hongrie","version":1,"language_cd":"FRA"}
    ,{"codenat":"IDN","descr":"Indonésie","version":1,"language_cd":"FRA"}
    ,{"codenat":"IND","descr":"Inde","version":1,"language_cd":"FRA"}
    ,{"codenat":"IOT","descr":"Territoire britannique de l'Océan Indien","version":1,"language_cd":"FRA"}
    ,{"codenat":"IRL","descr":"Irlande","version":1,"language_cd":"FRA"}
    ,{"codenat":"IRN","descr":"Iran (République islamique d') ","version":1,"language_cd":"FRA"}
    ,{"codenat":"IRQ","descr":"Irak","version":1,"language_cd":"FRA"}
    ,{"codenat":"ISL","descr":"Islande","version":1,"language_cd":"FRA"}
    ,{"codenat":"ISR","descr":"Israël","version":1,"language_cd":"FRA"}
    ,{"codenat":"IT","descr":"Italy","version":1,"language_cd":"FRA"}
    ,{"codenat":"JAM","descr":"Jamaïque","version":1,"language_cd":"FRA"}
    ,{"codenat":"JOR","descr":"Jordanie","version":1,"language_cd":"FRA"}
    ,{"codenat":"JPN","descr":"Japon","version":1,"language_cd":"FRA"}
    ,{"codenat":"KAZ","descr":"Kazakstan","version":1,"language_cd":"FRA"}
    ,{"codenat":"KEN","descr":"Kenya","version":1,"language_cd":"FRA"}
    ,{"codenat":"KGZ","descr":"Kyrgyzstan","version":1,"language_cd":"FRA"}
    ,{"codenat":"KHM","descr":"Cambodge","version":1,"language_cd":"FRA"}
    ,{"codenat":"KIR","descr":"Kiribati","version":1,"language_cd":"FRA"}
    ,{"codenat":"KNA","descr":"Saint Kitts et Nevis","version":1,"language_cd":"FRA"}
    ,{"codenat":"KOR","descr":"Corée (République démocratique du)","version":1,"language_cd":"FRA"}
    ,{"codenat":"KWT","descr":"Koweït","version":1,"language_cd":"FRA"}
    ,{"codenat":"LAO","descr":"Laos (République populaire démocratique du)","version":1,"language_cd":"FRA"}
    ,{"codenat":"LBN","descr":"Liban","version":1,"language_cd":"FRA"}
    ,{"codenat":"LBR","descr":"Libéria","version":1,"language_cd":"FRA"}
    ,{"codenat":"LBY","descr":"Libye (Jamahiriya Arabe Libyenne)","version":1,"language_cd":"FRA"}
    ,{"codenat":"LCA","descr":"Sainte Lucie","version":1,"language_cd":"FRA"}
    ,{"codenat":"LIE","descr":"Liechtenstein","version":1,"language_cd":"FRA"}
    ,{"codenat":"LSO","descr":"Lesotho","version":1,"language_cd":"FRA"}
    ,{"codenat":"LTU","descr":"Lithuanie","version":1,"language_cd":"FRA"}
    ,{"codenat":"LUX","descr":"Luxembourg","version":1,"language_cd":"FRA"}
    ,{"codenat":"LVA","descr":"Lettonie","version":1,"language_cd":"FRA"}
    ,{"codenat":"MAC","descr":"Macau","version":1,"language_cd":"FRA"}
    ,{"codenat":"MAR","descr":"Maroc","version":1,"language_cd":"FRA"}
    ,{"codenat":"MCO","descr":"Monaco","version":1,"language_cd":"FRA"}
    ,{"codenat":"MDA","descr":"Moldavie","version":1,"language_cd":"FRA"}
    ,{"codenat":"MDG","descr":"Madagascar","version":1,"language_cd":"FRA"}
    ,{"codenat":"MDV","descr":"Maldives","version":1,"language_cd":"FRA"}
    ,{"codenat":"MEX","descr":"Mexique","version":1,"language_cd":"FRA"}
    ,{"codenat":"MHL","descr":"Marshall (Îles)","version":1,"language_cd":"FRA"}
    ,{"codenat":"MKD","descr":"Macédoine (ancienne République yougoslave de)","version":1,"language_cd":"FRA"}
    ,{"codenat":"MLI","descr":"Mali","version":1,"language_cd":"FRA"}
    ,{"codenat":"MLT","descr":"Malte","version":1,"language_cd":"FRA"}
    ,{"codenat":"MMR","descr":"Myanmar","version":1,"language_cd":"FRA"}
    ,{"codenat":"MNG","descr":"Mongolie","version":1,"language_cd":"FRA"}
    ,{"codenat":"MNP","descr":"Mariannes (Îles)","version":1,"language_cd":"FRA"}
    ,{"codenat":"MOZ","descr":"Mozambique","version":1,"language_cd":"FRA"}
    ,{"codenat":"MRT","descr":"Mauritanie","version":1,"language_cd":"FRA"}
    ,{"codenat":"MSR","descr":"Montserrat","version":1,"language_cd":"FRA"}
    ,{"codenat":"MTQ ","descr":"Martinique","version":1,"language_cd":"FRA"}
    ,{"codenat":"MUS","descr":"Maurice","version":1,"language_cd":"FRA"}
    ,{"codenat":"MWI","descr":"Malawi","version":1,"language_cd":"FRA"}
    ,{"codenat":"MYS","descr":"Malaysie","version":1,"language_cd":"FRA"}
    ,{"codenat":"MYT","descr":"Mayotte","version":1,"language_cd":"FRA"}
    ,{"codenat":"NAM","descr":"Namibie","version":1,"language_cd":"FRA"}
    ,{"codenat":"NCL","descr":"Nouvelle-Calédonie","version":1,"language_cd":"FRA"}
    ,{"codenat":"NER","descr":"Niger","version":1,"language_cd":"FRA"}
    ,{"codenat":"NFK","descr":"Norfolk (Île)","version":1,"language_cd":"FRA"}
    ,{"codenat":"NGA","descr":"Nigéria","version":1,"language_cd":"FRA"}
    ,{"codenat":"NIC","descr":"Nicaragua","version":1,"language_cd":"FRA"}
    ,{"codenat":"NIU","descr":"Niue","version":1,"language_cd":"FRA"}
    ,{"codenat":"NL","descr":"Netherlands","version":1,"language_cd":"FRA"}
    ,{"codenat":"NLD","descr":"Pays-Bas","version":1,"language_cd":"FRA"}
    ,{"codenat":"NOR","descr":"Norvège","version":1,"language_cd":"FRA"}
    ,{"codenat":"NPL","descr":"Népal","version":1,"language_cd":"FRA"}
    ,{"codenat":"NRU","descr":"Nauru","version":1,"language_cd":"FRA"}
    ,{"codenat":"NZL","descr":"Nouvelle-Zélande","version":1,"language_cd":"FRA"}
    ,{"codenat":"OMN","descr":"Oman","version":1,"language_cd":"FRA"}
    ,{"codenat":"PAK","descr":"Pakistan","version":1,"language_cd":"FRA"}
    ,{"codenat":"PAN","descr":"Panama","version":1,"language_cd":"FRA"}
    ,{"codenat":"PCN","descr":"Pitcaïrn","version":1,"language_cd":"FRA"}
    ,{"codenat":"PER","descr":"Pérou","version":1,"language_cd":"FRA"}
    ,{"codenat":"PHL","descr":"Philippines","version":1,"language_cd":"FRA"}
    ,{"codenat":"PLW","descr":"Palau","version":1,"language_cd":"FRA"}
    ,{"codenat":"PNG","descr":"Papouasie Nouvelle-Guinée","version":1,"language_cd":"FRA"}
    ,{"codenat":"POL","descr":"Pologne","version":1,"language_cd":"FRA"}
    ,{"codenat":"PRI","descr":"Porto Rico","version":1,"language_cd":"FRA"}
    ,{"codenat":"PRK","descr":"Corée (République populaire démocratique du)","version":1,"language_cd":"FRA"}
    ,{"codenat":"PRT","descr":"Portugal","version":1,"language_cd":"FRA"}
    ,{"codenat":"PRY","descr":"Paraguay","version":1,"language_cd":"FRA"}
    ,{"codenat":"PYF","descr":"Polynésie française","version":1,"language_cd":"FRA"}
    ,{"codenat":"QAT","descr":"Quatar","version":1,"language_cd":"FRA"}
    ,{"codenat":"REU","descr":"Réunion","version":1,"language_cd":"FRA"}
    ,{"codenat":"ROM","descr":"Romania","version":1,"language_cd":"FRA"}
    ,{"codenat":"RSA","descr":"Republic of South Africa","version":1,"language_cd":"FRA"}
    ,{"codenat":"RUS","descr":"Russie (Fédération de)","version":1,"language_cd":"FRA"}
    ,{"codenat":"RWA","descr":"Rwanda","version":1,"language_cd":"FRA"}
    ,{"codenat":"SAU","descr":"Arabie Séoudite","version":1,"language_cd":"FRA"}
    ,{"codenat":"SLV","descr":"Salvador","version":1,"language_cd":"FRA"}
    ,{"codenat":"SMR","descr":"San Marin","version":1,"language_cd":"FRA"}
    ,{"codenat":"STP","descr":"Sao Tomé et Principe","version":1,"language_cd":"FRA"}
    ,{"codenat":"SYR","descr":"Syrie (République arabe syrienne)","version":1,"language_cd":"FRA"}
    ,{"codenat":"TCA","descr":"Turks et Caicos (Îles)","version":1,"language_cd":"FRA"}
    ,{"codenat":"TCD","descr":"Tchad","version":1,"language_cd":"FRA"}
    ,{"codenat":"TGO","descr":"Togo","version":1,"language_cd":"FRA"}
    ,{"codenat":"THA","descr":"Thaïlande","version":1,"language_cd":"FRA"}
    ,{"codenat":"TJK","descr":"Tadjikistan","version":1,"language_cd":"FRA"}
    ,{"codenat":"TKL","descr":"Tokelau","version":1,"language_cd":"FRA"}
    ,{"codenat":"TKM","descr":"Turkménistan","version":1,"language_cd":"FRA"}
    ,{"codenat":"TMP","descr":"Timor-Oriental","version":1,"language_cd":"FRA"}
    ,{"codenat":"TON","descr":"Tonga","version":1,"language_cd":"FRA"}
    ,{"codenat":"TTO","descr":"Trinidad et Tobago","version":1,"language_cd":"FRA"}
    ,{"codenat":"TUN","descr":"Tunisie","version":1,"language_cd":"FRA"}
    ,{"codenat":"TUR","descr":"Turquie","version":1,"language_cd":"FRA"}
    ,{"codenat":"TUV","descr":"Tuvalu","version":1,"language_cd":"FRA"}
    ,{"codenat":"TWN","descr":"Taïwan","version":1,"language_cd":"FRA"}
    ,{"codenat":"TZA","descr":"Tanzanie","version":1,"language_cd":"FRA"}
    ,{"codenat":"UGA","descr":"Ouganda","version":1,"language_cd":"FRA"}
    ,{"codenat":"UK ","descr":"United Kingdom","version":1,"language_cd":"FRA"}
    ,{"codenat":"UKR","descr":"Ukraine","version":1,"language_cd":"FRA"}
    ,{"codenat":"UMI","descr":"Territoires non incorporés des États-Unis ","version":1,"language_cd":"FRA"}
    ,{"codenat":"URY","descr":"Uruguay","version":1,"language_cd":"FRA"}
    ,{"codenat":"USA","descr":"United States of America","version":1,"language_cd":"FRA"}
    ,{"codenat":"SN","descr":"Senegal","version":1,"language_cd":"ENG"}
    ,{"codenat":"SN","descr":"Senegal","version":1,"language_cd":"FRA"}]}
  this.listSectors={"items":
[{"secteuractivites":"Construction","version":1}
,{"secteuractivites":"Transport et entreposage","version":1}
,{"secteuractivites":"Santé et activités d'action sociale","version":1}
,{"secteuractivites":"Éducation","version":1}
,{"secteuractivites":"Commerce de gros et de detail; re?parations de vehicules automobiles et de motocycles ","version":1}
,{"secteuractivites":"Activité des ménages privés employant du personnel domestique","version":1}
,{"secteuractivites":"Activités des organisations et organismes extraterritoriaux","version":1}
,{"secteuractivites":"Activités d'hébergement et de restauration","version":1}
,{"secteuractivites":"Activités professionnelles, scientifiques et techniques","version":1}
,{"secteuractivites":"Activités financières et d'assurances","version":1}
,{"secteuractivites":"Arts, spectacles et loisirs","version":1}
,{"secteuractivites":"Autres activités de services","version":1}
,{"secteuractivites":"Activités extractives","version":1}
,{"secteuractivites":"Information et communication","version":1}
,{"secteuractivites":"Administration et activités d'appui administratif","version":1}
,{"secteuractivites":"Activité mal désignée","version":1}
,{"secteuractivites":"mal désigné","version":1}
,{"secteuractivites":"Activités de fabrication","version":1}
,{"secteuractivites":"Agriculture, sylviculture et pêche","version":1}
,{"secteuractivites":"Production et distribution d'électricité, de gaz, de vapeur et climatisation","version":1}
,{"secteuractivites":"Activités immobilières","version":1}
,{"secteuractivites":"Administration publique et défense","version":1}]}
this.listactivitePrincipal={
  "items":[
{"secteuractivites":"Agriculture, sylviculture et pêche","activitesprincipal":"ACTIVITES ANNEXES DE L'AGRICULTURE","version":1}
,{"secteuractivites":"Agriculture, sylviculture et pêche","activitesprincipal":"CHASSE ET PROTECTION DU GIBIER","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"ABATTAGE BETAIL","version":1}
,{"secteuractivites":"Agriculture, sylviculture et pêche","activitesprincipal":"SYLVICUTURE","version":1}
,{"secteuractivites":"Agriculture, sylviculture et pêche","activitesprincipal":"EXPLOITATION","version":1}
,{"secteuractivites":"Agriculture, sylviculture et pêche","activitesprincipal":"PECHE","version":1}
,{"secteuractivites":"Activités extractives","activitesprincipal":"CHARBON","version":1}
,{"secteuractivites":"Production et distribution d'électricité, de gaz, de vapeur et climatisation"
,"activitesprincipal":"PETROLE BRUT ET GAZ NATUREL","version":1}
,{"secteuractivites":"Activités extractives","activitesprincipal":"MINERAIS METALLIQUES","version":1}
,{"secteuractivites":"Activités extractives","activitesprincipal":"AUTRES MINERAUX","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"INDUSTRIES ALIMENTAIRES","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"INSDUTRIE ALIMENTAIRE INDUSTRIE FROID","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"FABRIQUE DE BOISSON","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"INDUSTRIE TABAC ALLUMETTE","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"INDUSTRIES TEXTILES","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"FABRIQUE ARTICLES HABILLEMENT","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"FABRIQUES CHAUSSURES","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"INDUSTRIE ARTICLE CUIR PLASTIQUE FOURRAGE CA","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"INDUSTRIE BOIS","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"INDUSTRIE DE MEUBLES(EN BOIS)","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"FABRIQUE DE PAPIER","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"IMPRIMERIE EDITION","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"INDUSTRIE","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"INDUSTRIES CHIMIQUES CORPS GRAS","version":1}
,{"secteuractivites":"Activités extractives","activitesprincipal":"RAFFINERIE DE PETROLE","version":1}
,{"secteuractivites":"Activités extractives","activitesprincipal":"FABRICATION MATIERE PLASTIQUE (DERIVE PETROLE\/CA","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"INDUSTRIE DU CAOUTCHOUC","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"FABRICATION DES OBJETS EN PLASTIQUE","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"FABRICATION  DE FAIENCE PORCELAINE","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"INDUSTRIE DU VERRE","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"SIDERURGIE(ACIER FONTE FER)","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"FABRICATION OUVRAGES METAUX SAUF MA§MA","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"FABRICATION MACHINES NON ELECTRIQUES","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"FABRICATION MACHINES ET APPAR ELECTRIQUES","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"FABRICATION MATERIEL DE TRANSPORT","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"FABRICATION MATERIEL DE PRECISION","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"FABRICATION MATIERES PREMIERES BATIMENTS","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"FABRIQUE EXPLOSIFS","version":1}
,{"secteuractivites":"Production et distribution d'électricité, de gaz, de vapeur et climatisation","activitesprincipal":"ELECTRICITE GAZ","version":1}
,{"secteuractivites":"Production et distribution d'électricité, de gaz, de vapeur et climatisation","activitesprincipal":"DISTRIBUTION PUBLIQUE","version":1}
,{"secteuractivites":"Construction","activitesprincipal":"TRAVAUX PUBLICS","version":1}
,{"secteuractivites":"Transport et entreposage","activitesprincipal":"MANUTENTION PORTUAIRE MARITIME","version":1}
,{"secteuractivites":"Construction","activitesprincipal":"BATIMENT-CONSTRUTION-RAVALEMENT","version":1}
,{"secteuractivites":"Commerce de gros et de de?tail; re?parations de ve?hicules automobiles et de motocycles","activitesprincipal":"COMMERCE DE GROS ET 1\/2 GROS","version":1}
,{"secteuractivites":"Commerce de gros et de de?tail; re?parations de ve?hicules automobiles et de motocycles","activitesprincipal":"COMMERCE DE DETAIL","version":1}
,{"secteuractivites":"Commerce de gros et de de?tail; re?parations de ve?hicules automobiles et de motocycles","activitesprincipal":"COMMERCE HYDROCARBURE STATIONS","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"BOULANGERIE PATISSERIE","version":1}
,{"secteuractivites":"Activités de fabrication","activitesprincipal":"COMMERCE DE DETAIL SANS LIVRAISON","version":1}
,{"secteuractivites":"Transport et entreposage","activitesprincipal":"AGENCE DE VOYAGE ET TOURISME","version":1}
,{"secteuractivites":"Activités d'hébergement et de restauration","activitesprincipal":"RESTAURANTS -BARS-DEBITS","version":1}
,{"secteuractivites":"Activités d'hébergement et de restauration","activitesprincipal":"HOTELS-RESTAURANTS-MEUBLES","version":1}
,{"secteuractivites":"Transport et entreposage","activitesprincipal":"TRANSPORTS TERRESTRE","version":1}
,{"secteuractivites":"Transport et entreposage","activitesprincipal":"TRANSPORT PAR EAU","version":1}
,{"secteuractivites":"Transport et entreposage","activitesprincipal":"TRANSPORTS AERIENS","version":1}
,{"secteuractivites":"Transport et entreposage","activitesprincipal":"SERVICES AUX DE TRANSPORT","version":1}
,{"secteuractivites":"Information et communication","activitesprincipal":"TELECOMMUNICATIONS ET ACTIVITE","version":1}
,{"secteuractivites":"Information et communication","activitesprincipal":"INSERTIONS PUBLICITAIRES, COMM","version":1}
,{"secteuractivites":"Activités financières et d'assurances","activitesprincipal":"ETABLISSEMENTS FINANCIERS","version":1}
]}
this.listMainActivities();
}

  dateDiff1(d1, d2) {

    return ((d2.getTime() - d1.getTime()) / 31536000000);
  }
  listMainActivities(){
  
     for(let i=0;i<this.listactivitePrincipal.items.length;i++){
      for(let j=0;j<this.listactivitePrincipal.items.length;j++){
        if(this.listactivitePrincipal.items[j].secteuractivites!=
          this.listactivitePrincipal.items[i].secteuractivites){
            j++;
      }
      else{
        this.listSector.push(this.listactivitePrincipal.items[i])
      }  
    } 
    }  
    console.log(this.listSector) 
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
    this.validPassport=false;
    this.validICN=false;
    let d1:Date=this.immatForm.get('input').get('legalRepresentativeForm').get('issuedDate').value;
    let d2:Date=this.immatForm.get('input').get('legalRepresentativeForm').get('expiryDate').value;
    let d3: number = this.dateDiff1(new Date(d1),new Date(d2));
    if(this.immatForm.get('legalRepresentativeForm').get('typeOfIdentity').value==1){
    if(d3< 10 || d3> 10.008219178082191){
      this.validICN=true;
      console.log(this.validICN)
    }
    else{
      this.validICN=false;
    }
  }
  else{
    if(d3 < 5 || d3 > 5.008219178082191){
      this.validPassport=true;
      console.log(this.validPassport);
    }
    else{
      this.validPassport=false;
      console.log(this.validPassport);
    }
  }
   
  }
/*   validDateNaissance(event){
    let d=this.input.get('legalRepresentativeForm').get('birthdate').value/ 31536000000;
    let d3= this.dateDiff1(new Date(d),new Date());
    if(d3<18.008219178082191){
      this.validDateNaiss=true;
      console.log(d3);
      console.log(this.validDateNaiss);
    }
    else{
      this.validDateNaiss=false;
    }
  } */ 
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
    }
    else{
      this.validDateNaiss = false;
    }
  }
 getNineaNumber(){
   this.immService.getNineaNumber(this.immatForm.get('input').get('employerQuery').get('nineaNumber').value).subscribe(
     (resp:any)=>{
       console.log(resp);
       if(resp.status!="200"){
           this.nineaExist=true;
           console.log(this.nineaExist);
       }
     }
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
      LieuDelivrance: this.fb.control(''),
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
      categorie:  this.fb.control(''),
     
  });
  }
  addItem(): void {
    
   /* this.employeList = this.immatForm.get('input').get('employeList') as FormArray; */ 
    this.employeList.push(this.createItem());
    console.log(this.employeList);
  }
selectRegion(event){
this.listDepartments=[];
this.initlistDept.items.forEach(element => {
  let region=this.immatForm.get('input').get('mainRegistrationForm').get('region').value;
  let region1=this.immatForm.get('input').get('legalRepresentativeForm').get('region').value
  if(element.rgion==region||element.rgion==region1){
    this.listDepartments.push(element); 
  }
  }
); 
}
selectDepartement(event){
  this.listArrondissements=[];
  let d1= this.immatForm.get('input').get('mainRegistrationForm').get('department').value;
  let d2=this.immatForm.get('input').get('legalRepresentativeForm').get('department').value
  this.listArrondissemnt.items.forEach(element => {
    if(element.departement==d1||element.departement==d2){
      this.listArrondissements.push(element);
      console.log(this.listDepartments)
    }
    }
  ); 
  }
  selectArrondissement(event){
    this.listCommunes=[];
    let c1= this.immatForm.get('input').get('mainRegistrationForm').get('arondissement').value;
    let c2= this.immatForm.get('input').get('legalRepresentativeForm').get('arondissement').value;
    this.listCommune.items.forEach(element => {
      if(element.arrondissement==c1||element.arrondissement==c2){
        this.listCommunes.push(element);
      }
      }
    );  
  }
  selectSector(event){
    this.listMainSector=[];
    let c1= this.immatForm.get('input').get('mainRegistrationForm').get('businessSector').value;
    this.listactivitePrincipal.items.forEach(element => {
      if(element.secteuractivites==c1){
        this.listMainSector.push(element);
        console.log(this.listMainSector);
      }
      }
    ); 
  }
 

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
    return this.immatForm.get('mainRegistrationForm').get('telephone');
  }
  get email() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('email');
  }
  get website() {
    return this.immatForm.get('input').get('mainRegistrationForm').get('website');
  }
  get employerType() {
    return this.immatForm.get('employerQuery').get('employerType');
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
  get ninetNumber() {
    return this.immatForm.get('input').get('employerQuery').get('ninetNumber');
  }
  get companyOriginId() {
    return this.immatForm.get('input').get('employerQuery').get('companyOriginId');
  }
  get firtName() {
    return this.immatForm.get('input').get('repLegalForm').get('firtName');
  }
  get lastName() {
    return this.immatForm.get('input').get('repLegalForm').get('lastName');
  }
  get birthdate() {
    return this.immatForm.get('input').get('repLegalForm').get('birthdate');
  }
  get nationality() {
    return this.immatForm.get('input').get('repLegalForm').get('nationality');
  }
  get nin() {
    return this.immatForm.get('input').get('repLegalForm').get('nin');
  }
  get placeOfBirth() {
    return this.immatForm.get('input').get('repLegalForm').get('placeOfBirth');
  }
  get cityOfBirth() {
    return this.immatForm.get('input').get('repLegalForm').get('cityOfBirth');
  }
  get typeOfIdentity() {
    return this.immatForm.get('input').get('repLegalForm').get('typeOfIdentity');
  }
  get ninCedeo() {
    return this.immatForm.get('input').get('repLegalForm').get('ninCedeo');
  }
  get issuedDate() {
    return this.immatForm.get('input').get('repLegalForm').get('issuedDate');
  }
  get expiryDate() {
    return this.immatForm.get('input').get('repLegalForm').get('expiryDate');
  }
  get region1() {
    return this.immatForm.get('input').get('repLegalForm').get('region');
  }
  get department1() {
    return this.immatForm.get('input').get('repLegalForm').get('department');
  }
  get arondissement1() {
    return this.immatForm.get('input').get('repLegalForm').get('arondissement');
  }
  get commune1() {
    return this.immatForm.get('input').get('repLegalForm').get('commune');
  }
  get qartier1() {
    return this.immatForm.get('input').get('repLegalForm').get('qartier');
  }
  get address1() {
    return this.immatForm.get('input').get('repLegalForm').get('address');
  }
  get mobileNumber() {
    return this.immatForm.get('input').get('repLegalForm').get('mobileNumber');
  }
  get email1() {
    return this.immatForm.get('input').get('repLegalForm').get('email');
  }
  get nomEmploye() {
    return this.immatForm.get('input').get('employeList').get('nomEmploye');
  }
  get employeList() {
    return this.immatForm.get('input').get('employeList') as FormArray;
  }
}


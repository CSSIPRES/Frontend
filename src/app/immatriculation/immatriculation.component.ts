import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { ImmatriculationService } from '../immatriculation.service';

@Component({
  selector: 'app-immatriculation',
  templateUrl: './immatriculation.component.html',
  styleUrls: ['./immatriculation.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
  })
export class ImmatriculationComponent implements OnInit {
  listAct:any=[];
  listSect:any=[];
  listPrAct:any=[];
  listProfession:any=[];
  showFiller = false;
  employeList: FormArray;
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
  
  nineaExist:boolean=false;
  validICN:boolean=false;
  validPassport:boolean=false;
  snackBar:boolean=true;

  srcResult:any;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  icnpattern = ".{13,19}";
  
   addImmatriculation(){
    this.immService.addImmatriculation(this.input.value).subscribe(res=>{
      this.snackBar==true
    })
    
   
  } 
  input=new FormGroup ({
    mainRegistrationForm:new FormGroup({
    dateOfInspection:new FormControl('', Validators.required),
    dateOfFirstHire:new FormControl('', Validators.required),
    shortName:new FormControl('', Validators.required),
    businessSector:new FormControl('', Validators.required),
    mainLineOfBusiness:new FormControl('', Validators.required),
    region:new FormControl('', Validators.required),
    department:new FormControl('', Validators.required),
    arondissement:new FormControl('', Validators.required),
    commune:new FormControl('', Validators.required),
    qartier:new FormControl('', Validators.required),
    address:new FormControl('', Validators.required),
    telephone:new FormControl('', Validators.required),
    email:new FormControl('', { updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.emailPattern)]}),
    website:new FormControl('', Validators.required),
    noOfWorkersInBasicScheme:new FormControl('', Validators.required),
    noOfWorkersInGenScheme:new FormControl('', Validators.required)
  }),
    employerQuery:new FormGroup({
      employerType:new FormControl('', Validators.required),
      legalStatus: new FormControl('',Validators.required),
      typeEtablissement:new FormControl('', Validators.required),
      employerName:new FormControl('', Validators.required),
      nineaNumber:new FormControl('',[ Validators.required,Validators.maxLength(9)]),
      regType:new FormControl('', Validators.required) 
    }),
    legalRepresentativeForm:new FormGroup({
      lastName:new FormControl('', Validators.required),
      firstName:new FormControl('', Validators.required),
      birthdate:new FormControl('', Validators.required),
      nationality:new FormControl('', Validators.required),
      nin:new FormControl('', Validators.required),
      placeOfBirth:new FormControl('', Validators.required),
      cityOfBirth:new FormControl('', Validators.required),
      typeOfIdentity:new FormControl('', Validators.required),
      ninCedeo:new FormControl('', Validators.required),
      issuedDate:new FormControl('', Validators.required),
      expiryDate:new FormControl('', Validators.required),
      region:new FormControl('', Validators.required),
      department:new FormControl('', Validators.required),
      arondissement:new FormControl('', Validators.required),
      commune:new FormControl('', Validators.required),
      qartier:new FormControl('', Validators.required),
      address:new FormControl('', Validators.required),
      mobileNumber:new FormControl('', Validators.required),
      email:new FormControl('',{ updateOn: 'blur',validators: [Validators.required,Validators.pattern(this.emailPattern)]}),
    }),
     employeList: new  FormArray([this.createItem()])

    
  })
  
  
  constructor(private fb:FormBuilder,private dialog:MatDialog,
    private immService:ImmatriculationService,private snackB: MatSnackBar) {}
     openSnackbar() {
      this.snackB.open("ok");
    }
  ngOnInit() {
    
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
]}  
  
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
,{"region":"LOUGA","departement":"LINGUERE","arrondissement":"BARKEDJI","commune":"BARKEDJI","version":1},{"region":"SEDHIOU","departement":"GOUDOMP","arrondissement":"SIMBANDI BRASSOU","commune":"BAGHERE","version":1},{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"BOGHAL","commune":"DJINANY","version":1},{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"BOGHAL","commune":"NDIAMALATHIEL","version":1},{"region":"SEDHIOU","departement":"BOUNKILING","arrondissement":"DIAROUME","commune":"DIAROUME","version":1}
  ,{"region":"KOLDA","departement":"MEDINA YORO FOULAH","arrondissement":"COM. MEDINA YORO FOULAH","commune":"COM. MEDINA YORO FOULAH","version":1}]}
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
[{"profession":6223,"version":1,"language_cd":"FRA","descr":"Pêcheurs de la pêche en haute mer"}
,{"profession":6224,"version":1,"language_cd":"FRA   ","descr":"Chasseurs et trappeurs"}
,{"profession":63,"version":1,"language_cd":"FRA   ","descr":"Agriculteurs, pêcheurs, chasseurs et cueilleurs de subsistance  "}
,{"profession":631,"version":1,"language_cd":"FRA   ","descr":"Agriculteurs, subsistance"}
,{"profession":632,"version":1,"language_cd":"FRA   ","descr":"Eleveurs de bétail, subsistance"},
,{"profession":633,"version":1,"language_cd":"FRA   ","descr":"Agriculteurs et éleveurs, subsistance"}
,{"profession":634,"version":1,"language_cd":"FRA   ","descr":"Pêcheurs, chasseurs, trappeurs et cueilleurs, subsistance "}
,{"profession":7,"version":1,"language_cd":"FRA   ","descr":"Métiers qualifiés de l'industrie et de l'artisanat"}
,{"profession":71,"version":1,"language_cd":"FRA","descr":"Métiers qualifiés du bâtiment et assimilés, sauf électriciens"}
,{"profession":711,"version":1,"language_cd":"FRA   ","descr":"Métiers qualifiés du bâtiment (gros oeuvre) et assimilés"}
,{"profession":7111,"version":1,"language_cd":"FRA ","descr":"Constructeurs de maisons"}
,{"profession":9333,"version":1,"language_cd":"FRA   ","descr":"Manutentionnaires "}
,{"profession":9334,"version":1,"language_cd":"FRA   ","descr":"Garnisseurs de rayons"}
,{"profession":94,"version":1,"language_cd":"FRA   ","descr":"Assistants de fabrication de l'alimentation"}
,{"profession":9411,"version":1,"language_cd":"FRA   ","descr":"Cuisiniers, restauration rapide"}
]}
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
        if(this.listactivitePrincipal.items[i].secteuractivites
          !=this.listactivitePrincipal.items[i+1].secteuractivites){
              this.listSector.push(this.listactivitePrincipal.items[i]);     
      }
      
        console.log(this.listSector);
    }  
  }
  compareDate(event){
    let date_insp:Date=this.input.get('mainRegistrationForm').get('dateOfInspection').value;
    let date_ouv:Date=this.input.get('mainRegistrationForm').get('dateOfFirstHire').value;
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
    let d1:Date=this.input.get('legalRepresentativeForm').get('issuedDate').value;
    let d2:Date=this.input.get('legalRepresentativeForm').get('expiryDate').value;
    let d3: number = this.dateDiff1(new Date(d1),new Date(d2));
    if(this.input.get('legalRepresentativeForm').get('typeOfIdentity').value==1){
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
  

 getNineaNumber(){
   this.immService.getNineaNumber(this.input.get('employerQuery').get('nineaNumber').value).subscribe(
     (resp:any)=>{
       console.log(resp);
       if(resp.status!="200"){
           this.nineaExist=true;
           console.log(this.nineaExist);
       }
     }
   )
 }

  createItem(): FormGroup {
    return this.fb.group({
      nomEmploye:"Kane",
      prenomEmploye:"Cheikh",
      sexe:"HOMME",
      etatCivil:"CEL",
      dateNaissance:"1993-01-18",
      nationalite:"Senegalaise",
     typePieceIdentite:"NIN",
      delivreLe:"2012-03-10",
      expireLe:"2022-03-10",
      LieuDelivrance:"Senegalais",
      paysNaissance:"Senegal",
      villeNaissance:"Diourbel",
      pays:"Senegal",
      departement:"Dakar",
      arrondissement:"Dakar Plateau",
      commune:"Point E",
      quartier:"CIPRESS",
      adresse:"lot 228",
      typeMouvement:"Embauche",
      natureContrat:"CDI",
      dateDebutContrat:"2017-10-02",
      conventionApplicable:"NCA2",
      salaireContractuel:"1200000",
      categorie:"B1"
  });
  }
  addItem(): void {
    this.employeList = this.input.get('employeList') as FormArray;
    this.employeList.push(this.createItem());
    console.log(this.employeList);
  }
selectRegion(event){
this.listDepartments=[];
this.initlistDept.items.forEach(element => {
  let region=this.input.get('mainRegistrationForm').get('region').value;
  let region1=this.input.get('legalRepresentativeForm').get('region').value
  if(element.rgion==region||element.rgion==region1){
    this.listDepartments.push(element); 
  }
  }
); 
}
selectDepartement(event){
  this.listArrondissements=[];
  let d1= this.input.get('mainRegistrationForm').get('department').value;
  let d2=this.input.get('legalRepresentativeForm').get('department').value
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
    let c1= this.input.get('mainRegistrationForm').get('arondissement').value;
    let c2= this.input.get('legalRepresentativeForm').get('arondissement').value;
    this.listCommune.items.forEach(element => {
      if(element.arrondissement==c1||element.arrondissement==c2){
        this.listCommunes.push(element);
      }
      }
    );  
  }
  selectSector(event){
    this.listMainSector=[];
    let c1= this.input.get('mainRegistrationForm').get('businessSector').value;
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
    return this.input.get('mainRegistrationForm').get('dateOfInspection');
  }
  get dateOfFirstHire() {
    return this.input.get('mainRegistrationForm').get('dateOfFirstHire');
  }
  get shortName() {
    return this.input.get('mainRegistrationForm').get('shortName');
  }
  get businessSector() {
    return this.input.get('mainRegistrationForm').get('businessSector');
  }
  get mainLineOfBusiness() {
    return this.input.get('mainRegistrationForm').get('mainLineOfBusiness');
  }
  get region() {
    return this.input.get('mainRegistrationForm').get('region');
  }
  get department() {
    return this.input.get('mainRegistrationForm').get('department');
  }
  get arondissement() {
    return this.input.get('mainRegistrationForm').get('arondissement');
  }
  get commune() {
    return this.input.get('mainRegistrationForm').get('arondissement');
  }
  get qartier() {
    return this.input.get('mainRegistrationForm').get('qartier');
  }
  get address() {
    return this.input.get('mainRegistrationForm').get('address');
  }
  get telephone() {
    return this.input.get('mainRegistrationForm').get('telephone');
  }
  get email() {
    return this.input.get('mainRegistrationForm').get('email');
  }
  get website() {
    return this.input.get('mainRegistrationForm').get('website');
  }
  get employerType() {
    return this.input.get('employerQuery').get('employerType');
  }
  get typeEtablissement() {
    return this.input.get('employerQuery').get('typeEtablissement');
  }
  get employerName() {
    return this.input.get('employerQuery').get('employerName');
  }
  get nineaNumber() {
    return this.input.get('employerQuery').get('nineaNumber');
  }
  get ninetNumber() {
    return this.input.get('employerQuery').get('ninetNumber');
  }
  get companyOriginId() {
    return this.input.get('employerQuery').get('companyOriginId');
  }
  get firtName() {
    return this.input.get('repLegalForm').get('firtName');
  }
  get lastName() {
    return this.input.get('repLegalForm').get('lastName');
  }
  get birthdate() {
    return this.input.get('repLegalForm').get('birthdate');
  }
  get nationality() {
    return this.input.get('repLegalForm').get('nationality');
  }
  get nin() {
    return this.input.get('repLegalForm').get('nin');
  }
  get placeOfBirth() {
    return this.input.get('repLegalForm').get('placeOfBirth');
  }
  get cityOfBirth() {
    return this.input.get('repLegalForm').get('cityOfBirth');
  }
  get typeOfIdentity() {
    return this.input.get('repLegalForm').get('typeOfIdentity');
  }
  get ninCedeo() {
    return this.input.get('repLegalForm').get('ninCedeo');
  }
  get issuedDate() {
    return this.input.get('repLegalForm').get('issuedDate');
  }
  get expiryDate() {
    return this.input.get('repLegalForm').get('expiryDate');
  }
  get region1() {
    return this.input.get('repLegalForm').get('region');
  }
  get department1() {
    return this.input.get('repLegalForm').get('department');
  }
  get arondissement1() {
    return this.input.get('repLegalForm').get('arondissement');
  }
  get commune1() {
    return this.input.get('repLegalForm').get('commune');
  }
  get qartier1() {
    return this.input.get('repLegalForm').get('qartier');
  }
  get address1() {
    return this.input.get('repLegalForm').get('address');
  }
  get mobileNumber() {
    return this.input.get('repLegalForm').get('mobileNumber');
  }
  get email1() {
    return this.input.get('repLegalForm').get('email');
  }
}


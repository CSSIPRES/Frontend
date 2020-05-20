import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { CreationcompteComponent } from './creationcompte/creationcompte.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { MatInputModule,MatFormFieldModule,MatToolbarModule,MatMenuModule, 
MatIconModule,MatButtonModule,MatCardModule, MatSelectModule, 
MatDatepickerModule, MatNativeDateModule, MatDividerModule,
MatStepperModule, MatSliderModule, MatDrawerContainer, MatSidenavModule,
MatProgressSpinnerModule, MatNavList, MatListModule, MatDialogModule, 
MatTableModule, 
MatRadioModule,
MatSnackBarModule,
MatExpansionModule,
MatTabsModule,
DateAdapter,
MAT_DATE_LOCALE,
MatSortModule,
MatPaginatorModule}
from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { DocumentComponent } from './document/document.component';
import { AccueilComponent } from './accueil/accueil.component';
import { DemarcheComponent } from './demarche/demarche.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MotPasseOublieComponent } from './mot-passe-oublie/mot-passe-oublie.component';
import { EspaceEmployeComponent } from './espace-client/espace-employe.component';
import { ImmatriculationComponent } from './immatriculation/immatriculation.component';
import { ImmatriculationExistComponent } from './immatriculation-exist/immatriculation-exist.component';
import { RecapChaDirective } from './recap-cha.directive';
import { RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DeclarationComponent } from './declaration/declaration.component';
import { SuiviDemandeComponent } from './suivi-demande/suivi-demande.component';
import { ViewPdfComponent } from './view-pdf/view-pdf.component';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { PaiementComponent } from './paiement/paiement.component';
import { RedirectionComponent } from './redirection/redirection.component';
import { SendMailComponent } from './send-mail/send-mail.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { EspaceEmployeurComponent } from './espace-employeur/espace-employeur.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: false,
  scrollXMarginOffset:300,
  suppressScrollY:false
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent,
    CreationcompteComponent,
    ImmatriculationComponent,
    DocumentComponent,
    AccueilComponent,
    DemarcheComponent,
    ContactComponent,
    MotPasseOublieComponent,
    EspaceEmployeComponent,
    ImmatriculationExistComponent,
    RecapChaDirective,
    DeclarationComponent,
    SuiviDemandeComponent,
    ViewPdfComponent,
    PaiementComponent,
    RedirectionComponent,
    SendMailComponent,
    EspaceEmployeurComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatStepperModule,
    MatSliderModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    PerfectScrollbarModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTabsModule,
    MatMomentDateModule,
    MatSortModule,
    MatPaginatorModule,
    SweetAlert2Module.forRoot()
  ],

  exports:[
        
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}, 
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
   
  ],
  bootstrap: [AppComponent],
  entryComponents:[ImmatriculationComponent,ImmatriculationExistComponent,
  DeclarationComponent,SuiviDemandeComponent,ViewPdfComponent,PaiementComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { CreationcompteComponent } from './creationcompte/creationcompte.component';

import { MatInputModule,MatFormFieldModule,MatToolbarModule,MatMenuModule, 
MatIconModule,MatButtonModule,MatCardModule, MatSelectModule, 
MatDatepickerModule, MatNativeDateModule, MatDividerModule,
MatStepperModule, MatSliderModule, MatDrawerContainer, MatSidenavModule,
MatProgressSpinnerModule, MatNavList, MatListModule, MatDialogModule, 
MatTableModule, 
MatRadioModule}
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
    RecapChaDirective
    
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
    MatDialogModule  
  ],

  exports:[
        
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: '6LdA-t4UAAAAAO-kSP9_OplH2qJz354Je7bzgKS5', 
      secretKey:'6LdA-t4UAAAAAOC3C__w4pGDHltQCxkfKRc6rNob'

    } as RecaptchaSettings,
  }],
  bootstrap: [AppComponent],
  entryComponents:[ImmatriculationComponent,ImmatriculationExistComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ContactComponent } from './contact/contact.component';
import { DemarcheComponent } from './demarche/demarche.component';
import { CreationcompteComponent } from './creationcompte/creationcompte.component';
import { MotPasseOublieComponent } from './mot-passe-oublie/mot-passe-oublie.component';
import { EspaceEmployeComponent } from './espace-client/espace-employe.component';
import { ImmatriculationComponent } from './immatriculation/immatriculation.component';
import { MatDatepickerModule } from '@angular/material';
import { SendMailComponent } from './send-mail/send-mail.component';
import { RedirectionComponent } from './redirection/redirection.component';

const routes: Routes = [ 
  { path: '',redirectTo: 'accueil',pathMatch: 'full'},
  { path:'accueil', component:AccueilComponent },
  { path:'creationCompte', component:CreationcompteComponent },
  { path:'immatriculation', component:ImmatriculationComponent },
  { path:'motPasseOublie', component:MotPasseOublieComponent },
  { path:'contact', component:ContactComponent },
  { path:'demarche', component:DemarcheComponent },
  { path:'espaceEmploye', component:EspaceEmployeComponent },
  { path:'envoieMail', component:SendMailComponent },
  { path:'redirect', component:RedirectionComponent },
  { path: '**',component:AccueilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

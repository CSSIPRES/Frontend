import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ContactComponent } from './contact/contact.component';
import { DemarcheComponent } from './demarche/demarche.component';
import { CreationcompteComponent } from './creationcompte/creationcompte.component';
import { RedirectionComponent } from './redirection/redirection.component';
import { EspaceEmployeurComponent } from './espace-employeur/espace-employeur.component';
import { MotPasseOublieComponent } from './mot-passe-oublie/mot-passe-oublie.component';
import { EspaceEmployeComponent } from './espace-client/espace-employe.component';
import { ImmatriculationComponent } from './immatriculation/immatriculation.component';
import { MatDatepickerModule } from '@angular/material';

import { SendMailComponent } from './send-mail/send-mail.component';
import { MonProfilComponent } from './mon-profil/mon-profil.component';

const routes: Routes = [ 
  { path: '',redirectTo: 'accueil',pathMatch: 'full'},
  { path:'accueil', component:AccueilComponent },
  { path:'creationCompte', component:CreationcompteComponent },

  { path:'envoieMail', component:SendMailComponent },
  { path:'redirect', component:RedirectionComponent },
  {path:'espace-employer/:id', component:EspaceEmployeurComponent},
  { path:'immatriculation', component:ImmatriculationComponent },
  { path:'motPasseOublie', component:MotPasseOublieComponent },
  { path:'contact', component:ContactComponent },
  { path:'demarche', component:DemarcheComponent },
  
  { path:'espaceEmploye', component:EspaceEmployeComponent },
  { path:'mon-profil', component:MonProfilComponent },
  { path: '',redirectTo: 'accueil',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Paiement } from './models/paiement';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  constructor(private httpClient:HttpClient) { }



  savePaiement(paiement:Paiement){
      return this.httpClient.post(environment.BASE_URL + "paiements",paiement,
      {headers: new HttpHeaders().set('Authorization', 'Bearer'+' '+localStorage.getItem("token"))});
  }
}

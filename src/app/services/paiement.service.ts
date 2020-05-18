import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Paiement } from '../models/paiement';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {


   BANKS:Array<any> = [
     
  "CBAO",
  "SGBS","BHS","Crédit du Sénégal",
  "CNCA","Banque Islamique du Sénégal",
  "Bank of Africa Senegal","Banque Régionale de Solidarité-Sénégal",
  "Banque Atlantique-Sénégal","United Bank of Africa Senegal","Ecobank Senegal","Credit International"]

  constructor(private httpClient:HttpClient) { }



  savePaiement(paiement:Paiement){
      return this.httpClient.post(environment.BASE_URL + "paiements",paiement,
      {headers: new HttpHeaders().set('Authorization', 'Bearer'+' '+localStorage.getItem("token"))});
  }


  getPaiementsByUser(idUser:number){
    return this.httpClient.get(environment.BASE_URL + "paiements/user/"+idUser,
    {headers: new HttpHeaders().set('Authorization', 'Bearer'+' '+localStorage.getItem("token"))});
  }
}

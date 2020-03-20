import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreationCompteService {

  constructor(private http:HttpClient) { 

  }
  creationCompte(compte){
 return  this.http.post(environment.BASE_URL1 + "/register",compte)
  }
  activationCompte(key){
    return  this.http.get(environment.BASE_URL1 + "/activate/" +key);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const token=window.localStorage.getItem("token");
@Injectable({
  providedIn: 'root'
})
export class DeclarationService {

  constructor(private httpCl:HttpClient) { }

  preDns(preDns){
    return this.httpCl.post(environment.BASE_URL + "preDNS", preDns,
     {headers: new HttpHeaders({'Content-Type':  'application/json','Authorization': 'Bearer'+' '+token})});
  }
  addDeclaration(declaration){
    return this.httpCl.post(environment.BASE_URL + "dns", declaration,
    {headers: new HttpHeaders().set('Authorization', 'Bearer'+' '+token)});
  }
}

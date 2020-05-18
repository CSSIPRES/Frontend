import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const token=window.localStorage.getItem("token");
@Injectable({
  providedIn: 'root'
})
export class ImmatExistanteService {

  constructor(private httpCl:HttpClient) { }

  checkImmatExist(immatExist){
    return this.httpCl.post(environment.BASE_URL +'employeurExistant',immatExist);
  }
  
}

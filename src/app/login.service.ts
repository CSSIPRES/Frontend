import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpCli:HttpClient) { }

  authenticate(user){
   return this.httpCli.post(environment.BASE_URL + "authenticate", user )
  }
}

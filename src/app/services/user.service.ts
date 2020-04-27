import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const token=window.localStorage.getItem("token");
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpCl:HttpClient) { }
  getUser(login){
    return this.httpCl.get(environment.BASE_URL +'users/'+login,
    {headers: new HttpHeaders({'Authorization': 'Bearer'+' '+token})});
  }
}

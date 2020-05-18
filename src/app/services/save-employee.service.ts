import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const token=window.localStorage.getItem("token");
const userName=window.localStorage.getItem("login");
@Injectable({
  providedIn: 'root'
})
export class SaveEmployeeService {

  constructor(private httpCl:HttpClient) { }
  saveEmploye(employee){
    return this.httpCl.post(environment.BASE_URL +'employeurs',employee,
    {headers: new HttpHeaders({'Authorization': 'Bearer'+' '+token})});
  }
}

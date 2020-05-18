import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
/* const token=window.localStorage.getItem("token");  */
@Injectable({
  providedIn: 'root'
})
export class EmployeExistService {

  constructor(private httpCl:HttpClient) { }
  getEmpExist(){
    return this.httpCl.get(environment.BASE_URL +'employeursByLogin');
  }
}

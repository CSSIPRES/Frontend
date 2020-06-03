import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
/* const token=window.localStorage.getItem("token");  */
@Injectable({
  providedIn: 'root'
})
export class EmployeExistService {

  constructor(private httpCl:HttpClient) { }
  getEmployer(id){
    return this.httpCl.get(environment.BASE_URL +'employeurs/'+id);
  }

  getEmpExist(){
    return this.httpCl.get(environment.BASE_URL +'employeursByLogin');
  }
}

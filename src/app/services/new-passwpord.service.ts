import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewPasswpordService {

  constructor(private httpCl:HttpClient) { }
  senNewPassword(newPass){
    return this.httpCl.post(environment.BASE_URL + "/api/account/change-password", newPass)

  }
}

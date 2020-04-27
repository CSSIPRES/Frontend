import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(private httpCl:HttpClient) { }
  sendMail(mailUser){
    return this.httpCl.post(environment.BASE_URL +'account/reset-password/init',mailUser);
  }
  
}

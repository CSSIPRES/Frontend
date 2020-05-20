import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpCli:HttpClient,private router:Router) { }

  authenticate(user){
   return this.httpCli.post(environment.BASE_URL + "authenticate", user,
   {headers: new HttpHeaders({'Content-Type':  'application/json'})} )
  }


  logout(){
     localStorage.removeItem('token'); 
     localStorage.removeItem('user');
    /* localStorage.clear(); */
    /* this.router.navigate(['/accueil']);  */
  }


  getUserByLogin(login:string){
    return this.httpCli.get(environment.BASE_URL + "users/"+ login,
    {headers: new HttpHeaders({'Content-Type':  'application/json','Authorization': 'Bearer'+' '+localStorage.getItem("token")})} )
  }
}

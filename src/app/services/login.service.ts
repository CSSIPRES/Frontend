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
    localStorage.removeItem('userConnecter'); 
    localStorage.removeItem('user');
    this.router.navigate(['/accueil']);  
  }


  getUserByLogin(login:string){
    return this.httpCli.get(environment.BASE_URL + "users/"+ login,
    {headers: new HttpHeaders({'Content-Type':  'application/json','Authorization': 'Bearer'+' '+localStorage.getItem("token")})} )
  }

  changePassword(data:any){
    return this.httpCli.post(environment.BASE_URL + "account/change-password", data,
    {headers: new HttpHeaders({'Content-Type':  'application/json','Authorization': 'Bearer'+' '+localStorage.getItem("token")})} )
  }

  resetPasswordInit(email:string){
    return this.httpCli.post(environment.BASE_URL + "account/reset-password/init", email,
    {headers: new HttpHeaders({'Content-Type':  'application/json','Authorization': 'Bearer'+' '+localStorage.getItem("token")})} )
  }


  activatedAccount(key:string){
    let token = "";

    /* this.authenticate({username:"admin",password:"admin"})
    .subscribe(
      (data:any)=>{
        console.log(data.id_token);
       token = data.id_token; */
       this.httpCli.get(environment.BASE_URL + "activate?key="+key
         // {headers: new HttpHeaders({'Content-Type':  'application/json','Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU5MjA2NTU1MH0.613aRZLzBmxKuHkhvBshCEQVbLavHeh8tCn2gc8RTgDl3URKCtbaiMh1BW35ZLBCswd_sURhOfDPrDKk3l0cVw'})} 
          )
          .subscribe((resp)=>{
                console.log("Compte activé");
          },err=>{
            console.log("Compte non activé");
            //console.log(data.id_token);
          })
    /*   }
    ); */
   /* return this.httpCli.get(environment.BASE_URL + "activate/"+key,
    {headers: new HttpHeaders({'Content-Type':  'application/json','Authorization': 'Bearer'+' '+token})} ); */
  }

  
  
}

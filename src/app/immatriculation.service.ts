import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
/* ""
 */export class ImmatriculationService {

  constructor(private http:HttpClient) { }
  
addImmatriculation(immatriculation){
return this.http.post(environment.BASE_URL + 'immatPortail', immatriculation,
{headers: new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU4NTEzMjgwOX0.bh6XbTN6YxUihiEgrcNbd2MkfyOg3gZRW2fhnUBoQObVPGVXtO0CIVnANiqomIAp0b2wZjOqkqHVow-2czrEDg')})
  }
 getNineaNumber(id){
   return this.http.get(environment.BASE_URL +'checkExistEmployer/' +id);
 } 

  getListActivite(){
     return this.http.get(environment.BASE_URL +'').pipe(map(
       resp=>console.log(resp)
     ))
  }
  getListSectorAct(){
    return this.http.get(environment.BASE_URL +'').pipe(map(
      resp=>console.log(resp)
    ))
  }
  getPrincipAct(){
    return this.http.get(environment.BASE_URL +'').pipe(map(
      resp=>console.log(resp)
    ))

  }
  getProfession(){
    return this.http.get(environment.BASE_URL +'').pipe(map(
      resp=>console.log(resp)
    ))
  }
}

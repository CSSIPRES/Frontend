import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ImmatriculationService {

  constructor(private http:HttpClient) { }
  
addImmatriculation(immatriculation){
return this.http.post(environment.BASE_URL + 'immatriculation', immatriculation)
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

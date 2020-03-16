import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImmatriculationService {

  constructor(private http:HttpClient) { }
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class DeclarationService {

  constructor(private httpCl:HttpClient) { }

  preDns(preDns){
    return this.httpCl.post(environment.BASE_URL + "preDNS", preDns,
     {headers: new HttpHeaders({'Content-Type':  'application/json'})});
  }
  addDeclaration(declaration){
    return this.httpCl.post(environment.BASE_URL + "dns", declaration,
    ).pipe(
      catchError(this.handleError))
  }
  handleError(error: HttpErrorResponse){
    console.log("ok");
    return throwError(error);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const token=window.localStorage.getItem("token");


@Injectable({
  providedIn: 'root'
})
export class DemandesServiceService {

  constructor(private http:HttpClient) { }


  addDemandeService(demande){
    return this.http.post(environment.BASE_URL + 'demande-services', demande,
    {headers: new HttpHeaders().set('Authorization', 'Bearer'+' '+localStorage.getItem("token"))});
    }

  updateDemandeService(demandeToUpdate){
      return this.http.put(environment.BASE_URL + 'demande-services', demandeToUpdate,
      {headers: new HttpHeaders().set('Authorization', 'Bearer'+' '+localStorage.getItem("token"))});
      }
  


    getEmployeur(typeIdentifiant:string,numeroIdentifiant:string){
      return this.http.get(environment.BASE_URL + 'employeurByIdentifiant/'+typeIdentifiant+"/"+numeroIdentifiant)
    }

    getDemandeByEmployeur(identifiant){
      return this.http.get(environment.BASE_URL + 'demande-services/'+identifiant+'/employeur')
    }
}

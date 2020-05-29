import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const token=window.localStorage.getItem("token");

@Injectable({
  providedIn: 'root'
})
export class ImmatriculationService {

   
  attestationType:string = "";
  urlAttestation:string = "";
  
  constructor(private http:HttpClient) {
    
   }
  
addImmatriculation(immatriculation){
return this.http.post(environment.BASE_URL + 'immatPortail', immatriculation)
}
 getNineaNumber(numeroIdentifiant){
   let typeIdentifiant="SCI"
   return this.http.get(environment.BASE_URL +'checkExistenceEmployeur/'+typeIdentifiant+'/'+ +numeroIdentifiant);
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

  getNinNumber(numeroIdentifiant){
    let typeIdentifiant="NIN"
    return this.http.get(environment.BASE_URL +'checkExistenceEmployeur/'+typeIdentifiant+'/'+ +numeroIdentifiant);
  } 
  createAttestationRegularite(typeIdentifiant:string,identifiant:string){
     return this.http.get(environment.BASE_URL+"attestation/create/"+typeIdentifiant+"/"+identifiant);
  }

  getStatusAttestationRegularite(idDossier:string){
    return this.http.get(environment.BASE_URL+"statutDossierImmatriculation/"+idDossier);
 }

 getUrlAttestationRegularite(idDossier:string){
  return this.http.get(environment.BASE_URL+"attestation/getUrl/"+idDossier);
}


getStatutCertificatImmat(idDossier){
  return this.http.get(environment.BASE_URL+"statutDossierImmatriculation/"+idDossier);
}

getUrlCertificatImmat(idDossier){
  return this.http.get(environment.BASE_URL+"certificatImmatriculation/"+idDossier);
}
 
}

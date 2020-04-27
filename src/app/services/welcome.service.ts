import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(private httpCli:HttpClient) { }
  sayHello(){
    return this.httpCli.get(environment.BASE_URL + '/users').pipe(
      map(resp=>console.log(resp))
    );
  }
}

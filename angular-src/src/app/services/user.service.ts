import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http:Http ) {

   }

  getUsers(){
    return this.http.get('http://localhost:6001/list')
      .map( res=>res.json() );
  }

}

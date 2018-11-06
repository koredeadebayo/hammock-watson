import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Http, Headers } from '@angular/http';
import { User } from '../../../user';
import { Resp,Resp2 } from '../../../defResponse';
import 'rxjs/add/operator/map';
//import { Observable } from 'rxjs/Observable';
//import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http:HttpClient) {

   }

  /*getUsers(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:6001/users/list')
      .pipe(
        tap(_ => console.log('fetched users'))
      );
      //return this.http.get('http://localhost:6001/users/list')
        //.map(res =>res.json());
  }

  getUser(id): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:6001/users/list/'+id)
      .pipe(
        tap(_ => console.log('Fetch this user'))
      );
  }*/
  getUsers(){
    return this.http.get<Resp>('users/list');
      //.map(res => console.log(res));
      //return this.http.get('http://localhost:6001/users/list')
        //.map(res =>res.json());
  }


  getUser(id){
    return this.http.get<Resp>('users/list/'+id);
  }


  activateUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post<Resp>('users/verify',user,{headers: headers});
  }
}

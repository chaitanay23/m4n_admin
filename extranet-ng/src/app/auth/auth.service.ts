import { Injectable } from '@angular/core';
import { Observable, throwError, of, Subject } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private routeSubject = new BehaviorSubject<any>('');

 set sendMessage(message){
    this.routeSubject.next({text:message})
  }
  clearMessage(){
    this.routeSubject.next('');
  }

 get getMessage(){
      return this.routeSubject.value();
  }



  loggedIn  = new BehaviorSubject<boolean>(this.localKey);
  url=environment.url;
  currentUSer = {}
  constructor(private http:HttpClient,private router :Router) { }

  get isloggedIn(){
    return this.loggedIn.asObservable();
  }
  get localKey(){
    if(localStorage.getItem('isloggedIn')){return true}else{return false}
    
  }

  signIn(mobileNumber,password):Observable<any>{
    return this.http.post(`${this.url}/ext/admin_user/login`,{mobileNumber:mobileNumber,password:password})
    .pipe(retry(1),catchError(val=>of(`I caught error:${val}`)));
    
  }

  signOut(){
    this.loggedIn.next(false);
    localStorage.removeItem('isloggedIn');
    this.router.navigate(['/']);
  }
}

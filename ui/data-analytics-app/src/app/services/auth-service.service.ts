import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient, public router: Router) { }

  signUp(data: Object) :Observable<{}>{
    let signUpUrl = environment.apiUrl + '/api/user/register';
    return this.http.post(signUpUrl, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  login(data: Object) :Observable<{}>{
    let loginUpUrl = environment.apiUrl + '/api/user/login';
    return this.http.post(loginUpUrl, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  logout() :void {
    sessionStorage.clear();
    this.router.navigateByUrl('/user-auth');
  }

  userInformation(){
    if(sessionStorage.getItem('userName')){
      return of({userName: sessionStorage.getItem('userName'), userEmail: sessionStorage.getItem('userEmail')});
    }
  }
}

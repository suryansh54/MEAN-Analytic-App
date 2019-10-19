import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  signUp(data: Object) : Observable<{}>{
    let signUpUrl = environment.apiUrl + '/api/user/register';
    return this.http.post(signUpUrl, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

}

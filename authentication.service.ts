import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../../core/login/login.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogged = false;

  authenticationJwtHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    responseType: 'text',
  });

  authenticationBasicHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    responseType: 'text',
  });

  constructor(private http: HttpClient) {}

  LoginJwtPost(credentials: Credentials): Observable<any> {
    return this.http.post('https://localhost:7194/LoginJwt', credentials, {
      observe: 'response',
    });
  }

  LoginPost(credentials: Credentials): Observable<any> {
    return this.http.post('https://localhost:7194/Login', credentials, {
      observe: 'response',
    });
  }

  SetLoginJwtInfo(isLogged: boolean, jwtToken: string = '') {

    if (isLogged) {
      localStorage.setItem('jwtToken', jwtToken);
      this.authenticationJwtHeader = this.authenticationJwtHeader.set(
        'Authorization',
        'Bearer ' + jwtToken
      );
      console.log('Dopo imposta Header ' + JSON.stringify(this.authenticationJwtHeader))
    }
    else
    {
      localStorage.removeItem('jwtToken');
      this.authenticationJwtHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        responseType: 'text',
      });
    }

    this.isLogged = isLogged;
  }

  SetLoginInfo(isLogged: boolean, credentials: Credentials) {

    if (isLogged) {
      localStorage.setItem(
        'token',
        window.btoa(credentials.Username + ':' + credentials.Password)
      );
      this.authenticationBasicHeader = this.authenticationBasicHeader.set(
        'Authorization',
        'Basic ' +
          window.btoa(credentials.Username + ':' + credentials.Password)
      );
    } else {
      localStorage.removeItem('token');
      this.authenticationBasicHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        responseType: 'text',
      });
    }

    this.isLogged = isLogged;
  }

  GetLoginInfo(): boolean {
    return this.isLogged;
  }
}

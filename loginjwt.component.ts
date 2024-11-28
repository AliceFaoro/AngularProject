import { Component } from '@angular/core';
import { AuthService } from '../../shared/authentication/authentication.service';
import { HttpStatusCode } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { ChangeLight } from '../directives/changelight';


@Component({
  selector: 'app-loginjwt',
  standalone: true,
  imports: [ChangeLight],
  templateUrl: './loginjwt.component.html',
  styleUrl: './loginjwt.component.css',
})
export class LoginjwtComponent {
  constructor(private authentication: AuthService) {}
  loginCredentials: Credentials = new Credentials();
  jwtToken: any;
  decodedTokenPayload: any;

  RunLoginJwt(usr: HTMLInputElement, pwd: HTMLInputElement) {
    if (usr.value && pwd.value) {
      this.loginCredentials.Username = usr.value;
      this.loginCredentials.Password = pwd.value;

      this.authentication.LoginJwtPost(this.loginCredentials).subscribe({
        next: (response: any) => {
          switch (response.status) {
            case HttpStatusCode.Ok:
              console.log('Login effettuato ');
              this.jwtToken = response.body.token;
              this.authentication.SetLoginJwtInfo(true, this.jwtToken);
              this.decodedTokenPayload = jwt_decode.jwtDecode(this.jwtToken);
              console.log(this.decodedTokenPayload);
              console.log(this.decodedTokenPayload.unique_name);
              console.log(this.decodedTokenPayload.iss);
              console.log(this.decodedTokenPayload.aud);
              console.log(this.decodedTokenPayload.exp);
              break;
            case HttpStatusCode.NoContent:
              console.log('Senza risposta');
              break;
          }
        },
        error: (err: any) => {
          switch (err.status) {
            case HttpStatusCode.Unauthorized:
              this.authentication.SetLoginInfo(false, this.loginCredentials);
              alert('Username o Password errati');
              break;
          }
        },
      });
    } else {
      alert('Username e Password sono campi obbligatori');
    }
  }
}

export class Credentials {
  Username: string;
  Password: string;
  constructor() {
    this.Username = '';
    this.Password = '';
  }
}

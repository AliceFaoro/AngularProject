import { Component } from '@angular/core';
import { AuthService } from '../../shared/authentication/authentication.service';
import { HttpStatusCode } from '@angular/common/http';
import { ChangeLight } from '../directives/changelight';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ChangeLight],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authentication: AuthService) { }
  loginCredentials: Credentials = new Credentials();

  RunLogin(usr: HTMLInputElement, pwd: HTMLInputElement) {
    if (usr.value && pwd.value) {
      this.loginCredentials.Username = usr.value;
      this.loginCredentials.Password = pwd.value;

      this.authentication.LoginPost(this.loginCredentials).subscribe({
        next: (response: any) => {
          switch (response.status){
            case HttpStatusCode.Ok:
              console.log('Login effettuato ');
              this.authentication.SetLoginInfo(true, this.loginCredentials);
              break;
              case HttpStatusCode.NoContent:
                console.log('Senza risposta');
                break;
          }
        },
        error: (err: any) => {
          switch (err.status){
            case HttpStatusCode.Unauthorized:
              this.authentication.SetLoginInfo(false, this.loginCredentials);
              alert('Username o Password errati');
              break;
          }
        },
      });
    }
   else {
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

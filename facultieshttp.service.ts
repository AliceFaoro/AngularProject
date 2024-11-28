import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Faculty } from '../models/Faculty';
import { AuthService } from '../authentication/authentication.service';

/* Decoratore @Injectable: specifica che questa classe è un servizio e che può essere iniettata in altri componenti o servizi. */
@Injectable({
  providedIn: 'root' /* indica che il servizio è disponibile globalmente nell'app senza bisogno di dichiararlo manualmente nei providers di un modulo. */
})

export class FacultieshttpService {

  url: string = 'https://localhost:7194/FacultyMongoDB'

  constructor(private http: HttpClient, private auth: AuthService) { } /* Inietta il servizio HttpClient, che permette di fare richieste HTTP. */

  /* Un Observable è una sequenza di eventi asincroni a cui puoi "ascoltare" o "osservare". */
  getFaculties(): Observable<any> {
    return this.http.get(this.url, {headers: this.auth.authenticationJwtHeader});
  }

  getFaculty(id: number): Observable<any> {
    const urlWithId = `${this.url}/${id}`; 
    return this.http.get(urlWithId, {headers: this.auth.authenticationJwtHeader});
  }

  addFaculty(f: Faculty): Observable<any> {
    return this.http.post(this.url, f, {headers: this.auth.authenticationJwtHeader});
  }

  removeFaculty(id: number): Observable<any> {
    const urlWithId = `${this.url}?id=${id}`;  
    return this.http.delete(urlWithId, {headers: this.auth.authenticationJwtHeader}); 
  }

  updateFaculty(id: number, name: string): Observable<any> {
    const urlWithId = `${this.url}?id=${id}&name=${name}`;
    const body = { name }; 
    return this.http.put(urlWithId, body, {headers: this.auth.authenticationJwtHeader});
  }
  

}

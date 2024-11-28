import { Component } from '@angular/core';
import { Faculty } from '../../shared/models/Faculty';
import { CommonModule } from '@angular/common';
import { FacultieshttpService } from '../../shared/httpservices/facultieshttp.service';

@Component({
  selector: 'app-faculties',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculties.component.html',
  styleUrl: './faculties.component.css'
})

export class FacultiesComponent {

  faculties: Faculty[] = [];
  facultyWithId = new Faculty();
  f1 : Faculty = new Faculty();


  constructor(private httpRequest: FacultieshttpService) { } /* Nel costruttore, il servizio FacultieshttpService viene iniettato */

  GetFaculties() {
    this.httpRequest.getFaculties().subscribe({ /* Per iniziare a ricevere i dati emessi da un Observable, usi il metodo subscribe.
      Il metodo subscribe ti permette di definire callback per gestire il caso in cui l'Observable emetta un valore (next), un errore (error), o completi la sequenza di valori (complete). */
      next: (data) => {
        this.faculties = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  GetFaculty(id: HTMLInputElement) {
    this.httpRequest.getFaculty(Number(id.value)).subscribe({
      next: (data) => {
        const facultyData = data as Faculty[];
        this.facultyWithId = facultyData[0];
        var p = document.createElement("p");
        p.innerHTML = `<b>Facoltà cercata:<br>Id:</b> ${this.facultyWithId.id}, <b>Nome:</b> ${this.facultyWithId.nameFaculty}`;
        const resultElement = document.getElementById("resultId");
        if (resultElement) {
          resultElement.append(p); 
        }

      },
      error: (err) => {

        var p = document.createElement("p");
        p.innerHTML = "Errore nella ricerca";
        const resultElement = document.getElementById("resultId");
        if (resultElement) {
          resultElement.append(p); 
        }

        console.error(err);

      }
    })
  }

  AddFaculty(id: HTMLInputElement, name: HTMLInputElement) {
    this.f1.idBson = '';
    this.f1.id = Number(id.value);
    this.f1.nameFaculty = name.value;
    this.httpRequest.addFaculty(this.f1).subscribe((response: any) =>
      {
      console.log(response);
      var p = document.createElement("p");
      p.innerHTML = "Facoltà aggiunta con successo";
      const resultAdd = document.getElementById("resultAdd");
      if(resultAdd) {
        resultAdd.append(p);
      }
      
    },
    (error : any) => {
      console.error('Errore:', error);
      var p = document.createElement("p");
      p.innerHTML = "Errore nell'aggiunta";
      const resultAdd = document.getElementById("resultAdd");
      if(resultAdd) {
        resultAdd.append(p);
      }
    }
      
    );
  }

  RemoveFaculty(id: HTMLInputElement) {
    this.httpRequest.removeFaculty(Number(id.value)).subscribe((response: any) =>
      {
      console.log(response);

      var p = document.createElement("p");
      p.innerHTML = "Facoltà elimminata con successo";
      const resultAdd = document.getElementById("resultRemove");
      if(resultAdd) {
        resultAdd.append(p);
      }

    },
    (error : any) => {
      console.error('Errore:', error);

      var p = document.createElement("p");
      p.innerHTML = "Errore durante l'eliminazione";
      const resultAdd = document.getElementById("resultRemove");
      if(resultAdd) {
        resultAdd.append(p);
      }

    }
      
    );
  }

  UpdateFaculty(id: HTMLInputElement, name: HTMLInputElement) {
    this.httpRequest.updateFaculty(Number(id.value), name.value).subscribe((response: any) =>
      {
      console.log(response);

      var p = document.createElement("p");
      p.innerHTML = "Facoltà aggiornata con successo";
      const resultAdd = document.getElementById("resultUpdate");
      if(resultAdd) {
        resultAdd.append(p);
      }

    },

    (error : any) => {
      console.error('Errore:', error);

      var p = document.createElement("p");
      p.innerHTML = "Errore durante l'aggiornamento";
      const resultAdd = document.getElementById("resultUpdate");
      if(resultAdd) {
        resultAdd.append(p);
      }

    }
      
    );;
  }

  Clear(element: HTMLInputElement) {
    element.value = '';
  }

  Clear2(element: HTMLInputElement, element2: HTMLInputElement) {
    element.value = '';
    element2.value = '';
  }
}

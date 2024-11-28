import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/authentication/authentication.service';
import { CommonModule } from '@angular/common';
import { ChangeLight } from '../directives/changelight';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, ChangeLight],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 constructor(public auth: AuthService) {

 }
}

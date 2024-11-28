import { Routes } from '@angular/router';
import { LoginjwtComponent } from './core/loginjwt/loginjwt.component';
import { LoginComponent } from './core/login/login.component';
import { LogoutComponent } from './core/logout/logout.component';
import { FacultiesComponent } from './features/faculties/faculties.component';

export const routes: Routes = [
    {path: 'loginjwt', component: LoginjwtComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'faculties', component: FacultiesComponent}
];

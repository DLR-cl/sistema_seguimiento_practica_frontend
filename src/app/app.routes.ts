import { Routes } from '@angular/router';
import { UserLoginComponent } from './users/features/user-login/user-login.component';
import { HomeComponent } from './pages/general/home/home.component';
import { AppComponent } from './app.component';
import { HomeAdministracionComponent } from './roles/jefe_compartido/home/home-administracion.component';
import { InformePrimeraPracticaComponent } from './roles/jefe_empleador/informe-primera-practica/informe-primera-practica.component';

export const routes: Routes = [
    {
        path: '', loadComponent: () => AppComponent
    },
    {
        path: 'login', loadComponent: () => UserLoginComponent
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'administracion', component: HomeAdministracionComponent,
    },
    {
        path: 'jefe_alumno/formulario_primer_practica', component: InformePrimeraPracticaComponent,
    }
];

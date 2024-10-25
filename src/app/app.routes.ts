import { Routes } from '@angular/router';
import { UserLoginComponent } from './users/features/user-login/user-login.component';
import { HomeComponent } from './pages/general/home/home.component';
import { AppComponent } from './app.component';
import { HomeAdministracionComponent } from './roles/jefe_compartido/home/home-administracion.component';

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
    }
];

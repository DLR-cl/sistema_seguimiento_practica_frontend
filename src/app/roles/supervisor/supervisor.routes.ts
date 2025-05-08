import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/home-jefe-empleador/home-jefe-empleador.component').then(c => c.HomeJefeEmpleadorComponent),
    }
]
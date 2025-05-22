import { Routes } from '@angular/router';
import { SupervisorPanelComponent } from './components/supervisor-panel/supervisor-panel.component';

export const routes: Routes = [
    {
        path: '',
        component: SupervisorPanelComponent
    },
    {
        path: 'formulario-practica/:idInforme',
        loadComponent: () => import('./components/informe-primera-practica/informe-primera-practica.component').then(c => c.InformePrimeraPracticaComponent)
     }
]
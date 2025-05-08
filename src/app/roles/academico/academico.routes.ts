import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/academico.component').then(c => c.AcademicoComponent),
  },
  {
    path: 'estadisticas',
    loadComponent: () => import('./components/statisc/statisc.component').then(c => c.StatiscComponent),
  },
  {
    path: 'revision-informe/:idPractica',
    loadComponent: () => import('../../features/evaluaciones/detalles-informes/detalles-informes.component').then(c => c.DetallesInformesComponent),
  }
];


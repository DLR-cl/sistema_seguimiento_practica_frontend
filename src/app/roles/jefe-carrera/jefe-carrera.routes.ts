import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../shared/components/dashboard/dashboard.component').then(c => c.DashboardComponent),
  },
  {
    path: 'reportes-administrativos',
    loadComponent: () => import('../../features/gestion-reportes/gestion-reportes.component').then(c => c.GestionReportesComponent),
  },
  {
    path: 'crear-practica',
    loadComponent: () => import('../../shared/components/generacion-practica/nueva-practica.component').then(c => c.NuevaPracticaComponent),
  },
  {
    path: 'lista-academicos',
    loadComponent: () => import('../../shared/components/info-academicos/info-academicos.component').then(c => c.InfoAcademicosComponent),
  }

]
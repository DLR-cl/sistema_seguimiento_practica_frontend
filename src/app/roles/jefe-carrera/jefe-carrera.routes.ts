import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../shared/components/home-administrativo/home-administrativo.component').then(c => c.HomeAdministrativoComponent),
  },
  {
    path: 'reportes-administrativos',
    loadComponent: () => import('../../shared/components/reportes-administrativos/reportes-administrativos.component').then(c => c.ReportesAdministrativosComponent),
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
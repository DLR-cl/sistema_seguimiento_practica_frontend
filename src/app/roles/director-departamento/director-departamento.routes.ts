import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../../shared/components/dashboard/dashboard.component').then(c => c.DashboardComponent),
    },
    {
        path: 'reportes',
        loadComponent: () => import('../../features/gestion-reportes/gestion-reportes.component').then(c => c.GestionReportesComponent),
    },
    {
        path: 'lista-academicos',
        loadComponent: () => import('../../shared/components/info-academicos/info-academicos.component').then(c => c.InfoAcademicosComponent),
    }
]
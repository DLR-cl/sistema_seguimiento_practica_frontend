import { Routes } from "@angular/router";

export const administradorRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../../shared/components/dashboard/dashboard.component').then(c => c.DashboardComponent),
    },
    {
        path: 'gestionar-usuarios',
        loadComponent: () => import('./gestion-usuarios/body/gestionar-usuarios.component').then(c => c.GestionarUsuariosComponent),
    },
    {
        path: 'reportes',
        loadComponent: () => import('../../features/gestion-reportes/gestion-reportes.component').then(c => c.GestionReportesComponent),
    },
    {
        path: 'academicos',
        loadComponent: () => import('../../shared/components/info-academicos/info-academicos.component').then(c => c.InfoAcademicosComponent),
    },
    {
        path: 'practicas',
        loadComponent: () => import('../../shared/components/gestion-practicas/practicas-secretaria.component').then(c => c.PracticasSecretariaComponent),
    },
    {
        path: 'crear-practica',
        loadComponent: () => import('../../shared/components/generacion-practica/nueva-practica.component').then(c => c.NuevaPracticaComponent),
    },
    {
        path: 'informes',
        loadComponent: () => import('../../pages/informes/informes.component').then(c => c.InformesComponent),
    }
]
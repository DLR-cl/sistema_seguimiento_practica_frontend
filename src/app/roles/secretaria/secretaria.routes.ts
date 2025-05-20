import { Routes } from "@angular/router";

// Para ambas secretarias.
export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home-secretaria.component').then(c => c.HomeSecretariaComponent),
    },
    {
        path: 'ver-practicas',
        loadComponent: () => import('../../shared/components/gestion-practicas/practicas-secretaria.component').then(c => c.PracticasSecretariaComponent),
    },
    {
        path: 'cargar-alumnos-nomina',
        loadComponent: () => import('./components/cargar-usuarios-nomina/cargar-usuarios-nomina.component').then(c => c.CargarUsuariosNominaComponent),
    },
    {
        path: 'crear-practica',
        loadComponent: () => import('../../shared/components/generacion-practica/nueva-practica.component').then(c => c.NuevaPracticaComponent),
    },
    {
     path: 'lista-academicos',
     loadComponent: () => import('../../shared/components/info-academicos/info-academicos.component').then(c => c.InfoAcademicosComponent),
    },
    {
        path: 'seguimiento-academicos',
        loadComponent: () => import('./components/estado-academicos/estado-academicos.component').then(c => c.EstadoAcademicosComponent),
    },
    //TODO: Fix, mover la generación de reportes a local para servidor.
    {
        path: 'reportes',
        loadComponent: () => import('../../features/gestion-reportes/gestion-reportes.component').then(c => c.GestionReportesComponent), 
    }
]
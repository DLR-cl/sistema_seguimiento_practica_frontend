import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../../shared/components/home-administrativo/home-administrativo.component').then(c => c.HomeAdministrativoComponent),
    },
    {
        path: 'generar-reporte',
        loadComponent: () => import('../../shared/components/reportes-administrativos/reportes-administrativos.component').then(c => c.ReportesAdministrativosComponent),
    },
    {
        path: 'lista-academicos',
        loadComponent: () => import('../../shared/components/info-academicos/info-academicos.component').then(c => c.InfoAcademicosComponent),
    }
]
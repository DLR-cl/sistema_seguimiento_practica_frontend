import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './shared/guards/auth.guard';
import { roleGuard } from './shared/guards/roleUsers.guard';
import { TipoUsuario } from './enum/enumerables.enum';

export const routes: Routes = [
    // PUBLICO
    {
        path: 'public',
        loadComponent: () => import('./layout/public-layout/public-layout.component').then(c => c.PublicLayoutComponent),
        canActivate: [publicGuard()],
        loadChildren: () => import('./pages/general/general.route').then(r => r.routes),
    },
    //PROTEGIDO POR AUTENTICACIÓN
    {
        path: 'app',
        loadComponent: () => import('./layout/auth-layout/auth-layout.component').then(c => c.AuthLayoutComponent),
        canActivate: [privateGuard()],
        children: [
            {
                path: 'menu',
                loadComponent: () => import('./gestion-practicas/pages/menu-home-page/menu-home-page.component').then(c => c.MenuHomePageComponent),
            },
            {
                path: 'mas-info',
                loadComponent: () => import('./gestion-practicas/pages/mas-info-page/mas-info-page.component').then(c => c.MasInfoPageComponent),
            },
            {
                path: 'cambiar-clave',
                loadComponent: () => import('./pages/general/change-password/change-password.component').then(c => c.ChangePasswordComponent),
            },
            {
                path: 'alumno',
                canActivate: [roleGuard([TipoUsuario.ALUMNO_PRACTICA])],
                loadChildren: () => import('./roles/alumno/alumno.routes').then(r => r.routes)
            },
            {
                path: 'academico',
                canActivate: [roleGuard([TipoUsuario.ACADEMICO])],
                loadChildren: () => import('./roles/academico/academico.routes').then(r => r.routes)
            },
            {
                path: 'jefe-carrera',
                canActivate: [roleGuard([TipoUsuario.JEFE_CARRERA])],
                loadChildren: () => import('./roles/jefe-carrera/jefe-carrera.routes').then(r => r.routes)
            },
            {
                path: 'jefe-departamento',
                canActivate: [roleGuard([TipoUsuario.JEFE_DEPARTAMENTO])],
                loadChildren: () => import('./roles/director-departamento/director-departamento.routes').then(r => r.routes)
            },
            {
                path: 'secretaria',
                canActivate: [roleGuard([TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.SECRETARIA_DEPARTAMENTO])],
                loadChildren: () => import('./roles/secretaria/secretaria.routes').then(r => r.routes)
            },
            {
                path: 'supervisor',
                canActivate: [roleGuard([TipoUsuario.JEFE_EMPLEADOR])],
                loadChildren: () => import('./roles/supervisor/supervisor.routes').then(r => r.routes)
            },
            {
                path: 'administrador',
                canActivate: [roleGuard([TipoUsuario.ADMINISTRADOR])],
                loadChildren: () => import('./roles/administrador/administrador.routes').then(r => r.administradorRoutes)
            },
            {
                path: 'gestion-practicas',
                loadChildren: () => import('./gestion-practicas/gestion-practicas.routes').then(r => r.routes)
            },
            {
                path: '**',
                redirectTo: 'menu'
            }
        ]
    },
    // Redirección por defecto
    {
        path: '',
        redirectTo: 'public',
        pathMatch: 'full'
    },
    // Ruta para manejar 404
    {
        path: '**',
        redirectTo: 'public'
    }
];

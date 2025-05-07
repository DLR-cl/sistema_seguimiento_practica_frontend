import { Routes } from "@angular/router";
import { TipoUsuario } from "../../enum/enumerables.enum";
import { roleGuard } from "../../shared/guards/roleUsers.guard";
import { AuthLayoutComponent } from "../../layout/auth-layout/auth-layout.component";
import { privateGuard } from "../../shared/guards/auth.guard";
export const routes: Routes = [

    {
        path: '',
        loadComponent: () => import('./home-alumno/home-alumno.component').then( c => c.HomeAlumnoComponent),
        canActivate: [roleGuard([TipoUsuario.ALUMNO_PRACTICA]), privateGuard()],
    },
       
            {
                path: 'estado-practica/:idAlumno',
                loadComponent: () => import('../../features/practicas/estado-practica/estado-practica.component').then( c => c.EstadoPracticaComponent),
                canActivate: [roleGuard([TipoUsuario.ALUMNO_PRACTICA])]
            },
            {
                path: 'informe-practica-alumno/:idAlumno/:idPractica/:idInforme',
                loadComponent: () => import('./informe-primera-practica/informe-primera-practica.component').then( c => c.InformePrimeraPracticaAlumnoComponent)
            },
            {
                path: 'agradecimientos',
                loadComponent: () => import('./components/fin-informe-alumno/fin-informe-alumno.component').then( c => c.FinInformeAlumnoComponent)
            }
        
]
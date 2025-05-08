import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './shared/guards/auth.guard';
import { NuevaPracticaComponent } from './shared/components/generacion-practica/nueva-practica.component';
import { PreguntasInformeComponent } from './pages/roles/jefe_compartido/preguntas-informe/preguntas-informe.component';
import { HomeSecretariaComponent } from './roles/secretaria/home/home-secretaria.component';
import { roleGuard } from './shared/guards/roleUsers.guard';
import { PracticasSecretariaComponent } from './shared/components/visualizacion-academicos/practicas-secretaria.component';
import { HomeJefeEmpleadorComponent } from './roles/supervisor/components/home-jefe-empleador/home-jefe-empleador.component';
import { InformePrimeraPracticaComponent } from './roles/supervisor/components/informe-primera-practica/informe-primera-practica.component';
import { FinInformeJefeEmpleadorComponent } from './roles/supervisor/components/fin-informe-jefe-empleador/fin-informe-jefe-empleador.component';
import { InformePrimeraPracticaAlumnoComponent } from './roles/alumno/informe-primera-practica/informe-primera-practica.component';
import { NotFoundComponent } from './pages/general/not-found/not-found.component';
import { TipoUsuario } from './enum/enumerables.enum';
import { InfoAcademicosComponent } from './shared/components/info-academicos/info-academicos.component';
import { practicasGuard } from './shared/guards/practicas.guard';
import { DetallesInformesComponent } from './features/evaluaciones/detalles-informes/detalles-informes.component';

import { ResultadosPracticaComponent } from './pages/roles/jefe_compartido/pages/resultados-practica/resultados-practica.component';
import { PdfgeneratorComponent } from './shared/pdfgenerator/pdfgenerator.component';
import { GestionarUsuariosComponent } from './pages/roles/jefe_compartido/gestionar-usuarios/gestionar-usuarios.component';
import { InformesComponent } from './pages/roles/jefe_compartido/informes/informes.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { SolicitarPracticanteComponent } from './pages/solicitar-practicante/solicitar-practicante.component';
import { AcademicoComponent } from './roles/academico/components/home/academico.component';
import { EstadoAcademicosComponent } from './roles/secretaria/components/estado-academicos/estado-academicos.component';


export const routes: Routes = [

    // PUBLICO
    {
        path: '',
        component: PublicLayoutComponent,
        canActivate: [publicGuard()],
        loadChildren: () => import('./pages/general/general.route').then(r => r.routes),
    },
    //PROTEGIDO POR AUTENTICACIÓN // Todo: Mover a privatelayout 
    {
        path: '',
        loadComponent: () => import('./layout/auth-layout/auth-layout.component').then(c => c.AuthLayoutComponent),
        canActivate: [privateGuard()],
        loadChildren: () => import('./gestion-practicas/gestion-practicas.routes').then(r => r.routes),
    },
    {
        path: 'alumno',
        canActivate: [roleGuard([TipoUsuario.ALUMNO_PRACTICA]), privateGuard()],
        loadComponent: () => import('./layout/auth-layout/auth-layout.component').then(c => c.AuthLayoutComponent),
        loadChildren: () => import('./roles/alumno/alumno.routes').then(r => r.routes)
    },
    {
        path: 'academico',
        canActivate: [roleGuard([TipoUsuario.ACADEMICO]), privateGuard()],
        loadComponent: () => import('./layout/auth-layout/auth-layout.component').then(c => c.AuthLayoutComponent),
        loadChildren: () => import('./roles/academico/academico.routes').then(r => r.routes)
    },
    {
        path: 'jefe-carrera',
        canActivate: [privateGuard(), roleGuard([TipoUsuario.JEFE_CARRERA])],
        loadComponent: () => import('./layout/auth-layout/auth-layout.component').then(c => c.AuthLayoutComponent),
        loadChildren: () => import('./roles/jefe-carrera/jefe-carrera.routes').then(r => r.routes)
    },  
    {
        path: 'jefe-departamento',
        canActivate: [privateGuard(), roleGuard([TipoUsuario.JEFE_DEPARTAMENTO])],
        loadComponent: () => import('./layout/auth-layout/auth-layout.component').then(c => c.AuthLayoutComponent),
        loadChildren: () => import('./roles/director-departamento/director-departamento.routes').then(r => r.routes)
    },
    {
        path: 'secretaria',
        canActivate: [privateGuard(), roleGuard([TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.SECRETARIA_DEPARTAMENTO])],
        loadComponent: () => import('./layout/auth-layout/auth-layout.component').then(c => c.AuthLayoutComponent),
        loadChildren: () => import('./roles/secretaria/secretaria.routes').then(r => r.routes)
    },
    {
        path: 'supervisor',
        canActivate: [privateGuard(), roleGuard([TipoUsuario.JEFE_EMPLEADOR])],
        loadComponent: () => import('./layout/auth-layout/auth-layout.component').then(c => c.AuthLayoutComponent),
        loadChildren: () => import('./roles/supervisor/supervisor.routes').then(r => r.routes)
    },
    {
        path: 'informes', component: InformesComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.ADMINISTRADOR])]
    },
    {
        path: 'gestionar-usuarios', component: GestionarUsuariosComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.ADMINISTRADOR])]
    },
    {
        path: 'lista-academicos', component: InfoAcademicosComponent, 
        canActivate: [privateGuard, roleGuard([TipoUsuario.JEFE_CARRERA, TipoUsuario.JEFE_DEPARTAMENTO, TipoUsuario.ADMINISTRADOR, TipoUsuario.SECRETARIA_DEPARTAMENTO])]
    },
    {
        path: 'nueva-practica', component: NuevaPracticaComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.JEFE_DEPARTAMENTO, TipoUsuario.JEFE_CARRERA, TipoUsuario.ADMINISTRADOR])]

    },
    {       // RUTA EN CONSTRUCION --------------- RUTA EN CONSTRUCCION (eliminar??)
        path: 'preguntas/:tipo', component: PreguntasInformeComponent, 
        // canActivate: [privateGuard, roleGuard([TipoUsuario.jefe_departamento, TipoUsuario.jefe_carrera])] 
    },
    {
        path: 'crear-practica', component: NuevaPracticaComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.JEFE_CARRERA, TipoUsuario.JEFE_DEPARTAMENTO, TipoUsuario.ADMINISTRADOR, TipoUsuario.SECRETARIA_CARRERA])]
    },

    {
        path: 'ver-practicas', component: PracticasSecretariaComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.ADMINISTRADOR])]
    },

    {
        path: 'jefe_alumno/formulario_primer_practica/:idInforme', component: InformePrimeraPracticaComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.JEFE_EMPLEADOR, TipoUsuario.ALUMNO_PRACTICA])]
    },
    {
        path: 'resultados-practica', component: ResultadosPracticaComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.JEFE_CARRERA, TipoUsuario.JEFE_DEPARTAMENTO, TipoUsuario.ADMINISTRADOR, TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.ACADEMICO, TipoUsuario.SECRETARIA_DEPARTAMENTO ])]
    },
    {
        path: 'informe-pdf', component: PdfgeneratorComponent,
    },
    {
        path: '**', component: NotFoundComponent
    },
];

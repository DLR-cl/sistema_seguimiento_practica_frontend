import { Routes } from '@angular/router';
import { HomeComponent } from './pages/general/home/home.component';
import { privateGuard, publicGuard } from './shared/guards/auth.guard';
import { HomeAdministracionComponent } from './pages/roles/jefe_compartido/home/home-administracion.component';
import { NuevaPracticaComponent } from './pages/roles/jefe_compartido/nueva-practica/nueva-practica.component';
import { PreguntasInformeComponent } from './pages/roles/jefe_compartido/preguntas-informe/preguntas-informe.component';
import { HomeSecretariaComponent } from './pages/roles/secretaria/home-secretaria/home-secretaria.component';
import { roleGuard } from './shared/guards/roleUsers.guard';
import { PracticasSecretariaComponent } from './pages/roles/secretaria/practicas-secretaria/practicas-secretaria.component';
import { HomeJefeEmpleadorComponent } from './pages/roles/jefe_empleador/components/home-jefe-empleador/home-jefe-empleador.component';
import { InformePrimeraPracticaComponent } from './pages/roles/jefe_empleador/informe-primera-practica/informe-primera-practica.component';
import { FinInformeJefeEmpleadorComponent } from './pages/roles/jefe_empleador/components/fin-informe-jefe-empleador/fin-informe-jefe-empleador.component';
import { HomeAlumnoComponent } from './pages/roles/alumno_practica/home-alumno/home-alumno.component';
import { FinInformeAlumnoComponent } from './pages/roles/alumno_practica/components/fin-informe-alumno/fin-informe-alumno.component';
import { EstadoPracticaComponent } from './pages/roles/alumno_practica/estado-practica/estado-practica.component';
import { InformePrimeraPracticaAlumnoComponent } from './pages/roles/alumno_practica/informe-primera-practica/informe-primera-practica.component';
import { NotFoundComponent } from './pages/general/not-found/not-found.component';
import { TipoUsuario } from './enum/enumerables.enum';
import { InfoAcademicosComponent } from './pages/roles/jefe_compartido/pages/info-academicos/info-academicos.component';
import { practicasGuard } from './shared/guards/practicas.guard';
import { AcademicoComponent } from './pages/roles/academico/academico.component';
import { DetallesInformesComponent } from './pages/roles/academico/components/detalles-informes/detalles-informes.component';

import { EstadoAcademicosComponent } from './pages/roles/secretaria/estado-academicos/estado-academicos.component';
import { ResultadosPracticaComponent } from './pages/roles/jefe_compartido/pages/resultados-practica/resultados-practica.component';
import { PdfgeneratorComponent } from './shared/pdfgenerator/pdfgenerator.component';
import { GestionarUsuariosComponent } from './pages/roles/jefe_compartido/gestionar-usuarios/gestionar-usuarios.component';
import { InformesComponent } from './pages/roles/jefe_compartido/informes/informes.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { SolicitarPracticanteComponent } from './pages/solicitar-practicante/solicitar-practicante.component';


export const routes: Routes = [

    // PUBLICO
    {
        path: '',
        component: PublicLayoutComponent,
        canActivate: [publicGuard()],
        loadChildren: () => import('./pages/general/general.route').then(r => r.routes)
    },
    //PROTEGIDO POR AUTENTICACIÓN
    {
        path: '',
        loadComponent: () => import('./gestion-practicas/pages/menu-general-page/menu-general-page.component').then(c => c.MenuGeneralPageComponent),
        canActivate: [privateGuard()],
        loadChildren: () => import('./gestion-practicas/gestion-practicas.routes').then(r => r.routes) 
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
        path: 'home-academicos', component: AcademicoComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.ACADEMICO])]
    },
    {
        path: 'lista-academicos', component: InfoAcademicosComponent, 
        canActivate: [privateGuard, roleGuard([TipoUsuario.JEFE_CARRERA, TipoUsuario.JEFE_DEPARTAMENTO, TipoUsuario.ADMINISTRADOR, TipoUsuario.SECRETARIA_DEPARTAMENTO])]
    },
    {
        path: 'revision-informe/:idPractica', component: DetallesInformesComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.ACADEMICO])]
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
        path: 'cargar-alumnos-nomina', 
        loadComponent: () => import('./pages/roles/secretaria/cargar-usuarios-nomina/cargar-usuarios-nomina.component').then( c => c.CargarUsuariosNominaComponent),
        canActivate: [privateGuard()]
    },
    {
        path: 'crear-practica', component: NuevaPracticaComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.JEFE_CARRERA, TipoUsuario.JEFE_DEPARTAMENTO, TipoUsuario.ADMINISTRADOR, TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.SECRETARIA_DEPARTAMENTO])]
    },
    {
        path: 'home-secretaria',  component: HomeSecretariaComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.SECRETARIA_DEPARTAMENTO])]
    },
    {
        path: 'seguimiento-academicos', component: EstadoAcademicosComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.SECRETARIA_DEPARTAMENTO, TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.JEFE_CARRERA])]
    },
    {
        path: 'ver-practicas', component: PracticasSecretariaComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.SECRETARIA_DEPARTAMENTO, TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.JEFE_CARRERA, TipoUsuario.ADMINISTRADOR])]
    },
    {
        path: 'home-jefe-alumno', component: HomeJefeEmpleadorComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.JEFE_EMPLEADOR])]
    },
    {
        path: 'jefe_alumno/formulario_primer_practica/:idInforme', component: InformePrimeraPracticaComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.JEFE_EMPLEADOR])]
    },
    {
        path: 'agradecimientos', component: FinInformeJefeEmpleadorComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.JEFE_EMPLEADOR])]
    },
    {
        path: 'home-alumno', component: HomeAlumnoComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.ALUMNO_PRACTICA])]
    },
    {
        path: 'agradecimientos-alumno', component: FinInformeAlumnoComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.ALUMNO_PRACTICA])]
    },
    {
        path: 'estado-practica/:idAlumno', component: EstadoPracticaComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.ALUMNO_PRACTICA])]
    },
    {
        path: 'informe-practica-alumno/:idAlumno/:idPractica/:idInforme', component: InformePrimeraPracticaAlumnoComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.ALUMNO_PRACTICA]), practicasGuard]
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

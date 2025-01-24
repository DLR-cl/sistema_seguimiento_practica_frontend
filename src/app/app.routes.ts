import { Routes } from '@angular/router';
import { HomeComponent } from './pages/general/home/home.component';
import { privateGuard, publicGuard } from './shared/guards/auth.guard';
import { UserLoginComponent } from './users/features/user-login/user-login.component';
import { HomeAdministracionComponent } from './roles/jefe_compartido/home/home-administracion.component';
import { NuevaPracticaComponent } from './roles/jefe_compartido/nueva-practica/nueva-practica.component';
import { PreguntasInformeComponent } from './roles/jefe_compartido/preguntas-informe/preguntas-informe.component';
import { SolicitarPracticanteComponent } from './pages/general/solicitar-practicante/solicitar-practicante.component';
import { HomeSecretariaComponent } from './roles/secretaria/home-secretaria/home-secretaria.component';
import { roleGuard } from './shared/guards/roleUsers.guard';
import { PracticasSecretariaComponent } from './roles/secretaria/practicas-secretaria/practicas-secretaria.component';
import { HomeJefeEmpleadorComponent } from './roles/jefe_empleador/components/home-jefe-empleador/home-jefe-empleador.component';
import { InformePrimeraPracticaComponent } from './roles/jefe_empleador/informe-primera-practica/informe-primera-practica.component';
import { FinInformeJefeEmpleadorComponent } from './roles/jefe_empleador/components/fin-informe-jefe-empleador/fin-informe-jefe-empleador.component';
import { HomeAlumnoComponent } from './roles/alumno_practica/home-alumno/home-alumno.component';
import { FinInformeAlumnoComponent } from './roles/alumno_practica/components/fin-informe-alumno/fin-informe-alumno.component';
import { EstadoPracticaComponent } from './roles/alumno_practica/estado-practica/estado-practica.component';
import { InformePrimeraPracticaAlumnoComponent } from './roles/alumno_practica/informe-primera-practica/informe-primera-practica.component';
import { NotFoundComponent } from './pages/general/not-found/not-found.component';
import { TipoUsuario } from './enum/enumerables.enum';
import { InfoAcademicosComponent } from './roles/jefe_compartido/pages/info-academicos/info-academicos.component';
import { practicasGuard } from './shared/guards/practicas.guard';
import { AcademicoComponent } from './roles/academico/academico.component';
import { ChangePasswordComponent } from './pages/general/change-password/change-password.component';
import { DetallesInformesComponent } from './roles/academico/components/detalles-informes/detalles-informes.component';
import { CargarUsuariosNominaComponent } from './roles/secretaria/cargar-usuarios-nomina/cargar-usuarios-nomina.component';
import { EstadoAcademicosComponent } from './roles/secretaria/estado-academicos/estado-academicos.component';
import { ResultadosPracticaComponent } from './roles/jefe_compartido/pages/resultados-practica/resultados-practica.component';
import { PdfgeneratorComponent } from './shared/pdfgenerator/pdfgenerator.component';
import { GestionarUsuariosComponent } from './roles/jefe_compartido/gestionar-usuarios/gestionar-usuarios.component';
import { InformesComponent } from './roles/jefe_compartido/informes/informes.component';


export const routes: Routes = [
    {
        path: '', component: HomeComponent,
        canActivate: [publicGuard()]
    },
    {
        path:'change-password', loadComponent: () => import('./pages/general/change-password/change-password.component').then(
            (m) => m.ChangePasswordComponent
        )
    },
    {
        path: 'login', component: UserLoginComponent,
        canActivate: [publicGuard()]
    },
    {
        path: 'home-administracion', component: HomeAdministracionComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.JEFE_DEPARTAMENTO, TipoUsuario.JEFE_CARRERA, TipoUsuario.ADMINISTRADOR])]
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
        path: 'home', component: HomeComponent,
        canActivate: [publicGuard()]
    },
    {
        path: 'cargar-alumnos-nomina', component: CargarUsuariosNominaComponent,
        canActivate: [privateGuard()]
    },
    {
        path: 'crear-practica', component: NuevaPracticaComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.JEFE_CARRERA, TipoUsuario.JEFE_DEPARTAMENTO, TipoUsuario.ADMINISTRADOR, TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.SECRETARIA_DEPARTAMENTO])]
    },
    {
        path: 'solicitar-practicante', component: SolicitarPracticanteComponent,
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

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
import { VerInformesPendientesComponent } from './roles/jefe_empleador/components/ver-informes-pendientes/ver-informes-pendientes.component';
import { InformePrimeraPracticaComponent } from './roles/jefe_empleador/informe-primera-practica/informe-primera-practica.component';
import { VerDatosJefeComponent } from './roles/jefe_empleador/components/ver-datos-jefe/ver-datos-jefe.component';
import { FinInformeJefeEmpleadorComponent } from './roles/jefe_empleador/components/fin-informe-jefe-empleador/fin-informe-jefe-empleador.component';
import { HomeAlumnoComponent } from './roles/alumno_practica/home-alumno/home-alumno.component';
import { FinInformeAlumnoComponent } from './roles/alumno_practica/components/fin-informe-alumno/fin-informe-alumno.component';
import { EstadoPracticaComponent } from './roles/alumno_practica/estado-practica/estado-practica.component';
import { InformePrimeraPracticaAlumnoComponent } from './roles/alumno_practica/informe-primera-practica/informe-primera-practica.component';
import { NotFoundComponent } from './pages/general/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent,
        canActivate: [publicGuard()]
    },
    {
        path: 'login', component: UserLoginComponent,
        canActivate: [publicGuard()]
    },
    {
        path: 'home-administracion', component: HomeAdministracionComponent,
        // canActivate: [privateGuard, roleGuard([TipoUsuario.jefe_departamento, TipoUsuario.jefe_carrera])]
    },
    {
        path: 'nueva-practica', component: NuevaPracticaComponent,
        // canActivate: [privateGuard, roleGuard([TipoUsuario.jefe_departamento, TipoUsuario.jefe_carrera])]

    },
    {
        path: 'preguntas/:tipo', component: PreguntasInformeComponent,
        // canActivate: [privateGuard, roleGuard([TipoUsuario.jefe_departamento, TipoUsuario.jefe_carrera])]

    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'solicitar-practicante', component: SolicitarPracticanteComponent,
    },
    {
        path: 'home-secretaria',  component: HomeSecretariaComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.SECRETARIA])]
    },
    {
        path: 'ver-practicas-secretaria', component: PracticasSecretariaComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.SECRETARIA])]
    },
    {
        path: 'home-jefe-alumno', component: HomeJefeEmpleadorComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.JEFE_EMPLEADOR])]
    },
    {
        path: 'ver-informes-jefe', component: VerInformesPendientesComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.JEFE_EMPLEADOR])]
    },
    {
        path: 'jefe_alumno/formulario_primer_practica', component: InformePrimeraPracticaComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.JEFE_EMPLEADOR])]
    },
    {
        path: 'ver-datos-jefe', component: VerDatosJefeComponent,
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
        path: 'estado-practica', component: EstadoPracticaComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.ALUMNO_PRACTICA])]
    },
    {
        path: 'informe-practica-alumno/:idAlumno/:idPractica', component: InformePrimeraPracticaAlumnoComponent,
        canActivate: [privateGuard, roleGuard([TipoUsuario.ALUMNO_PRACTICA])]
    },
    {
        path: '**', component: NotFoundComponent
    }
];

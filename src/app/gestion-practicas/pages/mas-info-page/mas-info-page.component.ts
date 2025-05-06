import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';
import { TipoUsuario } from '../../../enum/enumerables.enum';

@Component({
  selector: 'app-mas-info-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mas-info-page.component.html',
  styleUrl: './mas-info-page.component.css'
})
export class MasInfoPageComponent implements OnInit {
  private readonly authStateService = inject(AuthStateService);
  userRole: TipoUsuario | null = null;

  ngOnInit() {
    this.userRole = this.authStateService.getRole();
  }

  getRoleFeatures() {
    switch(this.userRole) {
      case TipoUsuario.ALUMNO_PRACTICA:
        return [
          {
            title: 'Gestión de Prácticas',
            description: 'Visualiza y gestiona tus prácticas profesionales, incluyendo el estado actual y el progreso.',
            icon: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z'
          },
          {
            title: 'Informes y Documentación',
            description: 'Sube y gestiona tus informes de práctica, manteniendo un registro organizado de tu progreso.',
            icon: 'M2 3h20M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3m7 21 5-5 5 5'
          },
          {
            title: 'Seguimiento de Evaluaciones',
            description: 'Accede a las evaluaciones y retroalimentación de tus supervisores y académicos.',
            icon: 'm2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8'
          }
        ];
      case TipoUsuario.ADMINISTRADOR:
        return [
          {
            title: 'Gestión de Usuarios',
            description: 'Administra usuarios, roles y permisos del sistema de manera centralizada.',
            icon: 'M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2'
          },
          {
            title: 'Reportes y Estadísticas',
            description: 'Genera reportes detallados y visualiza estadísticas del sistema.',
            icon: 'M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z'
          },
          {
            title: 'Configuración del Sistema',
            description: 'Configura parámetros globales y gestiona la configuración del sistema.',
            icon: 'M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z'
          }
        ];
      case TipoUsuario.JEFE_EMPLEADOR:
        return [
          {
            title: 'Evaluación de Practicantes',
            description: 'Evalúa el desempeño de los practicantes y proporciona retroalimentación.',
            icon: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z'
          },
          {
            title: 'Seguimiento de Prácticas',
            description: 'Monitorea el progreso de las prácticas y el desarrollo de los practicantes.',
            icon: 'M2 3h20M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3m7 21 5-5 5 5'
          },
          {
            title: 'Comunicación con Académicos',
            description: 'Mantén una comunicación efectiva con los académicos supervisores.',
            icon: 'm2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8'
          }
        ];
      case TipoUsuario.JEFE_CARRERA:
      case TipoUsuario.JEFE_DEPARTAMENTO:
        return [
          {
            title: 'Supervisión de Prácticas',
            description: 'Supervisa y gestiona todas las prácticas profesionales de la carrera.',
            icon: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z'
          },
          {
            title: 'Gestión de Académicos',
            description: 'Administra y coordina el trabajo de los académicos supervisores.',
            icon: 'M2 3h20M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3m7 21 5-5 5 5'
          },
          {
            title: 'Reportes y Análisis',
            description: 'Genera reportes detallados sobre el desempeño de las prácticas.',
            icon: 'm2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8'
          }
        ];
      case TipoUsuario.SECRETARIA_CARRERA:
      case TipoUsuario.SECRETARIA_DEPARTAMENTO:
        return [
          {
            title: 'Registro de Estudiantes',
            description: 'Gestiona el registro de estudiantes y sus prácticas profesionales.',
            icon: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z'
          },
          {
            title: 'Asignación de Académicos',
            description: 'Asigna académicos supervisores a las prácticas profesionales.',
            icon: 'M2 3h20M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3m7 21 5-5 5 5'
          },
          {
            title: 'Reportes Semanales',
            description: 'Genera y gestiona reportes semanales del estado de las prácticas.',
            icon: 'm2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8'
          }
        ];
      case TipoUsuario.ACADEMICO:
        return [
          {
            title: 'Supervisión de Prácticas',
            description: 'Supervisa y evalúa las prácticas profesionales de los estudiantes.',
            icon: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z'
          },
          {
            title: 'Evaluación de Informes',
            description: 'Revisa y evalúa los informes presentados por los estudiantes.',
            icon: 'M2 3h20M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3m7 21 5-5 5 5'
          },
          {
            title: 'Retroalimentación',
            description: 'Proporciona retroalimentación detallada a los estudiantes sobre su desempeño.',
            icon: 'm2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8'
          }
        ];
      default:
        return [];
    }
  }
}

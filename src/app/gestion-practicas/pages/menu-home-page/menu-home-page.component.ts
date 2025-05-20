import { Component, inject, OnInit, signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { trigger, transition, style, animate } from '@angular/animations';
import { TipoUsuario } from '../../../enum/enumerables.enum';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
//TODO: Mover a shared.
@Component({
  selector: 'app-menu-home-page',
  standalone: true,
  imports: [CarouselModule, RouterLink],
  templateUrl: './menu-home-page.component.html',
  styleUrl: './menu-home-page.component.css',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }), // Estado inicial
        animate('2s ease-in-out', style({ opacity: 1 })), // Transición hacia visible
      ]),
      transition(':leave', [
        animate('2s ease-in-out', style({ opacity: 0 })), // Transición hacia invisible
      ]),
    ]),
  ],
})
export class MenuHomePageComponent implements OnInit {

  private usuarioService = inject(AuthStateService);
  private authService = inject(AuthService);
  userRole = signal<TipoUsuario | null>(null);
  private router = inject(Router);

  images = signal([
    'images/departamento/imagen-departamento-vista-arriba.webp',
    'departamento_dici.png',
  ]);

  currentIndex = signal<number>(0); // Índice de la diapositiva actual
  autoPlayInterval: any; // Para manejar el intervalo de auto-play

  ngOnInit(): void {

    setInterval(() => {
      this.currentIndex.update((index) => (index + 1) % this.images().length);
    }, 4000); // Cambia cada 3 segundos
    this.obtenerDatosUsuario();
  }

  obtenerDatosUsuario() {
    this.userRole.set(this.usuarioService.getRole())
  }

  obtenerMensajeBienvenida(): string {
    switch(this.userRole()) {
      case TipoUsuario.ALUMNO_PRACTICA:
        return 'Bienvenido/a al sistema de seguimiento de prácticas de la carrera de Ingeniería Civil Industrial. Aquí podrás visualizar tus prácticas, ver tu progreso y subir tus informes.';
      case TipoUsuario.ADMINISTRADOR:
        return 'Bienvenido/a al sistema de seguimiento de prácticas. Podrás gestionar las prácticas profesionales, generar reportes detallados, gestionar usuarios y recuperar contraseñas.';
      case TipoUsuario.JEFE_EMPLEADOR:
        return 'Bienvenido/a al sistema de seguimiento de prácticas. Este sistema te permitirá evaluar el desempeño de los practicantes asociados a tu cuenta.';
      case TipoUsuario.JEFE_CARRERA: 
        return 'Bienvenido/a al sistema de seguimiento de prácticas. Este sistema te permitirá visualizar el estado de las prácticas y del desempeño de los académicos.';
      case TipoUsuario.SECRETARIA_CARRERA:
        return 'Bienvenida/o al sistema de seguimiento de prácticas. Podrás registrar nuevos estudiantes según la nomina de matricula, gestionar prácticas y asignar académicos a las mismas como también descargar reportes semanales de los resultados de las prácticas.';
      case TipoUsuario.SECRETARIA_DEPARTAMENTO:
        return 'Bienvenido/a al sistema de seguimiento de prácticas. Este sistema te permitirá visualizar el estado de las prácticas y del desempeño de los académicos.';
      default:
        return 'Bienvenido';
    }
  }

  goToHomeByRol() {
    try {
      const role = this.userRole();
      if (!role) {
        console.error('No se pudo determinar el rol del usuario');
        return;
      }

      const path = this.authService.getRedirectUrlByRole(role);
      if (!path) {
        console.error('No se encontró una ruta válida para el rol:', role);
        return;
      }

      // Asegurarse de que la ruta comience con 'app/'
      const fullPath = path.startsWith('app/') ? path : `app/${path}`;
      
      this.router.navigate([fullPath]).then(success => {
        if (!success) {
          console.error('Error al navegar a:', fullPath);
        }
      }).catch(error => {
        console.error('Error en la navegación:', error);
      });
    } catch (error) {
      console.error('Error en goToHomeByRol:', error);
    }
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../../data-access/auth-state.service';
import { MenuOption } from '../../interface/menu-options.interface';
import { TipoUsuario } from '../../../enum/enumerables.enum';
import { Router, RouterLink } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  showMenu = false; // Controla las transiciones
  showMenuMob = signal(false);
  showDropdown = false; // Controla el menú desplegable "Más"
  authService = inject(AuthService);
  authStateService = inject(AuthStateService);
  usuarioRole?: string | null;
  router = inject(Router);
  idUser = this.authStateService.getData()?.id_usuario;
  // menu que redigire a cada usuario a su 
  menuItems = signal<MenuOption[]>([]);

  filteredMenu: MenuOption[] = [];
  mainMenu: MenuOption[] = [];
  dropdownMenu: MenuOption[] = [];
  activePath: string = '';

  ngOnInit(): void {
    this.usuarioRole = this.authStateService.getRole();
    this.idUser = this.authStateService.getData()?.id_usuario;
    console.log(this.idUser);

    this.menuItems = signal<MenuOption[]>([
      { 
        label: 'Reportes',
        path: '/app/administrador/reportes',
        roles: [TipoUsuario.ADMINISTRADOR]
      },
      {
        label: 'Reportes Administrativos',
        path: '/app/jefe-carrera/reportes-administrativos',
        roles: [TipoUsuario.JEFE_CARRERA]
      },
      {
        label: 'Reportes Administrativos',
        path: '/app/jefe-departamento/reportes',
        roles: [TipoUsuario.JEFE_DEPARTAMENTO]
      },
      {
        label: 'Lista Académicos',
        path: '/app/jefe-departamento/lista-academicos',
        roles: [TipoUsuario.JEFE_DEPARTAMENTO]
      },
      {
        label: 'Crear Práctica',
        path: '/app/jefe-carrera/crear-practica',
        roles: [TipoUsuario.JEFE_CARRERA]
      },
      {
        label: 'Ver Académicos',
        path: '/app/jefe-carrera/lista-academicos',
        roles: [TipoUsuario.JEFE_CARRERA]
      },
      {
        label: 'Informes Evaluativos',
        path: '/app/administrador/informes',
        roles: [TipoUsuario.ADMINISTRADOR]
      },
      {
        label: 'Crear Práctica',
        path: '/app/administrador/crear-practica',
        roles: [TipoUsuario.ADMINISTRADOR]
      },
      {
        label: 'Ver Prácticas',
        path: '/app/administrador/practicas',
        roles: [TipoUsuario.ADMINISTRADOR]
      },
      {
        label: 'Gestionar usuarios',
        path: '/app/administrador/gestionar-usuarios',
        roles: [TipoUsuario.ADMINISTRADOR]
      },
      {
        label: 'Académicos',
        path: '/app/administrador/academicos',
        roles: [TipoUsuario.ADMINISTRADOR]
      },
      {
        label: 'Crear Práctica',
        path: '/app/secretaria/crear-practica',
        roles: [TipoUsuario.SECRETARIA_CARRERA]
      },
      {
        label: 'Ver Prácticas',
        path: '/app/secretaria/ver-practicas',
        roles: [TipoUsuario.SECRETARIA_CARRERA]
      },
      {
        label: 'Cargar Alumnos',
        path: '/app/secretaria/cargar-alumnos-nomina',
        roles: [TipoUsuario.SECRETARIA_CARRERA]
      },
      {
        label: 'Generar Reportes',
        path: '/app/secretaria/reportes',
        roles: [TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.SECRETARIA_DEPARTAMENTO]
      },
      {
        label: 'Lista Académicos',
        path: '/app/secretaria/lista-academicos',
        roles: [TipoUsuario.SECRETARIA_CARRERA]
      },
      {
        label: 'Estado de Académicos',
        path: '/app/secretaria/seguimiento-academicos',
        roles: [TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.SECRETARIA_DEPARTAMENTO]
      },
      {
        label: 'Estadísticas',
        path: '/app/academico/estadisticas',
        roles: [TipoUsuario.ACADEMICO]
      },
      {
        label: 'Estado Práctica',
        path: '/app/alumno/estado-practica/' + this.idUser,
        roles: [TipoUsuario.ALUMNO_PRACTICA]
      }
    ]);
    this.filterMenuByRole();
    this.router.events.subscribe(() => {
      this.activePath = this.router.url.replace(/^\//, '');
    });
    this.activePath = this.router.url.replace(/^\//, '');
  }

  filterMenuByRole() {
    if (!this.usuarioRole) {
      this.filteredMenu = [];
      this.mainMenu = [];
      this.dropdownMenu = [];
      return;
    }
    this.filteredMenu = this.menuItems().filter(option => option.roles.includes(this.usuarioRole as any));
    if (this.filteredMenu.length > 4) {
      this.mainMenu = this.filteredMenu.slice(0, 3);
      this.dropdownMenu = this.filteredMenu.slice(3);
    } else {
      this.mainMenu = this.filteredMenu;
      this.dropdownMenu = [];
    }
  }

  isActive(path: string): boolean {
    // Considera la ruta activa si coincide exactamente o si la ruta activa empieza con el path del menú
    return this.activePath === path || this.activePath.startsWith(path + '/');
  }

  logout() {
    this.authService.logout();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  toggleMenuMob() { 
    this.showMenuMob.update(c => !c);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown() {
    this.showDropdown = false;
  }

  // Agregar listener para cerrar el dropdown cuando se hace clic fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.closeDropdown();
    }
  }

  getHomeRoute(): string {
    // Actualizado para incluir el prefijo 'app/'
    switch (this.usuarioRole) {
      case 'ADMINISTRADOR':
        return '/app/administrador';
      case 'JEFE_CARRERA':
        return '/app/jefe-carrera';
      case 'JEFE_DEPARTAMENTO':
        return '/app/jefe-departamento';
      case 'SECRETARIA_CARRERA':
        return '/app/secretaria';
      case 'SECRETARIA_DEPARTAMENTO':
        return '/app/secretaria';
      case 'JEFE_EMPLEADOR':
        return '/app/supervisor';
      case 'ACADEMICO':
        return '/app/academico';
      case 'ALUMNO_PRACTICA':
        return '/app/alumno';
      default:
        return '/public';
    }
  }
}

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
  menuItems = signal<MenuOption[]>([
    { 
      label: 'Resultados de Practica',
      path: '/resultados-practica',
      roles: [TipoUsuario.ADMINISTRADOR, TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.JEFE_CARRERA, TipoUsuario.JEFE_DEPARTAMENTO, TipoUsuario.ACADEMICO, TipoUsuario.SECRETARIA_DEPARTAMENTO]
    },
    {
      label: 'Informes Evaluativos',
      path: '/informes',
      roles: [TipoUsuario.ADMINISTRADOR]
    },
    {
      label: 'Crear Práctica',
      path: '/crear-practica',
      roles: [TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.ADMINISTRADOR, TipoUsuario.JEFE_CARRERA]
    },
    {
      label: 'Ver Prácticas',
      path: '/ver-practicas',
      roles: [TipoUsuario.JEFE_CARRERA, TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.ADMINISTRADOR]
    },
    {
      label: 'Gestionar usuarios',
      path: '/gestionar-usuarios',
      roles: [TipoUsuario.ADMINISTRADOR]
    },
    {
      label: 'Académicos',
      path: '/lista-academicos',
      roles: [TipoUsuario.ADMINISTRADOR, TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.JEFE_CARRERA, TipoUsuario.JEFE_DEPARTAMENTO]
    },
    {
      label: 'Resultados de Práctica',
      path: '/resultados-practica',
      roles: [TipoUsuario.ACADEMICO]
    },
    {
      label: 'Estado de Académicos',
      path: '/seguimiento-academicos',
      roles: [TipoUsuario.SECRETARIA_CARRERA]
    },
    {
      label: 'Estado Práctica',
      path: 'estado-practica/' + this.idUser,
      roles: [TipoUsuario.ALUMNO_PRACTICA]
    }
  ]);

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
        label: 'Resultados de Practica',
        path: '/resultados-practica',
        roles: [TipoUsuario.ADMINISTRADOR, TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.JEFE_CARRERA, TipoUsuario.JEFE_DEPARTAMENTO, TipoUsuario.SECRETARIA_DEPARTAMENTO]
      },
      {
        label: 'Informes Evaluativos',
        path: '/informes',
        roles: [TipoUsuario.ADMINISTRADOR]
      },
      {
        label: 'Crear Práctica',
        path: '/crear-practica',
        roles: [TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.ADMINISTRADOR, TipoUsuario.JEFE_CARRERA]
      },
      {
        label: 'Ver Prácticas',
        path: '/ver-practicas',
        roles: [TipoUsuario.JEFE_CARRERA, TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.ADMINISTRADOR]
      },
      {
        label: 'Gestionar usuarios',
        path: '/gestionar-usuarios',
        roles: [TipoUsuario.ADMINISTRADOR]
      },
      {
        label: 'Académicos',
        path: '/lista-academicos',
        roles: [TipoUsuario.ADMINISTRADOR, TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.JEFE_CARRERA, TipoUsuario.JEFE_DEPARTAMENTO]
      },
      {
        label: 'Estadísticas',
        path: '/academico/estadisticas',
        roles: [TipoUsuario.ACADEMICO]
      },
      {
        label: 'Estado de Académicos',
        path: '/seguimiento-academicos',
        roles: [TipoUsuario.SECRETARIA_CARRERA]
      },
      {
        label: 'Estado Práctica',
        path: '/alumno/estado-practica/' + this.idUser,
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
    // Puedes personalizar la lógica según los roles
    switch (this.usuarioRole) {
      case 'ADMINISTRADOR':
        return '/home-administracion';
      case 'JEFE_CARRERA':
      case 'JEFE_DEPARTAMENTO':
        return '/dashboard';
      case 'SECRETARIA_CARRERA':
      case 'SECRETARIA_DEPARTAMENTO':
        return '/home-secretaria';
      case 'ACADEMICO':
        return '/academico';
      case 'ALUMNO_PRACTICA':
        return '/estado-practica';
      default:
        return '/';
    }
  }
}

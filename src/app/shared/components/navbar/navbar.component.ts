import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../../data-access/auth-state.service';
import { MenuItem } from 'primeng/api';
import { MenuOption } from '../../interface/menu-options.interface';
import { TipoUsuario } from '../../../enum/enumerables.enum';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  showMenu = false; // Controla las transiciones
  showMenuMob = signal(false);
  authService = inject(AuthService);
  authStateService = inject(AuthStateService);
  usuarioRole?: string | null;


  // menu que redigire a cada usuario a su 
  menuItems = signal<MenuOption[]>([
    { 
      label: 'Resultados de Practica',
      path: 'resultados-practica',
      roles: [TipoUsuario.ADMINISTRADOR, TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.JEFE_CARRERA, TipoUsuario.JEFE_DEPARTAMENTO, TipoUsuario.ACADEMICO, TipoUsuario.SECRETARIA_DEPARTAMENTO]
    },
    {
      label: 'Informes Evaluativos',
      path: 'informes',
      roles: [TipoUsuario.ADMINISTRADOR]
    },
    {
      label: 'Crear Práctica',
      path: 'crear-practica',
      roles: [TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.ADMINISTRADOR, TipoUsuario.JEFE_CARRERA]
    },
    {
      label: 'Ver Prácticas',
      path: 'ver-practicas',
      roles: [TipoUsuario.JEFE_CARRERA, TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.ADMINISTRADOR]
    },
    {
      label: 'Gestionar usuarios',
      path: 'gestionar-usuarios',
      roles: [TipoUsuario.ADMINISTRADOR]
    },
    {
      label: 'Académicos',
      path: 'lista-academicos',
      roles: [TipoUsuario.ADMINISTRADOR, TipoUsuario.SECRETARIA_CARRERA, TipoUsuario.JEFE_CARRERA, TipoUsuario.JEFE_DEPARTAMENTO]
    },
    {
      label: 'Resultados de Práctica',
      path: 'resultados-practica',
      roles: [TipoUsuario.ACADEMICO]
    },
    {
      label: 'Estado de Académicos',
      path: 'seguimiento-academicos',
      roles: [TipoUsuario.SECRETARIA_CARRERA]
    },
    {
      label: 'Estado Práctica',
      path: 'estado-practica/',
      roles: [TipoUsuario.ALUMNO_PRACTICA]
    }
  ])


  ngOnInit(): void {
    this.usuarioRole = this.authStateService.getRole();
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
}

import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';
import { PayloadInterface } from '../../../shared/interface/payload.interface';
import { TipoUsuario } from '../../../enum/enumerables.enum';
import { AuthService } from '../../../auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private readonly _dataUserService = inject(AuthStateService);
  private readonly _authService = inject(AuthService);

  dataUser?: PayloadInterface | null;
  isMenuOpen = false; // Menú desplegable
  isSidebarOpen = false; // Menú lateral
  tipoJefeCarrera = TipoUsuario.JEFE_CARRERA;
  tipoJefeDepartamento = TipoUsuario.JEFE_DEPARTAMENTO;
  tipoAcademico = TipoUsuario.ACADEMICO;
  tipoSupervisor = TipoUsuario.JEFE_EMPLEADOR;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    this.dataUser = this._dataUserService.getData();
  }

  public closeSession() {
    this._authService.logout();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  goToInformeAlumno() {
    this.router.navigate(['preguntas/alumno']);
  }

  goToinformeConfidencial() {
    this.router.navigate(['preguntas/confidencial']);
  }

  goToInfoAcademicos() {
    this.router.navigate(['lista-academicos']);
  }
}

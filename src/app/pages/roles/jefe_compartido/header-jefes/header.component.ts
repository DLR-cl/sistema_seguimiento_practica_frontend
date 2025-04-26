import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from '../../../../shared/data-access/auth-state.service';
import { PayloadInterface } from '../../../../shared/interface/payload.interface';
import { TipoUsuario } from '../../../../enum/enumerables.enum';
import { AuthService } from '../../../../auth/services/auth.service';
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

  goToEstadoPractica(idUsuario:number){
    this.router.navigate(['estado-practica/'+idUsuario])
  }

  goToGestionar(){
    this.router.navigate(['gestionar-usuarios'])
  }

  goToPracticas() {
    this.router.navigate(['ver-practicas']);
  }

  goToInformes(){
    this.router.navigate(['informes'])
  }

  goToInfoAcademicos() {
    this.router.navigate(['lista-academicos']);
  }
  goToInfoSecretarias() {
    this.router.navigate(['lista-secretarias']);
  }

  goToCrearPractica(){
    this.router.navigate(['crear-practica']);
  }
  goToResultadosPractica(){
    this.router.navigate(['resultados-practica']);
  }
}

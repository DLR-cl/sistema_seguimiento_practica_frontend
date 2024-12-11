import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';
import { PayloadInterface } from '../../../shared/interface/payload.interface';
import { TipoUsuario } from '../../../enum/enumerables.enum';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  private readonly _dataUserService = inject(AuthStateService);
  private readonly _authService = inject(AuthService);
  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    this.getData();
  }
  dataUser?:PayloadInterface |null;
  isMenuOpen = false;
  isSubMenuOpen = false;
  tipoJefeCarrera = TipoUsuario.JEFE_CARRERA;
  tipoJefeDepartamento = TipoUsuario.JEFE_DEPARTAMENTO;

  private getData(){
    this.dataUser = this._dataUserService.getData();
  }

  public closeSession(){
    this._authService.logout();
  }
  // Método para mostrar la alerta
  alerta(mensaje: string) {
    alert(mensaje);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  goToInformeAlumno(){
    this.router.navigate(['preguntas/alumno'])
  }

  goToinformeConfidencial(){
    this.router.navigate(['preguntas/confidencial'])
  }
  public goToInfoAcademicos(){
    this.router.navigate(['lista-academicos'])
  }
}

import { Component, inject } from '@angular/core';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';
import { Router } from '@angular/router';
import { TipoUsuario } from '../../../enum/enumerables.enum';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

  private _autStateService = inject(AuthStateService);
  private _router = inject(Router);

  backToHome() {
    const role = this._autStateService.getRole();
    console.log('Rol obtenido en backToHome:', role);
    this.redirectUserByRol(role);
  }
  

  private redirectUserByRol(rol: TipoUsuario | null) {
    if (!rol) {
      console.warn('Rol no encontrado, redirigiendo al home genérico');
      this._router.navigate(['home']);
      return;
    }
  
    const session = this._autStateService.getSession();
    if (session) {
      switch (rol) {
        case TipoUsuario.JEFE_EMPLEADOR:
          this._router.navigate(['home-jefe-alumno']);
          break;
        case TipoUsuario.ALUMNO_PRACTICA:
          console.log("llevando al home-alumno")
          this._router.navigate(['home-alumno']);
          break;
        case TipoUsuario.JEFE_DEPARTAMENTO:
          this._router.navigate(['home-administracion']);
          break;
        case TipoUsuario.SECRETARIA_CARRERA:
          this._router.navigate(['home-secretaria']);
          break;
        case TipoUsuario.SECRETARIA_DEPARTAMENTO:
          this._router.navigate(['home-secretaria']);
          break;
        default:
          console.warn('Rol desconocido, redirigiendo al home genérico');
          this._router.navigate(['home']);
      }
    } else {
      console.warn('Sesión no encontrada, redirigiendo al home genérico');
      this._router.navigate(['home']);
    }
  }
  
}

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

  backToHome(){
    this.redirectUserByRol(this._autStateService.getRole())



  }

  private redirectUserByRol(rol: TipoUsuario | null){
    const session = this._autStateService.getSession();
    if(session){
      switch(rol){
        case TipoUsuario.JEFE_EMPLEADOR:
        this._router.navigate(['home-jefe-alumno']);
        break;
        case TipoUsuario.ALUMNO_PRACTICA:
          this._router.navigate(['home-alumno']);
        break;
        case TipoUsuario.JEFE_DEPARTAMENTO:
          this._router.navigate(['home-administracion']);
          break;
          case TipoUsuario.SECRETARIA:
            this._router.navigate(['home-secretaria']);
            break;
            default:
              this._router.navigate(['home']);
            }
    }else{
      this._router.navigate(['home']);
    }
  }
}

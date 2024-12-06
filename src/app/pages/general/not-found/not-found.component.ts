import { Component, inject } from '@angular/core';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';
import { Tipo_usuario } from '../../../enum/enumerables.enum';
import { Router } from '@angular/router';

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

  private redirectUserByRol(rol: Tipo_usuario | null){
    const session = this._autStateService.getSession();
    if(session){
      switch(rol){
        case Tipo_usuario.jefe_empleador:
        this._router.navigate(['home-jefe-alumno']);
        break;
        case Tipo_usuario.alumno_practica:
          this._router.navigate(['home-alumno']);
        break;
        case Tipo_usuario.jefe_departamento:
          this._router.navigate(['home-administracion']);
          break;
          case Tipo_usuario.secretaria:
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

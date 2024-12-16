import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import { enviroment } from '../../environment/environment';
import { RegisterDto } from '../dto/register.dto';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/data-access/storage.service';
import { AuthStateService } from '../../shared/data-access/auth-state.service';
import { TipoUsuario } from '../../enum/enumerables.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = '';
  private _http = inject(HttpClient);
  private _storage = inject(StorageService);
  private _authService = inject(AuthStateService);
  private _router = inject(Router);

  signUp(register: RegisterDto): Observable<any>{
    return this._http.post(`${enviroment.API_URL}/auth/register`, {register}).pipe(
      tap((response) => console.log(response))
    );
  }
  logIn(correo: string, password: string): Observable<any> {
    return this._http.post<any>(`${enviroment.API_URL}/auth/login`, { correo, password }).pipe(
      tap((response) => {
        console.log('Respuesta del login:', response); // Depuración
        this._storage.set('session', JSON.stringify(response)); // Almacena el token completo
        this.redirectUserByRol(); // Delegar redirección
      })
    );
  }
  

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token)
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  public redirectUserByRol() {
    const session = this._authService.getSession();
    if (session) {
      const userRole = this._authService.getRole();
      console.log('Redirigiendo usuario con rol:', userRole); // Depuración
  
      switch (userRole) {
        case TipoUsuario.JEFE_EMPLEADOR:
          this._router.navigate(['home-jefe-alumno']);
          break;
        case TipoUsuario.ALUMNO_PRACTICA:
          this._router.navigate(['home-alumno']);
          break;
        case TipoUsuario.JEFE_CARRERA:
          this._router.navigate(['home-administracion']);
          break;
        case TipoUsuario.SECRETARIA:
          this._router.navigate(['home-secretaria']);
          break;
        case TipoUsuario.ACADEMICO:
          this._router.navigate(['home-academicos']);
          break;
        default:
          console.warn('Rol desconocido, redirigiendo a home');
          this._router.navigate(['home']);
      }
    } else {
      console.warn('Sesión no encontrada, redirigiendo al login');
      this._router.navigate(['/login']);
    }
  }
  
  isAuthenticated(): boolean {
    const token = this.getToken();
    if(!token){
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000
    return Date.now() < exp;
  };

  // 1:24:59
  logout(): void{
    localStorage.removeItem(this.tokenKey);
    this._authService.signOut()
    this._router.navigate(['/login']);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { enviroment } from '../../environment/environment';
import { RegisterDto } from '../dto/register.dto';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/data-access/storage.service';
import { AuthStateService } from '../../shared/data-access/auth-state.service';
import { TipoUsuario } from '../../enum/enumerables.enum';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'accessToken'; // Clave para almacenar el token
  private decodedTokenSubject = new BehaviorSubject<any>(null); // Observa el token decodificado

  private _http = inject(HttpClient);
  private _storage = inject(StorageService);
  private _authService = inject(AuthStateService);
  private _router = inject(Router);

  constructor() {
    this.initializeToken(); // Inicializa el token al cargar el servicio
  }

  // Inicializa el token decodificado
  private initializeToken(): void {
    const token = this.getDecodedToken();
    this.decodedTokenSubject.next(token);
  }
  
  // Retorna el token decodificado como observable
  public getDecodedTokenObservable(): Observable<any> {
    return this.decodedTokenSubject.asObservable();
  }

  // Actualiza manualmente el token decodificado
  public refreshDecodedToken(): void {
    const token = this.getDecodedToken();
    this.decodedTokenSubject.next(token);
  }

  // Decodifica el token desde el almacenamiento
  public getDecodedToken(): any {
    // Obtiene la sesión ya parseada desde el almacenamiento local
    const session = this._storage.get<{ message: string; access_token: string; primerInicioSesion: boolean }>('session');
  
    if (!session || !session.access_token) {
      console.warn('La sesión no es válida o el token no está disponible');
      return null;
    }
  
    try {
      const token = session.access_token; // Obtiene el token directamente
  
      // Decodifica y retorna el token
      const decodedToken = jwt_decode.jwtDecode(token); // Usa jwt_decode directamente
      return decodedToken;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
  
  

  // Realiza el registro de usuario
  signUp(register: RegisterDto): Observable<any> {
    return this._http.post(`${enviroment.API_URL}/auth/register`, { register }).pipe(
      tap((response) => console.log('Registro exitoso:', response))
    );
  }

  logIn(correo: string, password: string): Observable<any> {
    return this._http.post<any>(`${enviroment.API_URL}/auth/login`, { correo, password }).pipe(
      tap((response) => {
  
        // Intenta guardar la sesión en el almacenamiento
        try {
          this._storage.set('session', response); // Guarda la respuesta directamente
        } catch (error) {
          console.error('Error al guardar la sesión en localStorage:', error);
        }
  
        // Actualiza el token decodificado y redirige
        this.refreshDecodedToken();
        //this.redirectUserByRol();
      })
    );
  }
  
  // Redirige al usuario según su rol
  public getRedirectUrlByRole(role: TipoUsuario | null): string {
    switch(role) {
      case TipoUsuario.JEFE_EMPLEADOR:
        return '/home-jefe-alumno';
      case TipoUsuario.ALUMNO_PRACTICA:
        return '/alumno';
      case TipoUsuario.JEFE_CARRERA:
      case TipoUsuario.JEFE_DEPARTAMENTO:
      case TipoUsuario.ADMINISTRADOR:
        return '/home-administracion';
      case TipoUsuario.SECRETARIA_CARRERA:
      case TipoUsuario.SECRETARIA_DEPARTAMENTO:
        return '/home-secretaria';
      case TipoUsuario.ACADEMICO:
        return '/home-academicos';
      default:
        return '/home';
    }
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  // Elimina la sesión del usuario
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this._storage.remove('session');
    this.decodedTokenSubject.next(null); // Resetea el token decodificado
    this._authService.signOut();
    this._router.navigate(['/home']);
  }

  // Almacena el token en el almacenamiento local
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Obtiene el token desde el almacenamiento local
  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public waitForToken(): Promise<any> {
    return new Promise((resolve) => {
      const subscription = this.decodedTokenSubject.subscribe((token) => {
        if (token) {
          resolve(token);
          subscription.unsubscribe();
        }
      });
    });
  }
  public isTokenExpired(): boolean {
    const session = this._storage.get<{ access_token: string }>('session');
    if (!session || !session.access_token) {
      console.warn('No se encontró un token en la sesión');
      return true; // Consideramos que está vencido si no hay token
    }
  
    try {
      const decodedToken: any = jwt_decode.jwtDecode(session.access_token);
      const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
      console.log('Tiempo actual:', currentTime, 'Expiración del token:', decodedToken.exp);
      return decodedToken.exp < currentTime; // Retorna true si está vencido
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return true; // Si no se puede decodificar, consideramos que está vencido
    }
  }
}

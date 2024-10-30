import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap} from 'rxjs';
import { enviroment } from '../../environment/environment';
import { RegisterDto } from '../dto/register.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = '';
  constructor(
    private readonly _http: HttpClient,
    private readonly router: Router
  ) { }

  signUp(register: RegisterDto): Observable<any>{
    return this._http.post(`${enviroment.API_URL}/auth/register`, {});
  }

  login(correo: string, password: string): Observable<any>{
    return this._http.post<any>(`${enviroment.API_URL}/auth/login`, {correo, password}).pipe(
      tap( response => {
        if(response.access_token){
          console.log(response.access_token);
        }
      }
      )
    );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token)
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
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
    this.router.navigate(['/login']);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';
import { Practicas, Secretaria } from '../dto/secretaria-data.dto';
import { enviroment } from '../../../environment/environment';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class DataSecretariaService {

  private readonly _http = inject(HttpClient);
  private readonly _authStateService = inject(AuthStateService);
  private secretariaSubject = new BehaviorSubject<Secretaria | null>(null);

  constructor(){
      this.loadData();
  }

  public getSecretaria(): 
    Observable<Secretaria> {
    const id_usuario = this.getData();
    return this._http.get<Secretaria>(`${enviroment.API_URL}/users/`+id_usuario)
      .pipe(
      map( (response: Secretaria) => {
          return response as Secretaria;
      })
    );
  }

    // obten el id del usuario
  private getData(): number | null{
    const data = this._authStateService.getData()
    if(data){
        return data.id_usuario;
    }
    return null;
  }

  public getDataSecretaria(): Observable<Secretaria | null>{
      return this.secretariaSubject.asObservable();
  }

  private loadData(): void {
      this.getSecretaria().subscribe(
          (data) => {
              this.secretariaSubject.next(data);
          },
          (error) => {
              console.log('Error al cargar los datos', error);
              this.secretariaSubject.next(null);
          }
      )
  }

  public getUserId(): number | null {
      let token = localStorage.getItem('session')
      if (token) {
          const decodedToken: any = jwtDecode(token); // Decodifica el token
          return decodedToken.id_usuario; // Devuelve solo el id_usuario
        }
      return null;
  }

  public getPractica() {
    return this._http.get<Practicas[]>(`${enviroment.API_URL}/practicas`)
    .pipe(
      map( (response) => {
          return response;
        }
      ),
      catchError((error) => {
        console.error('Error al obtener las prácticas');
        throw error;
      })
    )
  }
}

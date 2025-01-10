import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment/environment';
import { cambiarCorreo, usuario } from '../dto/usuarios.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient
  ){}

  public getUsuariosRol(rol:string) {
    return this.http.get<usuario[]>(`${enviroment.API_URL}/users/lista-rol/${rol}`);
  }

  public listadoAdministrador(){
    return this.http.get<any>(`${enviroment.API_URL}/users/administradores/obtener/lista`)
  }

  public cambiarCorreo(usuario: cambiarCorreo){
    return this.http.patch<any>(`${enviroment.API_URL}/users/cambiar-correo/administrador`, usuario)
  }

  public restablecerContraseña(idUsuario: number, rolUsuario: string){
    const params = new HttpParams()
    .set('id', idUsuario.toString())
    .set('rol_usuario', rolUsuario);

    return this.http.patch<any>(`${enviroment.API_URL}/users/reestablecer/contrasena`, {}, {params})
  }
  
}

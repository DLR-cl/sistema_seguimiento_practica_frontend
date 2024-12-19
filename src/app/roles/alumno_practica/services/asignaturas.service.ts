import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface AsignaturaBack{
  nombre: string,
  tipo_asignatura: string,
  semestre: number,
  codigo: string
}

export interface Semestre{
  nombre: string,
  asignaturas: {
    nombre: string,
    codigo: string,
    tipo: string,
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

  constructor(
    private http: HttpClient
  ) { }

  private url_asignaturas = 'http://localhost:3000/asignaturas'

  public obtenerAsignaturas(){
    return this.http.get<AsignaturaBack[]>(`${this.url_asignaturas}`)
  }

}

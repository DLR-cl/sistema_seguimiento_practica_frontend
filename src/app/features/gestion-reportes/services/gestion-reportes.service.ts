import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TipoPractica } from '../../../enum/enumerables.enum';
import { TIPO_PRACTICA } from '../../../roles/supervisor/interface/supervisor.types';

@Injectable({
  providedIn: 'root'
})
export class GestionReportesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';
  constructor() { }

  public obtenerReporteSemestral(tipo_practica: TipoPractica, fecha_in: string | Date, fecha_fin: string | Date) {

    const fechaInicioISO = fecha_in instanceof Date ? fecha_in.toISOString() : new Date(fecha_in).toISOString();
    const fechaFinISO = fecha_fin instanceof Date ? fecha_fin.toISOString() : new Date(fecha_fin).toISOString();

    const params = {
      practica: tipo_practica,
      fecha_in: fechaInicioISO, // Convertir a formato ISO
      fecha_fin: fechaFinISO,  // Convertir a formato ISO
    };

    return this.http.get(`${this.apiUrl}/practicas/reportes/generar/semestral`, {
      params,
      responseType: 'blob', // Asegurar que la respuesta se maneje como archivo
    });
  }

  public generarReporteConfidencial(fecha_in: string | Date, fecha_fin: string | Date,) {
    const fechaInicioISO = fecha_in instanceof Date ? fecha_in.toISOString() : new Date(fecha_in).toISOString();
    const fechaFinISO = fecha_fin instanceof Date ? fecha_fin.toISOString() : new Date(fecha_fin).toISOString();

    const params = {
      fecha_in: fechaInicioISO,
      fecha_fin: fechaFinISO,
      tipo_practica: TIPO_PRACTICA.PRACTICA_UNO,
    };

    return this.http.get(`${this.apiUrl}/reportes-practica/informe-confidencial`, {
      params,
      responseType: 'blob',
    });
  }
}
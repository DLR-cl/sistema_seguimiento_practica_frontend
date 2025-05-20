import { inject, Injectable } from '@angular/core';
import { TipoPractica } from '../../enum/enumerables.enum';
import { Observable } from 'rxjs';
import { enviroment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {


  private _http = inject(HttpClient)
  private path = enviroment.API_URL+'/reportes-practica'

  public generarReporteConfidencialPorPeriodo(fecha_ini: string, fecha_fin: string, tipoPractica: TipoPractica): Observable<Blob> {
    // Convertir las fechas a formato ISO para enviarlas como parámetros
    const params = {
        fechaInicio: fecha_ini,
      fechaFin: fecha_fin,
      tipoPractica: tipoPractica,
    };

      // Realizar la solicitud GET al endpoint
      return this._http.get(`${this.path}/informe-confidencial`, {
      params,
      responseType: 'blob', // Indicamos que la respuesta será un archivo binario
    });
  }

  public generarReportePracticaPorPeriodo(fecha_ini: string, fecha_fin: string, tipoPractica: TipoPractica): Observable<Blob> {
    const params = {
      fechaInicio: fecha_ini,
      fechaFin: fecha_fin,
      tipoPractica: tipoPractica,
    };

    return this._http.get(`${this.path}`, {
      params,
      responseType: 'blob', // Indicamos que la respuesta será un archivo binario
    });
  }
  
}

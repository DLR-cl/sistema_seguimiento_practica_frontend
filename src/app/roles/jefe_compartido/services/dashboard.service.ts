import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "../../../environment/environment";
import { map, Observable } from "rxjs";
import { AlumnosActivosPractica, AprobacionPracticas, CantidadAlumnosEnPractica, CantidadEmpresasPorTipo, detallePractica, estadisticasPractica, practicasMes } from "../dto/dashboard-practicas.dto";
import { Practicas } from "../../secretaria/dto/practicas.dto";
import { TipoPractica } from "../../../enum/enumerables.enum";
import { ConteoPorMes, ConteoPracticas } from "../../../shared/interface/reporte-practica.interface";


@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(
        private readonly _http: HttpClient
    ) { }

    public getCantidadEstudiantesEnPractica() {
        return this._http.get<CantidadAlumnosEnPractica>(`${enviroment.API_URL}/dashboard`).pipe(
            map(
                (response) => {
                    return response as CantidadAlumnosEnPractica
                }
            )
        )
    }

    public getEstadisticasPracticas() {
        return this._http.get<estadisticasPractica>(`${enviroment.API_URL}/dashboard/estadistica-practicas-dashboard-jefe-carrera`)
    }

    public getAprobacionPracticas() {
        return this._http.get<AprobacionPracticas>(`${enviroment.API_URL}/dashboard/aprobacion-practicas`)
    }

    public getAlumnosActivosPracticas() {
        return this._http.get<AlumnosActivosPractica[]>(`${enviroment.API_URL}/dashboard/alumnos-activos-practica`)
    }

    public getDetallesPracticas() {
        return this._http.get<detallePractica[]>(`${enviroment.API_URL}/dashboard/obtener-detalles-practica`)
    }

    public getPracticasMeses(periodo: number) {
        return this._http.get<practicasMes[]>(`${enviroment.API_URL}/dashboard/obtener-practicas-meses/${periodo}`)
    }

    public getCantidadEmpresasPorTipo() {
        return this._http.get<CantidadEmpresasPorTipo>(`${enviroment.API_URL}/dashboard/empresa/estadisticas/tipo-empresas`)
    }
    public obtenerPractica(idPractica: number) {
        return this._http.get<Practicas>(`${enviroment.API_URL}/practicas/${idPractica}`)
    }

    public obtenerReportesByYearyPractica(tipo_practica: TipoPractica, year: number, mes: string) {
        console.log("enviando practica: ", tipo_practica)
        const params = {
            tipoPractica: tipo_practica,
            anio: year,
            mes: mes,
        }
        return this._http.get(`${enviroment.API_URL}/practicas/reportes/obtener/listar/semanal`, {
            params
        });
    }

    public reportesArchivosExcelDescargar(ruta: string): void {
        const params = { ruta };

        this._http.get(`${enviroment.API_URL}/practicas/reportes/archivo/descargar`, {
            params,
            responseType: 'blob', // Configurar la respuesta como blob
        }).subscribe({
            next: (response) => {
                const url = window.URL.createObjectURL(response); // Crear una URL temporal para el archivo
                const link = document.createElement('a'); // Crear un elemento <a>
                link.href = url;
                link.download = ruta.split('/').pop() || 'archivo.xlsx'; // Obtener el nombre del archivo
                link.click(); // Disparar la descarga
                window.URL.revokeObjectURL(url); // Liberar memoria
            },
            error: (error) => {
                console.error('Error al descargar el archivo:', error);
            },
        });
    }

    public obtenerReporteSemestral(tipo_practica: TipoPractica, fecha_in: string, fecha_fin: string): void {
        const params = {
            practica: tipo_practica,
            fecha_in: new Date(fecha_in).toISOString(), // Convertir a Date y luego a cadena ISO
            fecha_fin: new Date(fecha_fin).toISOString(), // Convertir a Date y luego a cadena ISO
        };
    
        this._http.get(`${enviroment.API_URL}/practicas/reportes/generar/semestral`, {
            params,
            responseType: 'blob', // Asegurar que la respuesta se maneje como archivo
        }).subscribe({
            next: (response) => {
                const url = window.URL.createObjectURL(response); // Crear una URL temporal para el archivo
                const link = document.createElement('a'); // Crear un elemento <a>
                link.href = url;
                link.download = `reporte_semestral_${tipo_practica}_${fecha_in.split('T')[0]}_to_${fecha_fin.split('T')[0]}.xlsx`; // Nombre del archivo basado en fechas y tipo de práctica
                link.click(); // Disparar la descarga
                window.URL.revokeObjectURL(url); // Liberar memoria
            },
            error: (error) => {
                console.error('Error al descargar el archivo:', error);
            },
        });
    }

    generarReporteConfidencialPorPeriodo(fecha_ini: string, fecha_fin: string): Observable<Blob> {
        // Convertir las fechas a formato ISO para enviarlas como parámetros
        const params = {
          fecha_ini: fecha_ini,
          fecha_fin: fecha_fin,
        };
    
        // Realizar la solicitud GET al endpoint
        return this._http.get(`${enviroment.API_URL}/evaluacion-academica/reportes/generar/confidencial/practicas/periodo`, {
          params,
          responseType: 'blob', // Indicamos que la respuesta será un archivo binario
        });
      }

    obtenerDatosConteoPractica(id_academico: number){
        console.log(id_academico)
        const params = {
            id_academico: id_academico,
        }
        return this._http.get<ConteoPracticas>(`${enviroment.API_URL}/academicos/data/resultados-practica/conteo`, { params });
    }

    obtenerInformesPorMesPractica(id_academico: number){
        const params = {
            id_academico: id_academico,
        }
        return this._http.get<ConteoPorMes>(`${enviroment.API_URL}/academicos/data/resultados-practica/conteo/informes-practica`, { params });
    }

    
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "../../../../environment/environment";
import { map, Observable } from "rxjs";
import type { AlumnosActivosPractica, CantidadAlumnosEnPractica, CantidadEmpresasPorTipo, detallePractica, estadisticasPractica, practicasMes } from "../dto/dashboard-practicas.dto";
import type { PracticaAlumno } from "../../../../gestion-practicas/interfaces/practica-alumno.interface";
import { TipoPractica } from "../../../../enum/enumerables.enum";
import { ConteoPorMes, ConteoPracticas } from "../../../../shared/interface/reporte-practica.interface";
import { AprobacionPracticas } from "../../../../gestion-practicas/interfaces/estadistica-praactica.interface";


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
        return this._http.get<PracticaAlumno>(`${enviroment.API_URL}/practicas/${idPractica}`)
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

    // Reporte semestral de aprobados y reprobados
    public obtenerReporteSemestral(tipo_practica: TipoPractica, fecha_in: string | Date, fecha_fin: string | Date): void {
        // Asegúrate de que las fechas sean cadenas ISO
        const fechaInicioISO = fecha_in instanceof Date ? fecha_in.toISOString() : new Date(fecha_in).toISOString();
        const fechaFinISO = fecha_fin instanceof Date ? fecha_fin.toISOString() : new Date(fecha_fin).toISOString();
    
        const params = {
            practica: tipo_practica,
            fecha_in: fechaInicioISO, // Convertir a formato ISO
            fecha_fin: fechaFinISO,  // Convertir a formato ISO
        };
    
        this._http.get(`${enviroment.API_URL}/practicas/reportes/generar/semestral`, {
            params,
            responseType: 'blob', // Asegurar que la respuesta se maneje como archivo
        }).subscribe({
            next: (response) => {
                const url = window.URL.createObjectURL(response); // Crear una URL temporal para el archivo
                const link = document.createElement('a'); // Crear un elemento <a>
                link.href = url;
                // Dividir la cadena ISO para extraer solo la parte de la fecha
                const fechaInicioFormateada = fechaInicioISO.split('T')[0];
                const fechaFinFormateada = fechaFinISO.split('T')[0];
                link.download = `reporte_semestral_${tipo_practica}_${fechaInicioFormateada}_a_${fechaFinFormateada}.xlsx`; // Nombre del archivo basado en fechas y tipo de práctica
                link.click(); // Disparar la descarga
                window.URL.revokeObjectURL(url); // Liberar memoria
            },
            error: (error) => {
                console.error('Error al descargar el archivo:', error);
            },
        });
    }
    
 //TODO: Borrar luego de reemplazar las dependencias
    public generarReporteConfidencialPorPeriodo(fecha_ini: string, fecha_fin: string, tipoPractica: TipoPractica): Observable<Blob> {
        // Convertir las fechas a formato ISO para enviarlas como parámetros
        const params = {
            fechaInicio: fecha_ini,
          fechaFin: fecha_fin,
          tipoPractica: tipoPractica,
        };
    
        // Realizar la solicitud GET al endpoint
        return this._http.get(`${enviroment.API_URL}/reportes-practica/informe-confidencial`, {
          params,
          responseType: 'blob', // Indicamos que la respuesta será un archivo binario
        });
      }

    public obtenerDatosConteoPractica(id_academico: number){
        console.log(id_academico)
        const params = {
            id_academico: id_academico,
        }
        return this._http.get<ConteoPracticas>(`${enviroment.API_URL}/academicos/data/resultados-practica/conteo`, { params });
    }

    public obtenerInformesPorMesPractica(id_academico: number){
        const params = {
            id_academico: id_academico,
        }
        return this._http.get<ConteoPorMes>(`${enviroment.API_URL}/academicos/data/resultados-practica/conteo/informes-practica`, { params });
    }

    
}

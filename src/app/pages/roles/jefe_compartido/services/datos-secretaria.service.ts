import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { enviroment } from "../../../../environment/environment";
import { NuevaSecretaria, ResponseNueva, Secretaria } from "../dto/secretaria.dto";
import { TipoPractica } from "../../../../enum/enumerables.enum";

@Injectable({
    providedIn: 'root'
})
export class DatosSecretariaService {

    private readonly _http = inject(HttpClient);

    public getInfoSecretarias() {
        return this._http.get<Secretaria[]>(`${enviroment.API_URL}/users/lista-rol/SECRETARIA`);
    }

    public crearSecretaria(nuevaSecretaria: NuevaSecretaria) {
        return this._http.post<ResponseNueva>(`${enviroment.API_URL}/users`, nuevaSecretaria);
    }

    public getInfoSecretaria(id_secretaria: number){
        return this._http.get<Secretaria>(`${enviroment.API_URL}/users/${id_secretaria}`)
    }

    // recibo exceljs
    public obtenerReporteSemestralAcademico(tipo_practica: TipoPractica, fecha_in: string | Date, fecha_fin: string | Date): void {
        // Asegúrate de que las fechas sean cadenas ISO
        const fechaInicioISO = fecha_in instanceof Date ? fecha_in.toISOString() : new Date(fecha_in).toISOString();
        const fechaFinISO = fecha_fin instanceof Date ? fecha_fin.toISOString() : new Date(fecha_fin).toISOString();
    
        const params = {
            practica: tipo_practica,
            fecha_in: fechaInicioISO, // Convertir a formato ISO
            fecha_fin: fechaFinISO,  // Convertir a formato ISO
        };
    
        this._http.get(`${enviroment.API_URL}/practicas/reportes/generar/semestral_academico`, {
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

    public obtenerReporteAnualAcademicos(){
        
    }
}

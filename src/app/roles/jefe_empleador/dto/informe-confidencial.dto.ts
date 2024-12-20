export interface respuestaInformeConfidencial {
    id_informe: number;
    id_pregunta: number;
    respuesta_texto?: string;
    puntos?: number;
    nota?: number;
}

export interface DetallesInformes {
    id_supervisor:           number;
    tipo_practica:           string;
    id_alumno:               number;
    nombre_alumno:           string;
    estado_informe:          string;
    id_informe_confidencial: number;
    fecha_inicio:            Date;
    fecha_limite_entrega:    Date;
    dias_restantes:          number;
    id_practica:             number;
}

export interface ListaInformes{
    informes_data: DatosInforme[]
}
  
export interface DatosInforme{
    estado_entrega: boolean;
    id_practica: number;
    id_informe_confidencial: number;
    nombre_alumno: string;
    tipo_practica: string;   
}
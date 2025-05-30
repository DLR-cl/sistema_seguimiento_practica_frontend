export interface InfoInformes {
    nombre_alumno:   string;
    tipo_practica:   string;
    id_practica: number;
    estado_informe:  string;
    dias_para_revision:  BigInt;
    inicio_revision: Date;
    fin_revision:    Date;
    intentos: number;
    id_informe_evaluacion: number;
}

export interface CantidadInformesPendientes {
    cantidad_informes_alumno:         number;
    cantidad_informes_confidenciales: number;
}

export interface ResumenConteoInformes {
    revisados: number;
    porRevisar: number;
}
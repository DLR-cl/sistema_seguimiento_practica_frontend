export interface InfoInformes {
    nombre_alumno:   string;
    tipo_practica:   string;
    estado_informe:  string;
    dias_para_revision:  BigInt;
    inicio_revision: Date;
    fin_revision:    Date;
}

export interface CantidadInformesPendientes {
    cantidad_informes_alumno:         number;
    cantidad_informes_confidenciales: number;
}
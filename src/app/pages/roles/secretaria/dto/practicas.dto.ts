import { EstadoInforme } from "../../../../enum/enumerables.enum";
import { Alumno, JefeSupervisor } from "./usuarios.dto";





export interface InformeAlumno {
    id_informe:             number;
    id_practica:            number;
    id_alumno:              number;
    archivo:                string;
    archivo_correccion:     null;
    estado:                 string;
    id_academico:           number;
    fecha_inicio:           Date;
    intentos:               number;
    fecha_inicio_revision:  Date;
    fecha_termino_revision: Date;
    alumno:                 Alumno;
}


export interface InformeConfidencial {
    id_informe_confidencial:         number;
    horas_practicas_regulares:       number;
    horas_practicas_extraordinarias: number;
    total_horas:                     number;
    horas_semanales:                 number;
    horas_inasistencia:              number;
    nota_evaluacion:                 null;
    fecha_inicio:                    Date;
    fecha_envio:                     null;
    estado:                          EstadoInforme;
    fecha_inicio_revision:           Date;
    fecha_termino_revision:          Date;
    fecha_inicio_practica:           Date;
    fecha_fin_practica:              Date;
    fecha_real_revision:             null;
    id_supervisor:                   number;
    id_alumno_evaluado:              number;
    id_practica:                     number;
    id_academico:                    number;
    supervisor:                      JefeSupervisor;
}

export interface ExtensionDto{
    id_practica: number,
    fecha_fin_ext: Date
}
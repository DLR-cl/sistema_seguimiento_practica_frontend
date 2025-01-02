import { EstadoInforme, EstadoPractica } from "../../../enum/enumerables.enum";
import { Alumno, JefeSupervisor } from "./usuarios.dto";

export interface Practicas {
    id_practica:          number;
    tipo_practica:        string;
    estado:               EstadoPractica;
    cantidad_horas:       number;
    horas_semanales:      number;
    fecha_inicio:         Date;
    fecha_termino:        Date;
    modalidad:            string;
    id_alumno:            number;
    id_supervisor:        number;
    informe_alumno:       InformeAlumno;
    informe_confidencial: InformeConfidencial;
    nombre_empresa:       string;
    nombre_supervisor:    string;
    nombre_alumno:        string;
}



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
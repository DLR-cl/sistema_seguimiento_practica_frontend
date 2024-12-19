import { EstadoInforme, EstadoPractica, TipoUsuario } from "../../../enum/enumerables.enum";


export class AsignacionDto {
    id_informe_alumno!: number;
    id_academico!: number;
    id_practica!: number;
    id_informe_confidencial!: number;
}

export interface Secretaria{
    id_usuario: number;
    correo: string;
    nombre: string;
    rut: string;
    tipo_usuario: TipoUsuario
}

export interface Practicas {
    id_practica:          number;
    tipo_practica:        string;
    estado:               string;
    cantidad_horas:       number;
    horas_semanales:      number;
    fecha_inicio:         Date;
    fecha_termino:        Date;
    modalidad:            string;
    id_alumno:            number;
    id_supervisor:        number;
    informe_alumno:       InformeAlumno;
    informe_confidencial: InformeConfidencial;
}

export interface Alumno {
    id_user:          number;
    primer_practica:  boolean;
    segunda_practica: boolean;
    usuario:          AlumnoUsuario;
}


export interface AlumnoUsuario {
    nombre: string;
    correo: string;
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
    estado:                          string;
    fecha_inicio_revision:           Date;
    fecha_termino_revision:          Date;
    fecha_inicio_practica:           Date;
    fecha_fin_practica:              Date;
    fecha_real_revision:             null;
    id_supervisor:                   number;
    id_alumno_evaluado:              number;
    id_practica:                     number;
    id_academico:                    number;
    supervisor:                      Supervisor;
}
  
export interface Supervisor {
    id_user:    number;
    cargo:      string;
    id_empresa: number;
    usuario:    SupervisorUsuario;
    empresa:    Empresa;
}

export interface Empresa {
    id_empresa:          number;
    nombre_razon_social: string;
    ubicacion:           string;
    rubro:               string;
    nombre_gerente:      string;
}

export interface SupervisorUsuario {
    nombre: string;
    correo: string;
    rut:    string;
}

  export interface SeguimientoData {
    nombre_alumno:      string;
    rut_alumno:         string;
    tipo_practica:      string;
    estado_practica:    string;
    estado_informe:     string;
    nombre_academico:   string;
    correo_academico:   string;
    dias_para_revision: number;
    inicio_revision:    Date;
    fin_revision:       Date;
}
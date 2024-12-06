

export class AsignacionDto {
    id_informe!: number;
    id_academico!: number;
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
    estado:               EstadoPractica;
    cantidad_horas:       number;
    horas_semanales:      number;
    fecha_inicio:         Date;
    fecha_termino:        Date;
    modalidad:            string;
    id_alumno:            number;
    id_supervisor:        number;
    alumno:               Alumno;
    informe_alumno?:       InformeAlumno | null;
    informe_confidencial?: InformeConfidencial | null;
}

export interface Alumno {
    id_user:          number;
    primer_practica:  boolean;
    segunda_practica: boolean;
    usuario:          Usuario;
}

export interface Usuario {
    correo:       string;
    nombre:       string;
    rut:          string;
    tipo_usuario: TipoUsuario;
}

export interface InformeAlumno {
    id_informe:             number;
    id_practica:            number;
    id_alumno:              number;
    archivo:                string;
    estado:                 EstadoInforme;
    id_academico:           number | null;
    fecha_inicio_revision:  Date | null;
    fecha_termino_revision: Date | null;
}

interface InformeConfidencial {
    id_informe_confidencial: number;
    horas_practicas_regulares: number;
    horas_practicas_extraordinarias: number;
    total_horas: number;
    horas_inasistencia: number;
    nota_evaluacion?: number | null;  // opcional y puede ser null
    
    fecha_inicio_revision?: Date | null;  // opcional y puede ser null
    fecha_termino_revision?: Date | null; // opcional y puede ser null
    
    id_supervisor: number;
    id_alumno_evaluado: number;
    id_practica: number;
    id_academico?: number | null;  // opcional y puede ser null
  }
  
export interface PracticaInfo {
    id_practica: number;
    id_informe_alumno: number;
    id_informe_confidencial: number;
    tipo_practica: string;
    estado_practica: string;
    cantidad_horas: number;
    horas_semanales: number;
    fecha_inicio: Date;
    fecha_termino: Date;
    modalidad: string;
    alumno_nombre: string;
    alumno_correo: string;
    alumno_rut: string;
    alumno_tipo_usuario: string;
    primer_practica: number;
    segunda_practica: number;
    estado_informe_alumno: string;
    informe_alumno_archivo?: string;
    academico_nombre?: string;
    academico_rut?: string;
    horas_practicas_regulares?: number;
    horas_practicas_extraordinarias?: number;
    total_horas?: number;
    estado_informe_confidencial?: string;
    horas_inasistencia?: number;
    nota_evaluacion?: number;
    supervisor_nombre?: string;
    supervisor_rut?: string;
    supervisor_correo?: string;
  }
  
  export interface AcademicoInformes {
    nombre_academico:  string;
    rut_academico:     string;
    cantidad_informes: number;
    id_academico: number;
  }
export interface nuevaPractica {
  id_empresa: number;
  id_supervisor: number;
  id_alumno: number;
  fecha_inicio: Date;
  fecha_termino: Date;
  cantidad_horas: number;
  horas_semanales: number;
  modalidad: string;
  tipo_practica: string;
}

export interface Usuario {
  id_usuario:   number;
  password:     string;
  correo:       string;
  nombre:       string;
  rut:          string;
  primerSesion: boolean;
  tipo_usuario: string;
}
export interface PracticaAlumno {
    id_practica:     number;
    tipo_practica:   string;
    estado:          string;
    cantidad_horas:  number;
    horas_semanales: number;
    fecha_inicio:    Date;
    fecha_termino:   Date;
    modalidad:       string;
    id_alumno:       number;
    id_supervisor:   number;
}
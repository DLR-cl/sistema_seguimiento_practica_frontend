import { TipoUsuario } from "../../../../enum/enumerables.enum";

export interface AlumnoInterface {
    id_usuario:       number;
    correo:           string;
    nombre:           string;
    rut:              string;
    tipo_usuario:     TipoUsuario;
    id_user:          number;
    primer_practica:  boolean;
    segunda_practica: boolean;
    practica:         Practica[];
    informe:          Informe[];
}

export interface Informe {
    id_informe:             number;
    id_practica:            number;
    id_alumno:              number;
    archivo:                string;
    estado:                 string;
    id_academico:           null;
    fecha_inicio_revision:  null;
    fecha_termino_revision: null;
}

export interface Practica {
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

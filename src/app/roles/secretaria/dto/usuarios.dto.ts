import { Empresa } from "../../jefe_compartido/dto/empresa.dto";

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


export interface JefeSupervisor {
    id_user:         number;
    cargo:           string;
    id_empresa:      number;
    numero_telefono: string;
    usuario:         Usuario;
    empresa: Empresa;
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

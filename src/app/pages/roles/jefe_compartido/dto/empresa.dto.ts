import { Usuario } from "./practicas.dto";

export interface NuevaEmpresa {
    nombre_razon_social: string;
    ubicacion: string;
    rubro?: string;
    caracter_empresa?: string;
    tamano_empresa?: string;
}

export interface NuevoSupervisor {
    correo: string;
    nombre: string;
    rut: string;
    tipo_usuario: string;
    cargo: string;
    numero_telefono: string;
    id_empresa: number;
}

export interface Empresa {
    id_empresa:          number;
    nombre_razon_social: string;
    ubicacion:           string;
    rubro:               string;
    caracter_empresa:    string;
    tamano_empresa:      string;
    jefe_supervisor:     JefeSupervisor[];
}

export interface JefeSupervisor {
    id_user:         number;
    cargo:           string;
    id_empresa:      number;
    numero_telefono: string;
    usuario:         Usuario;
}

export interface ResponseEmpresa {
    id_empresa:          number;
    nombre_razon_social: string;
    ubicacion:           string;
    rubro?:               string;
    caracter_empresa?:    string;
    tamano_empresa?:      string;
}

export interface ResponseSupervisor {
    message:     string;
    status_code: number;
    data:        Data;
}

export interface Data {
    id_usuario:   number;
    correo:       string;
    nombre:       string;
    rut:          string;
    primerSesion: boolean;
    tipo_usuario: string;
    cargo:        string;
}
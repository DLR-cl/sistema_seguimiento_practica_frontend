export interface Academico {
    id_usuario: number;
    nombre:     string;
    rut:        string;
    correo:     string;
}

export interface NuevoAcademico { 
    nombre: string; 
    correo: string; 
    rut: string, 
    tipo_usuario:string 
}

export interface ResponseNuevo {
    message:    string;
    statusCode: number;
    data:       Data;
}

export interface Data {
    id_usuario:   number;
    correo:       string;
    nombre:       string;
    rut:          string;
    primerSesion: boolean;
    tipo_usuario: string;
}

export interface AcademicoSolo {
    id_usuario:   number;
    nombre:       string;
    rut:          string;
    tipo_usuario: string;
    correo:       string;
}
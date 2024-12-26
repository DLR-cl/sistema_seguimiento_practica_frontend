export interface Secretaria {
    nombre:       string;
    rut:          string;
    id_usuario:   number;
    correo:       string;
    tipo_usuario: string;
}

export interface NuevaSecretaria{
    nombre: string; 
    correo: string; 
    rut: string, 
    tipo_usuario:string
}

export interface ResponseNueva{
    id_usuario:   number;
    correo:       string;
    nombre:       string;
    rut:          string;
    primerSesion: boolean;
    tipo_usuario: string;
}

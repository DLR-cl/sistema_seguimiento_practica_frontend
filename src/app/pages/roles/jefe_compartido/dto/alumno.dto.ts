export interface nuevoAlumno {
    correo: string;
    nombre: string;
    rut: string;
    tipo_usuario: string;
    nomina: boolean;
}

export interface AlumnosDataDto {
    id_user: number;
    primer_practica: boolean;
    segunda_practica: boolean;
    usuario : {
        nombre: string;
        correo: string;
        rut: string;
        tipo_usuario: string;
    }
}
  
  
export interface AlumnoNominaInterface {
    nombre: string;
    correo: string;
    rut: string;
}
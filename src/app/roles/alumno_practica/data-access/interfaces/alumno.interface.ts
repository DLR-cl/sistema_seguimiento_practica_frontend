import { Tipo_usuario } from "../../../../enum/tipo-usuario.enum";

export interface AlumnoInterface {

    correo: string;
    nombre: string;
    tipo_usuario: Tipo_usuario;
    primer_practica: boolean;
    segunda_practica: boolean;
}
import { Tipo_usuario } from "../../enum/tipo-usuario.enum";

export interface PayloadInterface {
    id_usuario: number;
    correo: string;
    nombre: string;
    rut: string;
    tipo_usuario: Tipo_usuario;
}
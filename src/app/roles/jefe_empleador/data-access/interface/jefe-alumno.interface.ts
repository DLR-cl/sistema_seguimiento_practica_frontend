import { Tipo_usuario } from "../../../../enum/tipo-usuario.enum";
import { PayloadInterface } from "../../../../shared/interface/payload.interface";

export interface JefeAlumnoInterface {
    id_usuario: number;
    correo: string;
    nombre: string;
    rut: string;
    tipo_usuario: Tipo_usuario;
    cargo: string;
}
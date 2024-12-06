import { Tipo_usuario } from "../../enum/enumerables.enum";

export interface RegisterDto {
    password: string;
    correo: string;
    nombre: string;
    rut: string;
    tipo_usuario: Tipo_usuario;
}
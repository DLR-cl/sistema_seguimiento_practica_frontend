import { TipoUsuario } from "../../enum/enumerables.enum";

export interface RegisterDto {
    password: string;
    correo: string;
    nombre: string;
    rut: string;
    tipo_usuario: TipoUsuario;
}
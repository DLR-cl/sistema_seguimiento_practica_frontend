import { TipoUsuario } from "../../enum/enumerables.enum";

export interface PayloadInterface {
    id_usuario: number;
    correo: string;
    nombre: string;
    rut: string;
    rol: TipoUsuario;
}
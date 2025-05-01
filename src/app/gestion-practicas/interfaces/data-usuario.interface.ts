import { TipoUsuario } from "../../enum/enumerables.enum";

export interface DataUsuarioFromJSONWebToken {
    id_usuario: number;
    correo: string;
    nombre: string;
    rol: TipoUsuario;
    rut: string;
    access_token: string;
}

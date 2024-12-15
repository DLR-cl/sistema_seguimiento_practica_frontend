import { TipoUsuario } from "../../../../enum/enumerables.enum";

export interface JefeAlumnoInterface {
    id_usuario: number;
    id_empresa: number;
    correo: string;
    nombre: string;
    rut: string;
    tipo_usuario: TipoUsuario;
    cargo: string;
}
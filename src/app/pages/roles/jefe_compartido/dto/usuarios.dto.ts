import { TipoUsuario } from "../../../../enum/enumerables.enum"

export interface usuario{
    nombre: string,
    rut: string,
    id_usuario: number,
    correo: string,
    tipo_usuario: TipoUsuario
}

export interface cambiarCorreo{
    correoActual: string,
    correoAnterior: string
}
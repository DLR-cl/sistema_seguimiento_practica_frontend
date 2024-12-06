import { Tipo_usuario } from "../../../enum/tipo-usuario.enum";

export class AsignacionDto {
    id_informe!: number;
    id_academico!: number;
}

export interface Secretaria{
    id_usuario: number;
    correo: string;
    nombre: string;
    rut: string;
    tipo_usuario: Tipo_usuario
}
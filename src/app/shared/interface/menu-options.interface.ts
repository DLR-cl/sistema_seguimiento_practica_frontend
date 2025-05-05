import { TipoUsuario } from "../../enum/enumerables.enum";

export interface MenuItem {
    label: string;
    path: string;
    roles: TipoUsuario
}
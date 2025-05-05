import { TipoUsuario } from "../../enum/enumerables.enum";

export interface MenuOption {
    label: string;
    path: string;
    roles: TipoUsuario[]
}
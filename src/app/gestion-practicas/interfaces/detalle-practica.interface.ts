import { EstadoPractica } from "../../enum/enumerables.enum";

export interface DetallePractica {
    nombre_alumno:   string;
    id_practica:     number;
    tipo_practica:   string;
    estado_practica: EstadoPractica;
}

import { EstadoPractica } from "../../../../enum/enumerables.enum";

export interface CantidadAlumnosEnPractica {
    cantidad_alumnos_practica: number;
}

export interface estadisticasPractica{
    estudiantes_practica: number,
    estudiantes_revision: number,
    informes_sin_enviar: number,
    total_asignados: number,
    max_informes: number
}

export interface detallePractica {
    nombre_alumno:   string;
    id_practica:     number;
    tipo_practica:   string;
    estado_practica: EstadoPractica;
}

export interface practicasMes {
    mes_inicio:      string;
    tipo_practica:   string;
    total_practicas: number;
}

export interface AprobacionPracticas {
    primerPractica:  PrimerPractica[];
    segundaPractica: SegundaPractica[];
}

export interface PrimerPractica {
    practica?: string;
    estado?:   string;
    cantidad: number;
}

export interface SegundaPractica {
    practica?: string;
    estado?:   string;
    cantidad: number;
}

export interface AlumnosActivosPractica {
    tipo_practica:        string;
    cantidad_estudiantes: number;
}

export interface CantidadEmpresasPorTipo {
    privada: number;
    publica: number;
}
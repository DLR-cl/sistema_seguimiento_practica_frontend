import type { PrimerPractica, SegundaPractica } from "../../pages/roles/jefe_compartido/dto/dashboard-practicas.dto";

export interface EstadisticasPractica{
    estudiantes_practica: number,
    estudiantes_revision: number,
    informes_sin_enviar: number,
    total_asignados: number,
    max_informes: number
}

export interface AlumnosActivosPorPractica {
    tipo_practica:        string;
    cantidad_estudiantes: number;
}

export interface AprobacionPracticas {
    primerPractica:  PrimerPractica[];
    segundaPractica: SegundaPractica[];
}

export interface EstadisticaAprobacionPorPractica {
    practica_uno: ContadorPractica;
    practica_dos: ContadorPractica;
}

interface ContadorPractica {
    aprobadas:    number;
    desaprobadas: number;
}

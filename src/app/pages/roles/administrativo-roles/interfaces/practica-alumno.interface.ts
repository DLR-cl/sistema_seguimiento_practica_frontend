import type { EstadoPractica } from "../../../../enum/enumerables.enum";
import type { InformeAlumno, InformeConfidencial } from "../../secretaria/dto/practicas.dto";

export interface PracticaAlumno {
    id_practica:          number;
    tipo_practica:        string;
    estado:               EstadoPractica;
    cantidad_horas:       number;
    horas_semanales:      number;
    fecha_inicio:         Date;
    fecha_termino:        Date;
    modalidad:            string;
    id_alumno:            number;
    id_supervisor:        number;
    informe_alumno:       InformeAlumno;
    informe_confidencial: InformeConfidencial;
    nombre_empresa:       string;
    nombre_supervisor:    string;
    nombre_alumno:        string;
}
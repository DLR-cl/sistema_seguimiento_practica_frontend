import { TipoPractica } from "../../../enum/enumerables.enum";

export interface InformeEvaluativo {
    id_practica: number;
    id_informe_evaluativo: number;
    id_docente: number;
    nombre_academico: string;
    correo_academico: string;
    nombre_alumno: string;
    correo_alumno: string;
    datos_empresa: DatosEmpresa;
    nombre_jefe_empleador: string;
    correo_jefe_empleador: string;
    tipo_practica: TipoPractica
}

export interface DatosEmpresa {
    id_empresa: number;
    nombre_razon_social: string;
    ubicacion: string;
    rubro: string;
    caracter_empresa: string;
    tamano_empresa: string;
}
import { EstadoInforme, EstadoPractica, TipoUsuario } from "../../../../enum/enumerables.enum";
import { JefeSupervisor } from "./usuarios.dto";


export class AsignacionDto {
    id_informe_alumno!: number;
    id_academico!: number;
    id_practica!: number;
    id_informe_confidencial!: number;
}

export interface Secretaria{
    id_usuario: number;
    correo: string;
    nombre: string;
    rut: string;
    tipo_usuario: TipoUsuario
}


  
export interface Empresas {
    id_empresa:          number;
    nombre_razon_social: string;
    ubicacion:           string;
    rubro:               string;
    caracter_empresa:    string;
    tamano_empresa:      string;
    jefe_supervisor:     JefeSupervisor[];
}

  export interface SeguimientoData {
    nombre_alumno:      string;
    rut_alumno:         string;
    tipo_practica:      string;
    estado_practica:    EstadoPractica;
    estado_informe:     EstadoInforme;
    nombre_academico:   string;
    correo_academico:   string;
    dias_para_revision: number;
    inicio_revision:    Date;
    fin_revision:       Date;
}
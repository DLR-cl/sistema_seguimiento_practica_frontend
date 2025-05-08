import { Empresa } from '../../../pages/roles/jefe_compartido/dto/empresa.dto';
import { PracticaAlumno } from '../../../gestion-practicas/interfaces/practica-alumno.interface';
import { JefeAlumnoInterface } from './jefe-alumno.interface';
import { DetallesInformes } from '../dto/informe-confidencial.dto';

export interface SupervisorState {
  loading: boolean;
  error: string | null;
  dataJefe: JefeAlumnoInterface | null;
  dataEmpresa: Empresa | null;
  alumnosAsignados: number;
  informesPendientes: number;
  totalInformes: number;
  detalleInformes: DetallesInformes[];
  informesPendientesList: DetallesInformes[];
  selectedInforme: DetallesInformes | null;
  modalDetalles: boolean;
  practicaSeleccionada: PracticaAlumno | null;
  cargandoPracticas: Set<number>;
}

export const TIPO_PRACTICA = {
  PRACTICA_DOS: 'Práctica Profesional II',
  PRACTICA_UNO: 'Práctica Profesional I'
} as const;

export const ESTADO_INFORME = {
  ENVIADA: 'Enviado',
  REVISION: 'Revisión',
  CORRECCION: 'Corrección',
  ESPERA: 'Espera',
  APROBADA: 'Aprobada',
  DESAPROBADA: 'Desaprobada'
} as const;

export const ESTADO_PRACTICA = {
  CURSANDO: 'Cursando',
  REVISION_GENERAL: 'Revisión General',
  ESPERA_INFORMES: 'Espera Informes',
  FINALIZADA: 'Finalizada',
  INFORMES_RECIBIDOS: 'Informes Recibidos'
} as const;

export const MODALIDAD = {
  PRESENCIAL: 'Presencial',
  REMOTO: 'Remoto',
  SEMI_PRESENCIAL: 'Semipresencial'
} as const; 
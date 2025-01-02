export interface Dimension {
    id_dimension: number;
    nombre: string;
    descripcion: string;
    idDimensionPadre: number;
  }

export interface Pregunta {
  id_pregunta: number;
  enunciado_pregunta: string;
  tipo_pregunta: string;
  id_dimension: number;
  dimension: Dimension;
}

export interface PreguntaEvaluacion {
  id_pregunta: number;
  pregunta: Pregunta;
}

export interface GenerarPDF{
  id_practica: number;
  id_informe_evaluativo: number;
  id_docente: number;
}
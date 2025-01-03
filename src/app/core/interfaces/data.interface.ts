export interface IdentificacionInterface {
    nombre_alumno: string;
    nombre_empresa: string;
    tipo_practica: string;
    profesor_revisor: string;
  }
  
  export interface RespuestaEvaluativaInterface {
    dimension: string;
    pregunta: string;
    respuesta: string;
  }
  
  export interface EvaluacionPracticaInterface {
    datosIdentificacion: IdentificacionInterface;
    datosRespuesta: RespuestaEvaluativaInterface[];
    aprobacion: boolean;
  }
  
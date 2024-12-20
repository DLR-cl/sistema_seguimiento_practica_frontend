import { TipoPregunta } from "../../../enum/enumerables.enum";

export interface existeRespuesta {
    existeRespuesta: boolean;
    correcion:       boolean;
}

export interface Pregunta{
    id_pregunta: number,
    enunciado_pregunta:string,
    tipo_pregunta: TipoPregunta,
}

export interface ListaRespuestas{
    respuestas: Respuesta[]
}
  
export interface Respuesta{
    id_informe?: number;
    id_pregunta: number;
    texto?: string;
    puntaje?: number;
    asignaturas?: string[];
    nota?: number
}
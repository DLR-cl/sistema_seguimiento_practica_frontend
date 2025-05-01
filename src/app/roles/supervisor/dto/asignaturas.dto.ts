export interface AsignaturaBack{
    nombre: string,
    tipo_asignatura: string,
    semestre: number,
    codigo: string
}

export interface Semestre{
    nombre: string,
    asignaturas: {
        nombre: string,
        codigo: string,
        tipo: string,
    }[]
}
  
export  interface Asignatura{
    nombre: string,
    codigo: string,
    tipo: string
}
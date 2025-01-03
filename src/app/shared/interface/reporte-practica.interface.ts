export interface PracticaResultado {
    aprobados: number; // Número de prácticas aprobadas
    reprobados: number; // Número de prácticas reprobadas
}

export interface ConteoPracticas {
    PRACTICA_UNO: PracticaResultado; // Resultados para PRACTICA_UNO
    PRACTICA_DOS: PracticaResultado; // Resultados para PRACTICA_DOS
}


export interface PracticaMes {
    PRACTICA_UNO: number; // Cantidad de informes para Práctica Uno
    PRACTICA_DOS: number; // Cantidad de informes para Práctica Dos
}

export interface ConteoPorMes {
    enero: PracticaMes;
    febrero: PracticaMes;
    marzo: PracticaMes;
    abril: PracticaMes;
    mayo: PracticaMes;
    junio: PracticaMes;
    julio: PracticaMes;
    agosto: PracticaMes;
    septiembre: PracticaMes;
    octubre: PracticaMes;
    noviembre: PracticaMes;
    diciembre: PracticaMes;
}

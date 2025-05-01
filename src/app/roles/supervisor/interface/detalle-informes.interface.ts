export interface InformePractica {
    id_supervisor: number;                // ID del supervisor asociado a la práctica
    tipo_practica: string;                // Tipo de práctica (por ejemplo, "PRACTICA_UNO")
    id_alumno: number;                    // ID del alumno asignado a la práctica
    nombre_alumno: string;                // Nombre completo del alumno
    estado_informe: string;               // Estado del informe confidencial (por ejemplo, "ESPERA", "ENVIADO")
    id_informe_confidencial: number;      // ID del informe confidencial
    fecha_inicio: string;                 // Fecha de inicio de la práctica (formato ISO: "YYYY-MM-DD")
    fecha_limite_entrega: string;         // Fecha límite para entregar el informe (formato ISO: "YYYY-MM-DD")
    dias_restantes: number;               // Días restantes para la entrega (puede ser negativo si está vencido)
    id_practica: number;                  // ID de la práctica
  }
  
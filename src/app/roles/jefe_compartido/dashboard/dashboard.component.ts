import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../header-jefes/header.component";
import { ListboxModule } from 'primeng/listbox';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';
import { DashboardService, detallePractica, estadisticasPractica } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ListboxModule, ChartModule, TableModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(
    private authService: AuthStateService,
    private dashboardService: DashboardService
  ){}

  dataUser!:any;

  ngOnInit(): void {
    this.dataUser = this.authService.getData();
    this.getEstadisticasPracticas()
    this.getAprobacionPracticas()
    this.getAlumnosActivosPracticas()
    this.getDetallesPractica()
    this.getPracticasMeses()
  }

  public getEstadisticasPracticas(){
    this.dashboardService.getEstadisticasPracticas().subscribe({
      next: result => {
        this.estadisticasPractica = result
        console.log(result)


        const totalAsignados = this.estadisticasPractica.total_asignados; // Ejemplo: 25
        const maxInformes = this.estadisticasPractica.max_informes; // Ejemplo: 20

        // Calcular el porcentaje de carga académica
        const porcentajeCargaAcademica = (totalAsignados / maxInformes) * 100;

        // Calcular el porcentaje restante
        let porcentajeRestante = 100 - porcentajeCargaAcademica;
        if (porcentajeRestante < 0) {
          porcentajeRestante = 0; // No mostrar un valor negativo
        }
      },
      error: error =>{
        console.log(error)
      }
    })
  }
  
  public getAprobacionPracticas(){
    this.dashboardService.getAprobacionPracticas().subscribe({
      next: result => {
        console.log(result)
        const primerPractica = result.primerPractica;
        if(primerPractica.length != 0){
          const aprobadosI = primerPractica
            .filter((practica: any) => practica.estado === 'APROBADOS')
            .reduce((sum: number, practica: any) => sum + practica.cantidad, 0);
          const total = primerPractica.reduce((sum: number, practica: any) => sum + practica.cantidad, 0);
          const aprobadosPorcentajeI = total > 0 ? (aprobadosI / total) * 100 : 0;
          const reprobadosPorcentajeI = 100 - aprobadosPorcentajeI;

          this.practicaIChartData = {
            labels: ['Aprobados', 'Reprobados'],
            datasets: [
              {
                data: [aprobadosPorcentajeI.toFixed(2), reprobadosPorcentajeI.toFixed(2)],
                backgroundColor: ['#1565c0', '#42aaff'],
              }
            ]
          };
        }
        

        const segundaPractica = result.segundaPractica;
        if(segundaPractica.length != 0){
          const aprobadosII = segundaPractica
            .filter((practica: any) => practica.estado === 'APROBADOS')
            .reduce((sum: number, practica: any) => sum + practica.cantidad, 0);
          const totalII = segundaPractica.reduce((sum: number, practica: any) => sum + practica.cantidad, 0);
          const aprobadosPorcentajeII = totalII > 0 ? (aprobadosII / totalII) * 100 : 0;
          const reprobadosPorcentajeII = 100 - aprobadosPorcentajeII;

          this.practicaIIChartData = {
            labels: ['Aprobados', 'Reprobados'],
            datasets: [
              {
                data: [aprobadosPorcentajeII.toFixed(2), reprobadosPorcentajeII.toFixed(2)],
                backgroundColor: ['#1565c0', '#42aaff'],
              }
            ]
          };
        } 
      },
      error: error =>{
        console.log(error)
      }
    })
  }

  public getAlumnosActivosPracticas() {
    this.dashboardService.getAlumnosActivosPracticas().subscribe({
      next: (result) => {
        console.log(result, "hola soy ese grafico");
  
        // Buscar prácticas y asignar 0 si no existen
        const practicaUno = result.find((practica: any) => practica.tipo_practica === "PRACTICA_UNO")?.cantidad_estudiantes || 0;
        const practicaDos = result.find((practica: any) => practica.tipo_practica === "PRACTICA_DOS")?.cantidad_estudiantes || 0;
  
        // Configuración del gráfico con valores asegurados
        this.cantidadEstudiantesTipoPracticaChartData = {
          labels: ['Práctica 1', 'Práctica 2'],
          datasets: [
            {
              data: [practicaUno, practicaDos],
              backgroundColor: ['#1565c0', '#42aaff'],
            }
          ]
        };
  
        console.log(this.cantidadEstudiantesTipoPracticaChartData);
      },
      error: (error) => {
        console.log(error);
  
        // En caso de error, asignar datos vacíos
        this.cantidadEstudiantesTipoPracticaChartData = {
          labels: ['Práctica 1', 'Práctica 2'],
          datasets: [
            {
              data: [0, 0],
              backgroundColor: ['#1565c0', '#42aaff'],
            }
          ]
        };
      }
    });
  }
  
  

  public getDetallesPractica(){
    this.dashboardService.getDetallesPracticas().subscribe({
      next: result => {
        console.log(result)
        this.detallesPractica = result
      }
    })
  }

  public getPracticasMeses() {
    this.dashboardService.getPracticasMeses(this.periodoSeleccionado).subscribe({
        next: (result) => {
            console.log(result);

            // Define un tipo más flexible para permitir índices dinámicos
            const practicasPorMes: { [mes: string]: { [key: string]: number } } = {};

            // Organizar los datos recibidos
            result.forEach((practica) => {
                const mes = this.translateMonth(practica.mes_inicio);
                if (!practicasPorMes[mes]) {
                    practicasPorMes[mes] = {}; // Inicializa el mes si no existe
                }
                practicasPorMes[mes][practica.tipo_practica] = practica.total_practicas;
            });

            // Definir todos los meses posibles
            const todosLosMeses = [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ];

            // Extraer los datos para el gráfico asegurando que todos los meses están presentes
            const labels = todosLosMeses; // Todos los meses del año
            const dataPracticaUno = labels.map((mes) => practicasPorMes[mes]?.['PRACTICA_UNO'] || 0); // 0 si no existe
            const dataPracticaDos = labels.map((mes) => practicasPorMes[mes]?.['PRACTICA_DOS'] || 0); // 0 si no existe

            // Configurar los datos del gráfico
            this.mesChartData = {
                labels,
                datasets: [
                    {
                        label: 'Práctica Uno',
                        data: dataPracticaUno,
                        backgroundColor: '#1E88E5',
                        borderColor: '#1565C0',
                        borderWidth: 1,
                    },
                    {
                        label: 'Práctica Dos',
                        data: dataPracticaDos,
                        backgroundColor: '#42aaff',
                        borderColor: '#42aaff',
                        borderWidth: 1,
                    },
                ],
            };
        },
    });
  }

  // Método para traducir los nombres de los meses del backend al español
  private translateMonth(month: string): string {
    const monthsMap: { [key: string]: string } = {
        January: 'Enero',
        February: 'Febrero',
        March: 'Marzo',
        April: 'Abril',
        May: 'Mayo',
        June: 'Junio',
        July: 'Julio',
        August: 'Agosto',
        September: 'Septiembre',
        October: 'Octubre',
        November: 'Noviembre',
        December: 'Diciembre',
    };
    return monthsMap[month] || month;
  } 

  estadisticasPractica!: estadisticasPractica
  
  detallesPractica!: detallePractica[]

  periodoSeleccionado: number = 2024

  selectedInforme: any;

  // **Gráfico de Cantidad Estudiantes por Práctica** (No cambia a porcentaje)
  cantidadEstudiantesTipoPracticaChartData: any

  cantidadEstudiantesTipoPracticaChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.raw} Estudiantes`
        }
      }
    },
    cutout: '70%'
  };

  // **Gráfico de Práctica I**
  practicaIChartData: any

  practicaIChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const total = 100; // Total de la categoría (100%)
            const percentage = (tooltipItem.raw / total) * 100;
            return `${percentage.toFixed(1)}% Estudiantes`;
          }
        }
      }
    },
    cutout: '70%'
  };

  // **Gráfico de Práctica II** (Convertido a porcentaje)
  practicaIIChartData:any

  practicaIIChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const total = 100; // Total de la categoría (100%)
            const percentage = (tooltipItem.raw / total) * 100;
            return `${percentage.toFixed(1)}% Estudiantes`;
          }
        }
      }
    },
    cutout: '70%'
  };

  // **Gráfico de Percepción de Empresas** (Convertido a porcentaje)
  percepcionEmpresasChartData = {
    labels: ['Buen Prácticante', 'Mal Prácticante'],
    datasets: [
      {
        data: [80, 20], // Datos ajustados
        backgroundColor: ['#1565c0', '#42aaff'],
      }
    ]
  };

  percepcionEmpresasChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const total = 100; // Total de la categoría (100%)
            const percentage = (tooltipItem.raw / total) * 100;
            return `${percentage.toFixed(1)}% Estudiantes`;
          }
        }
      }
    },
    cutout: '70%'
  };

  // **Gráfico de Prácticas Supervisadas por Mes** (No cambia a porcentaje)
  mesChartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Prácticas Realizadas',
        data: [4, 6, 7, 5, 6, 8, 11, 9, 5, 6, 3, 2],
        backgroundColor: '#1E88E5',
        borderColor: '#1565C0',
        borderWidth: 1,
      },
    ],
  };

  mesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            beginAtZero: true,
            stacked: true, // Apilar en el eje X
        },
        y: {
            beginAtZero: true,
            stacked: true, // Apilar en el eje Y
            ticks: { stepSize: 2 }, // Intervalos del eje Y
        },
    },
};


  // Función para ver detalles de informes
  verInforme(informe: any) {
    alert(`Ver informe: ${informe.nombre_alumno} de ${informe.tipo_practica}`);
  }
}

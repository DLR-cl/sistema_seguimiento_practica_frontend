import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ListboxModule } from 'primeng/listbox';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PrimeNGConfig } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { AuthStateService } from '../../../../../shared/data-access/auth-state.service';
import { DashboardService } from '../../../jefe_compartido/services/dashboard.service';
import { DatosAcademicosService } from '../../../jefe_compartido/services/datos-academicos.service';
import type { CantidadEmpresasPorTipo, detallePractica, estadisticasPractica } from '../../../jefe_compartido/dto/dashboard-practicas.dto';
import type { AcademicoSolo } from '../../../jefe_compartido/dto/academicos.dto';
import { DashboardTablaEstadisticasPracticasComponent } from "../tabla-estadistica/dashboard-tabla-estadisticas-practicas.component";
import { ModalAlumnosPracticaComponent } from "./modal-alumnos-practica/modal-alumnos-practica.component";
import { PracticaAlumno } from '../../interfaces/practica-alumno.interface';
import { ModalDetallesPracticaAlumnoComponent } from "./modal-detalles-practica-alumno/modal-detalles-practica-alumno.component";
import { DataEstadisticaPracticaService } from '../../services/data-estadistica-practica.service';
import { DashboardCantidadEstudiantesPracticasComponent } from "../dashboard-cantidad-estudiantes-practicas/dashboard-cantidad-estudiantes-practicas.component";
import { DashboardCantidadReprobadosAprobadosComponent } from "../dashboard-cantidad-reprobados-aprobados/dashboard-cantidad-reprobados-aprobados.component";
import { DashboardCantidadAprobacionSegundaPracticaComponent } from "../dashboard-cantidad-aprobacion-segunda-practica/dashboard-cantidad-aprobacion-segunda-practica.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ListboxModule, ChartModule, TableModule, ButtonModule, DialogModule, DashboardTablaEstadisticasPracticasComponent, ModalAlumnosPracticaComponent, ModalDetallesPracticaAlumnoComponent, DashboardCantidadEstudiantesPracticasComponent, DashboardCantidadReprobadosAprobadosComponent, DashboardCantidadAprobacionSegundaPracticaComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(
    private authService: AuthStateService,
    private dashboardService: DashboardService,
    private academicoService: DatosAcademicosService,
    public dataEstadisticaService: DataEstadisticaPracticaService,
  ){}


  dataUser!:any;
  @Output() estadoCargando = new EventEmitter<boolean>();
  
  cargando: boolean = true;
  cantidadEmpresasPorTipo!: CantidadEmpresasPorTipo;

  cargandoSolicitudes: number = 0;

  ngOnInit(): void {
    this.dataUser = this.authService.getData();
    this.getPracticasMeses()
    this.getCantidadEmpresasPorTipos();
  }

  

  periodoSeleccionado: number = new Date().getFullYear();

  // selectedInforme: any;

 

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



  // **Gráfico de Práctica II** (Convertido a porcentaje)
  

  // **Gráfico de Percepción de Empresas** (Convertido a porcentaje)
  tipoEmpresasChartData: any

  tipoEmpresaChartOptions = {
    responsive: true,
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
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const dataset = tooltipItem.dataset;
            const value = dataset.data[tooltipItem.dataIndex];
            return `${dataset.label}: ${value}`;
          },
          labelColor: (tooltipItem: any) => {
            const dataset = tooltipItem.dataset;
            return {
              borderColor: dataset.borderColor,
              backgroundColor: dataset.backgroundColor,
            };
          },
        },
      },
    },
  };
  
  
  

  getCantidadEmpresasPorTipos(){
    this.cargandoSolicitudes++;
    this.dashboardService.getCantidadEmpresasPorTipo().subscribe({
      next: result => {
        if(result.privada !== 0 || result.publica !== 0){
          this.cantidadEmpresasPorTipo = result;
          this.tipoEmpresasChartData = {
            labels: ['Privada', 'Pública'],
            datasets: [
              {
                data: [result.privada, result.publica],
                backgroundColor: ['#1565c0', '#42aaff']
              }
            ]
          }
        }
      },
      complete: () => {
        this.cargandoSolicitudes--;
        this.checkCargandoFinalizado();
      }
    })
  };

  public getPracticasMeses() {
    this.cargandoSolicitudes++;
    this.dashboardService.getPracticasMeses(this.periodoSeleccionado).subscribe({
        next: (result) => {

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
        complete: () => {
          this.cargandoSolicitudes--;
          this.checkCargandoFinalizado();
        }
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

  cargandoPracticas: Set<number> = new Set<number>();

  checkCargandoFinalizado() {
    if (this.cargandoSolicitudes === 0) {
        this.cargando = false;
        this.estadoCargando.emit(this.cargando);
        console.log("Todas las solicitudes han finalizado.");
    }
  }
}

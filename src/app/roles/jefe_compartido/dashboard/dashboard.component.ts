import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../header-jefes/header.component";
import { ListboxModule } from 'primeng/listbox';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';
import { DashboardService, estadisticasPractica } from '../services/dashboard.service';

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

  nombre?:string;
  dataUser?:any;

  ngOnInit(): void {
    this.dataUser = this.authService.getData();
    this.nombre = this.dataUser.nombre;
    console.log(this.dataUser);
    this.getEstadisticasPracticas()
    this.getAprobacionPracticas()
    this.getAlumnosActivosPracticas()
  }

  public getEstadisticasPracticas(){
    this.dashboardService.getEstadisticasPracticas().subscribe({
      next: result => {
        this.estadisticasPractica = result
        this.estadisticasPractica.total_asignados = 30
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

        // Crear el gráfico
        this.academicosCargaLaboralElevadaChartData = {
          labels: ['Carga académica', 'Restante'],
          datasets: [
            {
              data: [
                // Mostrar el porcentaje real de carga
                porcentajeCargaAcademica, 
                // Mostrar el porcentaje restante solo si es mayor que 0
                porcentajeRestante > 0 ? porcentajeRestante : 0
              ],
              backgroundColor: ['#1565c0', '#42aaff'], // Color de la carga y el restante
            }
          ]
        };
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

        const segundaPractica = result.segundaPractica;
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
      },
      error: error =>{
        console.log(error)
      }
    })
  }

  public getAlumnosActivosPracticas(){
    this.dashboardService.getAlumnosActivosPracticas().subscribe({
      next: result => {
        this.cantidadEstudiantesTipoPracticaChartData = {
          labels: ['Práctica 1', 'Práctica 2'],
          datasets: [
            {
              data: [result.find((practica:any) => practica.tipo_practica == "PRACTICA_UNO").cantidad_estudiantes, result.find((practica:any) => practica.tipo_practica == "PRACTICA_DOS").cantidad_estudiantes],
              backgroundColor: ['#1565c0', '#42aaff'],
            }
          ]
        };
        console.log(result)
      },
      error: error =>{
        console.log(error)
      }
    })
  }

  estadisticasPractica!: estadisticasPractica
  // Definimos las variables para la cantidad de estudiantes en práctica y carga docente.
  cantidadEstudiantesPractica: number = 120; // Ajusta con tus datos reales
  estudiantesSinCalificar: number = 15; // Número de estudiantes sin calificar, ajusta según tus datos

  // Datos de los docentes con los informes
  cargaDocenteData = [
    { docente: 'Juan Pérez', informes: 15 },
    { docente: 'Ana González', informes: 12 },
    { docente: 'Carlos López', informes: 11 },
    { docente: 'María Ruiz', informes: 9 },
  ];

  // Datos de carga docente (profesores con más de 10 informes)
  cargaDocente: number = this.cargaDocenteData.filter(docente => docente.informes >= 10).length;

  detalleInformes: any[] = [
    { alumno: 'Juan Pérez', nombre: 'Práctica I', estado: 'Finalizado' },
    { alumno: 'Ana González', nombre: 'Práctica II', estado: 'Cursando' },
    { alumno: 'Carlos López', nombre: 'Práctica I', estado: 'Finalizado' },
    { alumno: 'María Ruiz', nombre: 'Práctica II', estado: 'Cursando' },
    { alumno: 'José Díaz', nombre: 'Práctica I', estado: 'Finalizado' }
  ];

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

  // **Gráfico de Práctica I** (Convertido a porcentaje)
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

  // **Gráfico de Carga Laboral Académica** (Convertido a porcentaje)
  academicosCargaLaboralElevadaChartData = {
    labels: ['Porcentaje de carga', 'Porcentaje restante'],
    datasets: [
      {
        data: [30, 70], // Datos ajustados
        backgroundColor: ['#1565c0', '#42aaff'],
      }
    ]
  };

  academicosCargaLaboralElevadaChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const total = 100; // Total de la categoría (100%)
            const percentage = (tooltipItem.raw / total) * 100;
            return `${percentage.toFixed(1)}% Académicos`;
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
      x: { beginAtZero: true },
      y: { beginAtZero: true, ticks: { stepSize: 2 } },
    },
  };

  // Función para ver detalles de informes
  verInforme(informe: any) {
    alert(`Ver informe: ${informe.nombre} de ${informe.alumno}`);
  }
}

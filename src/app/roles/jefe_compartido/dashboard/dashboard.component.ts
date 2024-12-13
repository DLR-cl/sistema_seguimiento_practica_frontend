import { Component } from '@angular/core';
import { AlumnosEnPracticaCardComponent } from "../alumnos-en-practica-card/alumnos-en-practica-card.component";
import { AlumnosSinInformeCardComponent } from "../alumnos-sin-informe-card/alumnos-sin-informe-card.component";
import { DocentesSinInformesCardComponent } from "../docentes-sin-informes-card/docentes-sin-informes-card.component";
import { HeaderComponent } from "../header-jefes/header.component";
import { ListboxModule } from 'primeng/listbox';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AlumnosEnPracticaCardComponent, AlumnosSinInformeCardComponent, DocentesSinInformesCardComponent, CommonModule, FormsModule, HeaderComponent, ListboxModule, ChartModule, TableModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
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
  cantidadEstudiantesTipoPracticaChartData = {
    labels: ['Práctica 1', 'Práctica 2'],
    datasets: [
      {
        data: [100, 80], // Datos ajustados
        backgroundColor: ['#1565c0', '#42aaff'],
      }
    ]
  };

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
  practicaIChartData = {
    labels: ['Aprobados', 'Reprobados'],
    datasets: [
      {
        data: [85, 15], // Datos ajustados
        backgroundColor: ['#1565c0', '#42aaff'],
      }
    ]
  };

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
  practicaIIChartData = {
    labels: ['Aprobados', 'Reprobados'],
    datasets: [
      {
        data: [75, 25], // Datos ajustados
        backgroundColor: ['#1565c0', '#42aaff'],
      }
    ]
  };

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
    labels: ['Carga Alta', 'Carga Baja'],
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

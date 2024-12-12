import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { ListboxModule } from 'primeng/listbox';
import { HeaderJefeEmpleadorComponent } from "../header-jefe-empleador/header-jefe-empleador.component";
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from "../../../jefe_compartido/header-jefes/header.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ChartModule, HeaderJefeEmpleadorComponent, ListboxModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  alumnosAsignados = 20;
  informesPendientes = 5;
  totalInformes = 25;

  // Datos de informes pendientes y detalles, con nombres de prácticas
  detalleInformes = [
    { alumno: 'Juan Pérez', nombre: 'Práctica I', estado: 'Pendiente', diasRestantes: 3 },
    { alumno: 'María Gómez', nombre: 'Práctica II', estado: 'Enviado', diasRestantes: 0 },
    { alumno: 'Carlos Díaz', nombre: 'Práctica II', estado: 'Pendiente', diasRestantes: 7 },
    { alumno: 'Ana Torres', nombre: 'Práctica I', estado: 'Pendiente', diasRestantes: 5 },
    { alumno: 'Luis Martínez', nombre: 'Práctica II', estado: 'Enviado', diasRestantes: 0 },
    { alumno: 'Pedro Ruiz', nombre: 'Práctica II', estado: 'Pendiente', diasRestantes: 10 },
    { alumno: 'Laura Fernández', nombre: 'Práctica I', estado: 'Enviado', diasRestantes: 0 },
    { alumno: 'José Rodríguez', nombre: 'Práctica I', estado: 'Pendiente', diasRestantes: 2 },
    { alumno: 'Elena Sánchez', nombre: 'Práctica II', estado: 'Enviado', diasRestantes: 0 },
    { alumno: 'Miguel López', nombre: 'Práctica II', estado: 'Pendiente', diasRestantes: 4 },
    { alumno: 'Sofía García', nombre: 'Práctica I', estado: 'Pendiente', diasRestantes: 15 },
    { alumno: 'Javier Martínez', nombre: 'Práctica I', estado: 'Enviado', diasRestantes: 0 },
    { alumno: 'Cristina Pérez', nombre: 'Práctica I', estado: 'Pendiente', diasRestantes: 8 },
    { alumno: 'Andrés González', nombre: 'Práctica II', estado: 'Enviado', diasRestantes: 0 },
    { alumno: 'Raquel Díaz', nombre: 'Práctica II', estado: 'Pendiente', diasRestantes: 6 },
  ];

  informesPendientesList = this.detalleInformes.filter(
    (informe) => informe.estado === 'Pendiente'
  );

  selectedInforme: any;

  // Gráfico de Estados de Informes (Enviados y Pendientes)
  chartData = {
    labels: ['Enviados', 'Pendientes'],
    datasets: [
      {
        data: [
          this.detalleInformes.filter(informe => informe.estado === 'Enviado').length, 
          this.detalleInformes.filter(informe => informe.estado === 'Pendiente').length
        ],
        backgroundColor: ['#1565c0', '#42aaff'], // Azul marino y azul celeste brillante
      },
    ],
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // Gráfico de Prácticas Supervisadas por Mes
  mesChartData = {
    labels: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    datasets: [
      {
        label: 'Prácticas Supervisadas',
        data: [3, 5, 8, 6, 4, 7, 10, 12, 9, 4, 2, 1], // Datos de ejemplo
        backgroundColor: '#1976d2', // Azul oscuro
        borderColor: '#1565c0', // Azul más oscuro
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
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2,
        },
      },
    },
  };

  additionalChartData = {
    labels: ['Práctica I', 'Práctica II'], // Etiquetas para los tipos de práctica
    datasets: [{
      data: [10, 15], // Los valores correspondientes a cada tipo de práctica
      backgroundColor: ['#1565c0', '#42aaff'], // Tonos de azul más oscuros
    }]
  };

  additionalChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // Datos de los últimos 5 informes enviados
  lineChartData = {
    labels: ['Informe 1', 'Informe 2', 'Informe 3', 'Informe 4', 'Informe 5'],
    datasets: [{
      label: 'Tiempo para Enviar Informe Confidencial (Días)',
      data: [5, 7, 3, 6, 4], // Tiempo en días que ha tardado el supervisor en enviar los informes
      fill: false,
      borderColor: '#1976d2', // Azul oscuro
      tension: 0, // Línea recta (sin suavizado)
      borderWidth: 2,
      pointBackgroundColor: '#1976d2', // Azul oscuro
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  };

  // Opciones del gráfico
  lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: { raw: any; }) => {
            return `Días: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Informe' // Eje X con el nombre de los informes
        }
      },
      y: {
        title: {
          display: true,
          text: 'Tiempo (Días)'
        },
        min: 0,
      }
    }
  };
  

  // Función para ver detalles de informes
  verInforme(informe: any) {
    alert(`Ver informe: ${informe.nombre} de ${informe.alumno}`);
  }
}

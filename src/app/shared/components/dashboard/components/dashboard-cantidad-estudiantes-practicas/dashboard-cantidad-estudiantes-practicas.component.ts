import { Component, inject, signal } from '@angular/core';
import { DataPracticaAlumnoService } from '../../../../../gestion-practicas/services/data-practica-alumno.service';
import { DataEstadisticaPracticaService } from '../../../../../gestion-practicas/services/data-estadistica-practica.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard-cantidad-estudiantes-practicas',
  standalone: true,
  imports: [CommonModule, FormsModule, ListboxModule, ChartModule, TableModule, ButtonModule, DialogModule],
  templateUrl: './dashboard-cantidad-estudiantes-practicas.component.html',
  styleUrl: './dashboard-cantidad-estudiantes-practicas.component.css'
})
export class DashboardCantidadEstudiantesPracticasComponent {

  dataPracticaService = inject(DataPracticaAlumnoService);
  dataEstadisticaService = inject(DataEstadisticaPracticaService);

  
  cantidadAlumnosPractica = signal<ChartData | null>(null);
  
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1e293b',
        bodyColor: '#1e293b',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: (context: any) => {
            const value = context.raw as number;
            return `${value} estudiantes`;
          }
        }
      }
    }
  };

  public getAlumnosActivosPracticas() {
    this.dataEstadisticaService.sumarContadorDeCarga();

    this.dataPracticaService.getAlumnosPracticaActiva().subscribe({
      next: (result) => {
  
        if(result.length > 0){
          // Buscar prácticas y asignar 0 si no existen
        const practicaUno = result.find(practica => practica.tipo_practica === "PRACTICA_UNO")?.cantidad_estudiantes || 0;
        const practicaDos = result.find(practica => practica.tipo_practica === "PRACTICA_DOS")?.cantidad_estudiantes || 0;
        
        this.setDataChart(practicaUno, practicaDos);
        }
      },
      error: (error) => {
        console.log(error);      
      },
      complete: () => {
        this.dataEstadisticaService.disminuirContadorDeCarga();
      }
    });
  }

  private setDataChart(cantPractUno: number, cantPractDos: number){
    this.cantidadAlumnosPractica.update(current => current = {
      labels: ['Práctica 1', 'Práctica 2'],
      datasets: [
        {
          data: [cantPractUno, cantPractDos],
          backgroundColor: ['#1565c0', '#42aaff'],
        }
      ]
    })
  }

}

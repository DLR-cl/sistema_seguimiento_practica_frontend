import { Component, inject, signal } from '@angular/core';
import { DataPracticaAlumnoService } from '../../services/data-practica-alumno.service';
import { DataEstadisticaPracticaService } from '../../services/data-estadistica-practica.service';
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

import { Component, inject, OnInit, signal } from '@angular/core';
import { ChartData } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import { DataPracticaAlumnoService } from '../../../../gestion-practicas/services/data-practica-alumno.service';
import { DataEstadisticaPracticaService } from '../../../../gestion-practicas/services/data-estadistica-practica.service';
import type { EstadisticaAprobacionPorPractica } from '../../../../gestion-practicas/interfaces/estadistica-praactica.interface';

@Component({
  selector: 'app-dashboard-cantidad-aprobacion-segunda-practica',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './dashboard-cantidad-aprobacion-segunda-practica.component.html',
  styleUrl: './dashboard-cantidad-aprobacion-segunda-practica.component.css'
})
export class DashboardCantidadAprobacionSegundaPracticaComponent implements OnInit {

  ngOnInit(): void {
    this.getAprobacionPracticas();
  }
  dataPracticaService = inject(DataPracticaAlumnoService);
  dataEstadisticaService = inject(DataEstadisticaPracticaService);

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

  segundaPracticaAprobDesaproChart = signal<ChartData | null>(null);

  public getAprobacionPracticas() {
    this.dataEstadisticaService.sumarContadorDeCarga();
    this.dataEstadisticaService.getAprobacionPracticas().subscribe({
      next: result => {
        this.filterSegundaPractica(result);
      },
      error: error => {
        console.log(error)
      },
      complete: () => {
        this.dataEstadisticaService.disminuirContadorDeCarga();
      }
    })
  }
  private filterSegundaPractica(result: EstadisticaAprobacionPorPractica) {
    console.log("valores segunda practica: ", result)
    if (result && result.practica_dos.aprobadas > 0 || result.practica_dos.desaprobadas > 0) {
      const aprobadosSegundaPractica = result.practica_dos.aprobadas;
      const totalSegundaPractica = result.practica_dos.aprobadas + result.practica_dos.desaprobadas;
      const aprobadosPorcentajeII = totalSegundaPractica > 0 ? (aprobadosSegundaPractica / totalSegundaPractica) * 100 : 0;
      const reprobadosPorcentajeII = 100 - aprobadosPorcentajeII;

      this.segundaPracticaAprobDesaproChart.set({
        labels: ['Aprobados', 'Reprobados'],
        datasets: [
          {
            data: [parseFloat(aprobadosPorcentajeII.toFixed(2)), parseFloat(reprobadosPorcentajeII.toFixed(2))],
            backgroundColor: ['#1565c0', '#42aaff'],
          }
        ]
      });
    }
  }


}

import { Component, inject, OnInit, signal } from '@angular/core';
import { DataPracticaAlumnoService } from '../../../../gestion-practicas/services/data-practica-alumno.service';
import { DataEstadisticaPracticaService } from '../../../../gestion-practicas/services/data-estadistica-practica.service';
import { ChartData } from 'chart.js';
import { EstadisticaAprobacionPorPractica } from '../../../../gestion-practicas/interfaces/estadistica-praactica.interface';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard-cantidad-reprobados-aprobados',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './dashboard-cantidad-reprobados-aprobados.component.html',
  styleUrl: './dashboard-cantidad-reprobados-aprobados.component.css'
})
export class DashboardCantidadReprobadosAprobadosComponent implements OnInit {
  ngOnInit(): void {
    this.getAprobacionPracticas();
  }
  dataPracticaService = inject(DataPracticaAlumnoService);
  dataEstadisticaService = inject(DataEstadisticaPracticaService);

  // **Gráfico de Práctica I**
  primerPracticaAprobDesaproChar = signal<ChartData | null>(null);

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




  public getAprobacionPracticas() {
    this.dataEstadisticaService.sumarContadorDeCarga();
    this.dataEstadisticaService.getAprobacionPracticas().subscribe({
      next: result => {
        this.filterPrimerPractica(result);
      },
      error: error => {
        console.log(error)
      },
      complete: () => {
        this.dataEstadisticaService.disminuirContadorDeCarga();
      }
    })
  }

  private filterPrimerPractica(result: EstadisticaAprobacionPorPractica) {

    if (result && result.practica_uno.aprobadas > 0 || result.practica_uno.desaprobadas > 0){

      const aprobadosPrimerPractica = result.practica_uno.aprobadas;
      const total = result.practica_uno.aprobadas + result.practica_uno.desaprobadas;

    const aprobadosPorcentajeI: number = total > 0 ? (aprobadosPrimerPractica / total) * 100 : 0;
    const reprobadosPorcentajeI: number = 100 - aprobadosPorcentajeI;

    this.primerPracticaAprobDesaproChar.set({
      labels: ['Aprobados', 'Reprobados'],
      datasets: [
        {
          data: [parseFloat(aprobadosPorcentajeI.toFixed(2)), parseFloat(reprobadosPorcentajeI.toFixed(2))],
          backgroundColor: ['#1565c0', '#42aaff'],
        }
      ]
    });
  }
  }

}

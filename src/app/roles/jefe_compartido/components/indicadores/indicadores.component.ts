import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-indicadores',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './indicadores.component.html',
  styleUrl: './indicadores.component.css'
})
export class IndicadoresComponent implements OnInit{
  dataPractica1: any;
  dataPractica2: any;
  options: any;

  ngOnInit(): void {
    // Datos para la Práctica 1
    this.dataPractica1 = {
      datasets: [
        {
          data: [75, 25], // Ejemplo: 75% aprobados, 25% reprobados
          backgroundColor: ['#42A5F5', '#ffffff'], // Colores para los segmentos
          hoverBackgroundColor: ['#64B5F6', '#ffffff'],
          cutout: 50,
        }
      ],
    };

    // Datos para la Práctica 2
    this.dataPractica2 = {
      datasets: [
        {
          data: [60, 40], // Ejemplo: 60% aprobados, 40% reprobados
          backgroundColor: ['#42A5F5', '#ffffff'], // Colores para los segmentos
          hoverBackgroundColor: ['#81C784', '#ffffff'],
          cutout: 50,
          
        }
      ],
    };

    // Opciones comunes para ambos gráficos
    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom', // Posición de la leyenda
          labels: {
            color: '#495057',
          },
        },
      },
    };
  }
}

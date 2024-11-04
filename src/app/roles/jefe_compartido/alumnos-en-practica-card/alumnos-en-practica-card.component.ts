import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-alumnos-en-practica-card',
  standalone: true,
  imports: [],
  templateUrl: './alumnos-en-practica-card.component.html',
  styleUrl: './alumnos-en-practica-card.component.css'
})
export class AlumnosEnPracticaCardComponent implements OnInit{
  chart_practicante: any;
  ngOnInit(): void{
    this.chart_practicante = new Chart('chart_practicantes', this.alumnos_practica());
  }

  alumnos_practica(): any {
    return {
      type: 'bar',
      data: {
        labels: ['Practicantes Activos'],
        datasets: [
          {
            label: 'Practica 1',
            data: ['12'],
            backgroundColor: 'green',
          },
          {
            label: 'Practica 2',
            data: ['10'],
            backgroundColor: 'yellow'
          }
        ],
      },
      options: {
        aspectRatio: 1,
        responsive: true,
      },
    };
  }
}

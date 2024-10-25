import { Component, OnInit } from '@angular/core';
import { registerables, Chart, Scale } from 'chart.js';  
Chart.register(...registerables);
@Component({
  selector: 'app-docentes-sin-informes-card',
  standalone: true,
  imports: [],
  templateUrl: './docentes-sin-informes-card.component.html',
  styleUrl: './docentes-sin-informes-card.component.css'
})
export class DocentesSinInformesCardComponent implements OnInit{


  chart_docentes: any;
  ngOnInit(): void{
    this.chart_docentes = new Chart('chart_docentes', this.alumnos_practica());
  }

  alumnos_practica(): any {
    return {
      type: 'bar',
      data: {
        labels: ['Docentes En revisión de informes'],
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

import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { CantidadAlumnosEnPractica } from '../../interface/alumnosPractica.interface';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-resumen-data',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './resumen-data.component.html',
  styleUrl: './resumen-data.component.css'
})
export class ResumenDataComponent implements OnInit {
  
  private readonly _dashboardService = inject(DashboardService);
  basicData?:any;
  basicOptions?:any;

  alumnos_en_practica?: CantidadAlumnosEnPractica;

  ngOnInit(): void {
    this.obtenerCantidadAlumnos();

    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Practica 1',
          backgroundColor: '#42A5F5',
          data: [65, 59, 80, 81, 56],
        },
        {
          label: 'Practica 2',
          backgroundColor: '#FFA726',
          data: [28, 48, 40, 19, 86],
        },
      ],
    };

    // Opciones de configuración
    this.basicOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };
  }

  private obtenerCantidadAlumnos(){
    this._dashboardService.getCantidadEstudiantesEnPractica().subscribe(
      data => {
        this.alumnos_en_practica = data;
        console.log(data);
      }
    )
  }
}

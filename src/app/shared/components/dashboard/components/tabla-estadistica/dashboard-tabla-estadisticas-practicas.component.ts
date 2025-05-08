import { Component, inject, output, signal } from '@angular/core';
import { DataEstadisticaPracticaService } from '../../../../../gestion-practicas/services/data-estadistica-practica.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-tabla-estadisticas-practicas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-tabla-estadisticas-practicas.component.html',
  styleUrl: './dashboard-tabla-estadisticas-practicas.component.css'
})
export class DashboardTablaEstadisticasPracticasComponent {

  dashboardService = inject(DataEstadisticaPracticaService);

  


}

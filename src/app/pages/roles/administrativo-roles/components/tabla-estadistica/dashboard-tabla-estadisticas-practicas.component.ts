import { Component, inject, signal } from '@angular/core';
import { DataEstadisticaPracticaService } from '../../services/data-estadistica-practica.service';

@Component({
  selector: 'app-dashboard-tabla-estadisticas-practicas',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-tabla-estadisticas-practicas.component.html',
  styleUrl: './dashboard-tabla-estadisticas-practicas.component.css'
})
export class DashboardTablaEstadisticasPracticasComponent {

  dashboardService = inject(DataEstadisticaPracticaService);
  modalDetallePractica = signal(false);

  abrirCerrarModal(){
    this.modalDetallePractica.update( (current: boolean) => !current);
  }


}

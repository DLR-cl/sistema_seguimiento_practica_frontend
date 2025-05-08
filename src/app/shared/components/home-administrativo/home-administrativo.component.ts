import { Component, inject, signal } from '@angular/core';

import { DataEstadisticaPracticaService } from '../../../gestion-practicas/services/data-estadistica-practica.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
@Component({
  selector: 'app-home-administrativo',
  imports: [DashboardComponent],
  standalone: true,
  templateUrl: './home-administrativo.component.html',
  styleUrl: './home-administrativo.component.css'
})
export class HomeAdministrativoComponent {
  //TODO: Fix, problema al volver de una ventana al inicio.
  cargando = signal<boolean>(true);
  dataEstadisticaService = inject(DataEstadisticaPracticaService);

  finalizoCarga(estado: boolean){
    this.cargando.set(estado);
  }

}

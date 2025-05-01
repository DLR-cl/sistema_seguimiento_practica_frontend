import { Component, inject, signal } from '@angular/core';

import { HeaderComponent } from "../../../pages/roles/jefe_compartido/header-jefes/header.component";
import { DashboardComponent } from '../../../features/dashboard/dashboard.component';
import { DataEstadisticaPracticaService } from '../../services/data-estadistica-practica.service';

@Component({
  selector: 'app-home-administrativo',
  standalone: true,
  imports: [DashboardComponent, HeaderComponent],
  templateUrl: './home-administrativo.component.html',
  styleUrl: './home-administrativo.component.css'
})
export class HomeAdministrativoComponent {

  cargando = signal<boolean>(true);
  dataEstadisticaService = inject(DataEstadisticaPracticaService);

  finalizoCarga(estado: boolean){
    this.cargando.set(estado);
  }

}

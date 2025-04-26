import { Component, signal } from '@angular/core';
import { DashboardComponent } from "../../../jefe_compartido/dashboard/dashboard.component";
import { HeaderComponent } from "../../../jefe_compartido/header-jefes/header.component";

@Component({
  selector: 'app-home-administrativo',
  standalone: true,
  imports: [DashboardComponent, HeaderComponent],
  templateUrl: './home-administrativo.component.html',
  styleUrl: './home-administrativo.component.css'
})
export class HomeAdministrativoComponent {

  cargando = signal<boolean>(true);

  finalizoCarga(estado: boolean){
    this.cargando.set(estado);
  }

}

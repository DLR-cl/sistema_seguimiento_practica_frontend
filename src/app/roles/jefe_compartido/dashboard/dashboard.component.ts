import { Component } from '@angular/core';
import { AlumnosEnPracticaCardComponent } from "../alumnos-en-practica-card/alumnos-en-practica-card.component";
import { AlumnosSinInformeCardComponent } from "../alumnos-sin-informe-card/alumnos-sin-informe-card.component";
import { DocentesSinInformesCardComponent } from "../docentes-sin-informes-card/docentes-sin-informes-card.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AlumnosEnPracticaCardComponent, AlumnosSinInformeCardComponent, DocentesSinInformesCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}

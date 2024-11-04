import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderJefeEmpleadorComponent } from "../header-jefe-empleador/header-jefe-empleador.component";

@Component({
  selector: 'app-ver-informes-pendientes',
  standalone: true,
  imports: [HeaderJefeEmpleadorComponent],
  templateUrl: './ver-informes-pendientes.component.html',
  styleUrl: './ver-informes-pendientes.component.css'
})
export class VerInformesPendientesComponent {

  private readonly _router = inject(Router);

  goToInforme(){
    this._router.navigate(['jefe_alumno/formulario_primer_practica'])
  }
}

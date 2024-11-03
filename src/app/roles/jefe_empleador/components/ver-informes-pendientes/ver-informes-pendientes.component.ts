import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-informes-pendientes',
  standalone: true,
  imports: [],
  templateUrl: './ver-informes-pendientes.component.html',
  styleUrl: './ver-informes-pendientes.component.css'
})
export class VerInformesPendientesComponent {

  private readonly _router = inject(Router);

  goToInforme(){
    this._router.navigate(['jefe_alumno/formulario_primer_practica'])
  }
}

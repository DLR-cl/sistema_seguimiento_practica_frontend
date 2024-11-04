import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fin-informe-jefe-empleador',
  standalone: true,
  imports: [],
  templateUrl: './fin-informe-jefe-empleador.component.html',
  styleUrl: './fin-informe-jefe-empleador.component.css'
})
export class FinInformeJefeEmpleadorComponent {

  private readonly _router = inject(Router);

  goToHome(){
    this._router.navigate(['home-jefe-alumno']);
  }
}

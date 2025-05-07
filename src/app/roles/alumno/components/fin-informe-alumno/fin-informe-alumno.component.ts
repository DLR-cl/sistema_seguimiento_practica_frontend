import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fin-informe-alumno',
  standalone: true,
  imports: [],
  templateUrl: './fin-informe-alumno.component.html',
  styleUrl: './fin-informe-alumno.component.css'
})
export class FinInformeAlumnoComponent {
  private readonly _router = inject(Router);

  goToHome(){
    this._router.navigate(['/alumno']);
  }
}

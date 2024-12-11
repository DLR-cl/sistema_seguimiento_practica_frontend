import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabla-funciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-funciones.component.html',
  styleUrl: './tabla-funciones.component.css'
})
export class TablaFuncionesComponent {
  asignado:boolean = true;
}

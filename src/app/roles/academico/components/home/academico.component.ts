import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilDataComponent } from '../perfil-data/perfil-data.component';
import { TablaFuncionesComponent } from '../tabla-funciones/tabla-funciones.component';

@Component({
  selector: 'app-academico',
  standalone: true,
  imports: [PerfilDataComponent, TablaFuncionesComponent, CommonModule],
  templateUrl: './academico.component.html',
  styleUrl: './academico.component.css'
})
export class AcademicoComponent {
  cargando: boolean = true;

  finalizoCarga(estado: boolean) {
    if (!estado) {
      this.cargando = false;
    }
  }
}


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../pages/roles/jefe_compartido/header-jefes/header.component';
import { PerfilDataComponent } from '../perfil-data/perfil-data.component';
import { TablaFuncionesComponent } from '../tabla-funciones/tabla-funciones.component';

@Component({
  selector: 'app-academico',
  standalone: true,
  imports: [HeaderComponent, PerfilDataComponent, TablaFuncionesComponent, CommonModule],
  templateUrl: './academico.component.html',
  styleUrl: './academico.component.css'
})
export class AcademicoComponent{

  cargando: boolean = true

  finalizoCarga(estado: boolean){
    this.cargando = estado
  }

}


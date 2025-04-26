import { Component } from '@angular/core';
import { HeaderComponent } from "../jefe_compartido/header-jefes/header.component";
import { PerfilDataComponent } from "./components/perfil-data/perfil-data.component";
import { TablaFuncionesComponent } from "./components/tabla-funciones/tabla-funciones.component";
import { CommonModule } from '@angular/common';

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


import { Component } from '@angular/core';
import { HeaderComponent } from "../header-jefes/header.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ResultadoPracticaComponent } from "../resultado-practica/resultado-practica.component";
import { ResumenDataComponent } from "../components/resumen-data/resumen-data.component";
import { IndicadoresComponent } from "../components/indicadores/indicadores.component";
@Component({
  selector: 'app-home-administracion',
  standalone: true,
  imports: [HeaderComponent, DashboardComponent, ResultadoPracticaComponent, ResumenDataComponent, IndicadoresComponent],
  templateUrl: './home-administracion.component.html',
  styleUrl: './home-administracion.component.css'
})
export class HomeAdministracionComponent {
  nombre: string = "Diego Villagra";
}

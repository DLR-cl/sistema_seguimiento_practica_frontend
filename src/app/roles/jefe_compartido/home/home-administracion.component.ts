import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../header-jefes/header.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ResultadoPracticaComponent } from "../resultado-practica/resultado-practica.component";
import { ResumenDataComponent } from "../components/resumen-data/resumen-data.component";
import { IndicadoresComponent } from "../components/indicadores/indicadores.component";
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';
import { PerfilDataComponent } from "../../academico/components/perfil-data/perfil-data.component";
import { TablaFuncionesComponent } from "../../academico/components/tabla-funciones/tabla-funciones.component";
@Component({
  selector: 'app-home-administracion',
  standalone: true,
  imports: [HeaderComponent, DashboardComponent, ResultadoPracticaComponent, ResumenDataComponent, IndicadoresComponent, PerfilDataComponent, TablaFuncionesComponent],
  templateUrl: './home-administracion.component.html',
  styleUrl: './home-administracion.component.css'
})
export class HomeAdministracionComponent implements OnInit{

  nombre?:string;
  private dataUser?:any;
  private readonly _authService = inject(AuthStateService);
  ngOnInit(): void {
    this.dataUser = this._authService.getData();
    this.nombre = this.dataUser.nombre;
    console.log(this.dataUser);
  }

}

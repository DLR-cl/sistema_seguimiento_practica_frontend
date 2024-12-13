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
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-home-administracion',
  standalone: true,
  imports: [HeaderComponent, DashboardComponent, ResultadoPracticaComponent, ResumenDataComponent, IndicadoresComponent, PerfilDataComponent, TablaFuncionesComponent, CommonModule, ChartModule, TableModule],
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



  // Datos para los resúmenes
  alumnos_en_practica = {
    cantidad_alumnos_practica: 15,
  };

  // Datos para el gráfico de barras
  basicData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Prácticas realizadas',
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        data: [12, 19, 3, 5, 2],
      },
    ],
  };

  basicOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // Datos para los gráficos de dona
  dataPractica1 = {
    labels: ['Aprobadas', 'Pendientes'],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: ['#4CAF50', '#F44336'],
        hoverBackgroundColor: ['#66BB6A', '#EF5350'],
      },
    ],
  };

  dataPractica2 = {
    labels: ['Aprobadas', 'Pendientes'],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ['#FFCA28', '#D32F2F'],
        hoverBackgroundColor: ['#FFD54F', '#E53935'],
      },
    ],
  };

  options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

}

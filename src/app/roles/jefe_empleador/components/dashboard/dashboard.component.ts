import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from "../../../jefe_compartido/header-jefes/header.component";
import { JefeAlumnoInterface } from '../../data-access/interface/jefe-alumno.interface';
import { DataJefeAlumnoService } from '../../services/data-jefe-alumno.service';
import { InformeConfidencialService } from '../../services/informe-confidencial.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ChartModule, ListboxModule, ButtonModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private informeConfidencialService: InformeConfidencialService,
    private _jefeDataService: DataJefeAlumnoService,
    private _router: Router
  ){}

  public dataJefe?:JefeAlumnoInterface | null;

  public dataEmpresa: any

  ngOnInit(): void {
    this._jefeDataService.getData().subscribe({
      next: data =>{
        this.dataJefe = data;
        console.log(this.dataJefe)
        if (this.dataJefe?.id_jefe && this.dataJefe.id_empresa) {
          console.log(this.dataJefe)
          this.obtenerPracticas();
          this.obtenerEmpresa(this.dataJefe.id_empresa);
          this.obtenerAlumnosAsignados()
        }
      },
      error: error =>{
        console.error('Error al capturar la data', error);

      }
    })
  }

  alumnosAsignados!: number;
  informesPendientes!:number;
  totalInformes = 25;

  // Datos de informes pendientes y detalles, con nombres de prácticas
  detalleInformes: any = []

  informesPendientesList = []

  selectedInforme: any;
  
  // Función para ver detalles de informes
  verInforme(informe: any) {
    alert(`Ver informe: ${informe.tipo_practica} de ${informe.nombre_alumno}`);
  }

  obtenerPracticas() {
    this.informeConfidencialService.obtenerDestallesInformes().subscribe({
      next: result => {
        console.log(result);
        this.informesPendientes = result.filter((practica: any) => practica.estado_informe == 'ESPERA').length;
        this.detalleInformes = result.filter((informe: any) => {
          const fechaActual = new Date();
          const fechaLimite = new Date(informe.fecha_limite_entrega);
          const diferenciaDias = Math.ceil((fechaActual.getTime() - fechaLimite.getTime()) / (1000 * 60 * 60 * 24));
          return diferenciaDias <= 7; // fecha limite no más antigua que una semana
        });
        this.informesPendientesList = this.detalleInformes.filter(
          (informe: any) => informe.estado_informe == 'ESPERA'
        );
      },
      error: error => {
        console.error('Error obteniendo prácticas', error);
      }
    });
  }
  
  obtenerAlumnosAsignados() {
    this.informeConfidencialService.obtenerAlumnosAsignados().subscribe({
      next: result => {
        console.log(result)
        this.alumnosAsignados = result.cantAlumnosAsignados;
        this.totalInformes = result.cantidadTotalInformes
      },
      error: error => {
        console.error('Error obteniendo alumnos asignados', error);
      }
    });
  }
  

  obtenerEmpresa(id_empresa: number){
    this.informeConfidencialService.obtenerDatosEmpresa().subscribe({
      next: result =>{
        this.dataEmpresa = result.find((empresa:any) => empresa.id_empresa == id_empresa)
        console.log(this.dataEmpresa)
      },
      error: error =>{
        console.log('error', error)
      }
    })
  }



  realizarInforme(id_informe: number) {
    console.log('Realizando informe:', id_informe);
    this._router.navigate(['jefe_alumno/formulario_primer_practica/'+id_informe])
  }  
}

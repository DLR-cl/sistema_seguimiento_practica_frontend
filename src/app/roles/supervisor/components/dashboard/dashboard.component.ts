import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { JefeAlumnoInterface } from '../../interface/jefe-alumno.interface';
import { DataJefeAlumnoService } from '../../services/data-jefe-alumno.service';
import { InformeConfidencialService } from '../../services/informe-confidencial.service';
import { Router } from '@angular/router';
import { AuthStateService } from '../../../../shared/data-access/auth-state.service';
import { DialogModule } from 'primeng/dialog';

import { Empresa } from '../../../../pages/roles/jefe_compartido/dto/empresa.dto';
import type { PracticaAlumno } from '../../../../gestion-practicas/interfaces/practica-alumno.interface';
import { DetallesInformes } from '../../dto/informe-confidencial.dto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ChartModule, ListboxModule, ButtonModule, DialogModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private informeConfidencialService: InformeConfidencialService,
    private jefeDataService: DataJefeAlumnoService,
    private router: Router,
    private authStateService: AuthStateService,
  ){}

  @Output() estadoCargando = new EventEmitter<boolean>();
  public cargando: boolean = true;
  public cargandoPractica: boolean = false;

  public dataJefe?:JefeAlumnoInterface | null;

  

  public dataEmpresa!: Empresa;

  ngOnInit(): void {
    this.jefeDataService.getData().subscribe({
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
  totalInformes!:number;

  // Datos de informes pendientes y detalles, con nombres de prácticas
  detalleInformes: DetallesInformes[] = []

  informesPendientesList:  DetallesInformes[] = []

  selectedInforme!: DetallesInformes;
  
  modalDetalles = false;

  practicaSeleccionada!: PracticaAlumno | null

  tipoPractica: Record<string, string> = {
    PRACTICA_DOS: 'Práctica Profesional II',
    PRACTICA_UNO: 'Práctica Profesional I'
  }

  textoEstadoInforme: Record<string, string> = {
    ENVIADA: 'Enviado',
    REVISION: 'Revisión',
    CORRECCION: 'Corrección',
    ESPERA: 'Espera',
    APROBADA: 'Aprobada',
    DESAPROBADA: 'Desaprobada'
  };

  textoEstadoPractica: Record<string, string> = {
    CURSANDO: 'Cursando',
    REVISION_GENERAL: 'Revisión General',
    ESPERA_INFORMES: 'Espera Informes',
    FINALIZADA: 'Finalizada',
    INFORMES_RECIBIDOS: 'Informes Recibidos'
  };


  textoModalidad: Record<string, string> = {
    PRESENCIAL: 'Presencial',
    REMOTO: 'Remoto',
    SEMI_PRESENCIAL: 'Semipresencial'
  };

  cargandoPracticas: Set<number> = new Set<number>();


  cerrarModalDetalles() {
    this.modalDetalles = false;
    this.practicaSeleccionada = null;
  }

  // Función para ver detalles de informes
  verInforme(informe: any) {
    const idInforme = informe.id_informe_confidencial;
    if (!this.cargandoPracticas.has(idInforme)) {
      this.cargandoPracticas.add(idInforme); // Agrega el ID al conjunto de "cargando"

      this.informeConfidencialService.obtenerPractica(informe.id_practica).subscribe({
        next: result => {
          this.selectedInforme = informe
          this.practicaSeleccionada = result
          this.modalDetalles = true
          this.cargandoPracticas.delete(idInforme);
        },
        error: error => {
          console.log(error)
          this.cargandoPracticas.delete(idInforme);
        }
      })
    }
    
    
  }

  obtenerPracticas() {
    const token = this.authStateService.getSession()?.access_token
    console.log(token)
    if(token){

      this.informeConfidencialService.obtenerDestallesInformes(token).subscribe({
        next: result => {
          console.log(result);
          this.informesPendientes = result.filter(practica => practica.estado_informe == 'ESPERA').length;
          this.detalleInformes = result.filter(informe => {
            const fechaActual = new Date();
            const fechaLimite = new Date(informe.fecha_limite_entrega);
            const diferenciaDias = Math.ceil((fechaActual.getTime() - fechaLimite.getTime()) / (1000 * 60 * 60 * 24));
            return diferenciaDias <= 500;
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
  }
  
  obtenerAlumnosAsignados() {
    this.informeConfidencialService.obtenerAlumnosAsignados().subscribe({
      next: result => {
        console.log(result, 'asignados')
        this.alumnosAsignados = result.cantAlumnosAsignados;
        this.totalInformes = result.cantidadTotalInformes
        this.cargando = false
        this.estadoCargando.emit(this.cargando);        
      },
      error: error => {
        console.error('Error obteniendo alumnos asignados', error);
      }
    });
  }
  

  obtenerEmpresa(id_empresa: number){
    this.informeConfidencialService.obtenerDatosEmpresas().subscribe({
      next: result =>{
        this.dataEmpresa = result.find(empresa => empresa.id_empresa == id_empresa)!
        console.log(this.dataEmpresa)
      },
      error: error =>{
        console.log('error', error)
      }
    })
  }



  realizarInforme(id_informe: number) {
    console.log('Realizando informe:', id_informe);
    this.router.navigate(['jefe_alumno/formulario_primer_practica/'+id_informe])
  }  
}

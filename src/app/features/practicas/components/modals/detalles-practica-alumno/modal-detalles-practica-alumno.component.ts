import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Practica } from '../../../../../roles/alumno/interfaces/alumno.interface';
import { PracticaAlumno } from '../../../../../gestion-practicas/interfaces/practica-alumno.interface';
import { AcademicoData } from '../../../../../gestion-practicas/interfaces/academico-info.interface';
import { ModalDetallesInformacionGeneralComponent } from "../modal-detalles-informacion-general/modal-detalles-informacion-general.component";
import { ModalDetallesInfoAcademicoPracticaComponent } from "../modal-detalles-info-academico-practica/modal-detalles-info-academico-practica.component";
import { DataPracticaAlumnoService } from '../../../../../gestion-practicas/services/data-practica-alumno.service';
import { DetallePractica } from '../../../../../gestion-practicas/interfaces/detalle-practica.interface';
import { DataEstadisticaPracticaService } from '../../../../../gestion-practicas/services/data-estadistica-practica.service';

@Component({
  selector: 'app-modal-detalles-practica-alumno',
  standalone: true,
  imports: [DialogModule, ChartModule, TableModule, ButtonModule, CommonModule, ModalDetallesInformacionGeneralComponent, ModalDetallesInfoAcademicoPracticaComponent],
  templateUrl: './modal-detalles-practica-alumno.component.html',
  styleUrl: './modal-detalles-practica-alumno.component.css'
})
export class ModalDetallesPracticaAlumnoComponent implements OnInit{

  // COMPONENTE QUE VISUALIZA EL DETALLE DE LAS PRACTICAS DE LOS ALUMNOS.

  // Inyección servicios
  public dataPracticaAlumnoService = inject(DataPracticaAlumnoService);
  public dataEstadisticaAlumno = inject(DataEstadisticaPracticaService);
  modalDetalles = false;
  

  // Variables
  practica = input.required<DetallePractica>();

  // se envian a los hijos
  practicaAlumno = signal<PracticaAlumno | null>(null);
  academico = signal<AcademicoData | null>(null);


  // Llamar datos solo cuando el modal es creado
  ngOnInit(): void {
    this.getDataAlumno();
    if(this.practicaAlumno()?.informe_alumno){
      this.getDataAcademico();
    }
  }

  getDataAlumno() {
    // Obtengo la práctica del alumno
    this.dataPracticaAlumnoService.getDataPracticaAlumno(this.practica().id_practica).subscribe( resp => {
      this.practicaAlumno.set(resp);
    });

  }

  getDataAcademico() {
    this.dataPracticaAlumnoService.getDataAcademico(this.practicaAlumno()?.informe_alumno.id_academico!).subscribe(
      resp => {
        this.academico.set(resp);
      }
    );
  }

}

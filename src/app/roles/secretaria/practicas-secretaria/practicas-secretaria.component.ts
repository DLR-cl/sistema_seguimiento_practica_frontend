import { Component, inject, OnInit } from '@angular/core';
import { HeaderSecretariaComponent } from "../header-secretaria/header-secretaria.component";
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AcademicoAsociado, AcademicoInformes, AsignacionInformesService, PracticaInfo } from '../services/asignacion-informes.service';

@Component({
  selector: 'app-practicas-secretaria',
  standalone: true,
  imports: [HeaderSecretariaComponent, CommonModule, DropdownModule, FormsModule, DialogModule],
  templateUrl: './practicas-secretaria.component.html',
  styleUrl: './practicas-secretaria.component.css'
})
export class PracticasSecretariaComponent implements OnInit {

  private readonly _asignacionService = inject(AsignacionInformesService);

  ngOnInit(): void {
    this.getProfesores(),
    this.getPracticas()
  }

  practicasBackend: PracticaInfo[] = []
  profesoresBackend: AcademicoInformes[] = []
  
  modalAsignacion = false;
  modalDetalles = false;
  practicaSeleccionada!: PracticaInfo | null;
  copiaPractica!: PracticaInfo | null;

  textoEstado: Record<string, string> = {
    REVISION_INFORME_ALUMNO: 'Revisión Informe Alumno',
    REVISION_GENERAL: 'Revisión General',
    ESPERA_INFORME_ALUMNO: 'Espera Informe Alumno',
    CURSANDO: 'Cursando'
  };

  textoModalidad: Record<string, string> = {
    PRESENCIAL: 'Presencial',
    REMOTO: 'Remoto',
    SEMI_PRESENCIAL: 'Semipresencial'
  };

  abrirModal() {
    this.modalAsignacion = true;
  }

  asignarProfesor(profesor: AcademicoInformes) {
    if (this.copiaPractica!.academico_nombre) {
      const profesorAnterior = this.profesoresBackend.find(p => p.nombre_academico === this.copiaPractica!.academico_nombre);
      if (profesorAnterior) profesorAnterior.cantidad_informes--;
    }

    this.copiaPractica!.academico_nombre = profesor.nombre_academico;
    this.copiaPractica!.academico_rut = profesor.rut_academico;
    profesor.cantidad_informes++;
  }

  quitarProfesor() {
    const profesor = this.profesoresBackend.find(p => p.nombre_academico === this.copiaPractica!.academico_nombre);
    if (profesor) profesor.cantidad_informes--;
    this.copiaPractica!.academico_nombre = '';
    this.copiaPractica!.academico_rut = '';
    console.log(this.copiaPractica)
  }

  confirmarAsignacion() {
    if(this.copiaPractica?.academico_nombre !== ''){
      const academicoAsociado: AcademicoAsociado = {
        id_informe: this.copiaPractica?.id_informe!,
        id_academico: this.profesoresBackend.find(academico => academico.nombre_academico === this.copiaPractica?.academico_nombre)?.id_academico!
      }
  
      this._asignacionService.asociarInformeAcademico(academicoAsociado).subscribe(result => {
        this.cerrarModalAsignacion();
        this.getProfesores()
        this.getPracticas();
        console.log(this.copiaPractica)
      })
    } else{
      alert('Debe asignar un profesor antes de confirmar')
    }
    
  }

  cancelarAsignacion() {
    if (this.copiaPractica!.academico_nombre) {
      const profesorActual = this.profesoresBackend.find(p => p.nombre_academico === this.copiaPractica!.academico_nombre);
      if (profesorActual) profesorActual.cantidad_informes--;
    }
  
    if (this.practicaSeleccionada?.academico_nombre) {
      const profesorOriginal = this.profesoresBackend.find(p => p.nombre_academico === this.practicaSeleccionada?.academico_nombre);
      if (profesorOriginal) profesorOriginal.cantidad_informes++;
    }  
    this.copiaPractica = {... this.practicaSeleccionada!}
    this.cerrarModalAsignacion();
  }

  cerrarModalAsignacion() {
    this.modalAsignacion = false;
  }

  public getProfesores(){
   this._asignacionService.getProfesores().subscribe(result =>{
    this.profesoresBackend = result
   }) 
  }

  public getPracticas(){
    this._asignacionService.getPracticas().subscribe(result =>{
      this.practicasBackend = result
      if(this.modalDetalles){
        this.practicaSeleccionada = result.find(practica => practica.id_practica == this.practicaSeleccionada?.id_practica)!
      }
    })
  }

  abrirModalDetalles(practica: any) {
    this.practicaSeleccionada = practica;
    this.modalDetalles = true;  
    this.copiaPractica = { ...practica };
  }
  
  cerrarModalDetalles() {
    this.modalDetalles = false;
    this.practicaSeleccionada = null;
  }

}
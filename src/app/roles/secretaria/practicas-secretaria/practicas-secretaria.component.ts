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

  abrirModal(practica: PracticaInfo) {
    console.log(practica)
    this.modalAsignacion = true;
    this.practicaSeleccionada = practica;  
    this.copiaPractica = { ...practica }; // Crear copia temporal
  }

  asignarProfesor(profesor: AcademicoInformes) {
    // Actualiza la copia temporal
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
  }

  confirmarAsignacion() {
    const academicoAsociado: AcademicoAsociado = {
      id_informe: this.copiaPractica?.id_informe!,
      id_academico: this.profesoresBackend.find(academico => academico.nombre_academico === this.copiaPractica?.academico_nombre)?.id_academico!
    }

    console.log(academicoAsociado)
    this._asignacionService.asociarInformeAcademico(academicoAsociado).subscribe(result => {
      console.log(result)
      this.cerrarModalAsignacion();
      this.getPracticas();
      this.getProfesores();
    })
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
    this.cerrarModalAsignacion();
  }

  cerrarModalAsignacion() {
    this.modalAsignacion = false;
    this.copiaPractica = null;
  }

  public getProfesores(){
   this._asignacionService.getProfesores().subscribe(result =>{
    this.profesoresBackend = result
    console.log(this.profesoresBackend)
   }) 
  }

  public getPracticas(){
    this._asignacionService.getPracticas().subscribe(result =>{
      this.practicasBackend = result
      console.log(this.practicasBackend)
    })
  }
}
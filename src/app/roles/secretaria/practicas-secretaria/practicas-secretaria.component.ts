import { Component } from '@angular/core';
import { HeaderSecretariaComponent } from "../header-secretaria/header-secretaria.component";
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-practicas-secretaria',
  standalone: true,
  imports: [HeaderSecretariaComponent, CommonModule, DropdownModule, FormsModule, DialogModule],
  templateUrl: './practicas-secretaria.component.html',
  styleUrl: './practicas-secretaria.component.css'
})
export class PracticasSecretariaComponent {

  practicas = [
    {
      tipo: 'I',
      nombreAlumno: 'Juan Pérez',
      estadoInforme: 'En espera de revisión',
      fechaFinalizacion: new Date('2023-12-15'),
      profesor: null,
    },
    {
      tipo: 'II',
      nombreAlumno: 'Juan Gonzalez',
      estadoInforme: 'En espera de revisión',
      fechaFinalizacion: new Date('2024-12-15'),
      profesor: null,
    },
    {
      tipo: 'II',
      nombreAlumno: 'Ana Gómez',
      estadoInforme: 'Revisado',
      fechaFinalizacion: new Date('2023-11-20'),
      profesor: 'Jhosep Marca',
    },
    {
      tipo: 'I',
      nombreAlumno: 'Carlos Fuentes',
      estadoInforme: 'En espera de subida',
      fechaFinalizacion: new Date('2024-01-10'),
      profesor: null,
    },
    {
      tipo: 'II',
      nombreAlumno: 'Lucía Torres',
      estadoInforme: 'Revisado',
      fechaFinalizacion: new Date('2023-12-01'),
      profesor: 'Leandro Molina',
    },
  ];

  profesores = [
    { nombre: 'Andrés Martínez', informesAsignados: 2 },
    { nombre: 'Laura Sánchez', informesAsignados: 1 },
    { nombre: 'Javier Gómez', informesAsignados: 0 },
    { nombre: 'Claudia Díaz', informesAsignados: 4 },
  ];

  modalAbierto = false;
  practicaSeleccionada: any = null; // Referencia a la práctica original
  copiaPractica: any = null; // Copia temporal para modificaciones

  abrirModal(practica: any) {
    console.log(practica)
    this.modalAbierto = true;
    this.practicaSeleccionada = practica;  
    this.copiaPractica = { ...practica }; // Crear copia temporal
  }

  asignarProfesor(profesor: any) {
    // Actualiza la copia temporal
    if (this.copiaPractica.profesor) {
      const profesorAnterior = this.profesores.find(p => p.nombre === this.copiaPractica.profesor);
      if (profesorAnterior) profesorAnterior.informesAsignados--;
    }

    this.copiaPractica.profesor = profesor.nombre;
    profesor.informesAsignados++;
  }

  quitarProfesor() {
    const profesor = this.profesores.find(p => p.nombre === this.copiaPractica.profesor);
    if (profesor) profesor.informesAsignados--;
    this.copiaPractica.profesor = null;
  }

  confirmarAsignacion() {
    Object.assign(this.practicaSeleccionada, this.copiaPractica);
    this.cerrarModal();
  }

  cancelarAsignacion() {
    if (this.copiaPractica.profesor) {
      const profesorActual = this.profesores.find(p => p.nombre === this.copiaPractica.profesor);
      if (profesorActual) profesorActual.informesAsignados--;
    }
  
    if (this.practicaSeleccionada.profesor) {
      const profesorOriginal = this.profesores.find(p => p.nombre === this.practicaSeleccionada.profesor);
      if (profesorOriginal) profesorOriginal.informesAsignados++;
    }  
    this.cerrarModal();
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.copiaPractica = null; // Limpiar la copia temporal
  }
}
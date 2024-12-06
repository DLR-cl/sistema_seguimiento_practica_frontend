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
  practicaSeleccionada: any = null;

  // Abre el modal para seleccionar el profesor
  abrirModal(practica: any) {
    this.modalAbierto = true;
    this.practicaSeleccionada = practica;
  }

  // Asigna un profesor a la práctica
  asignarProfesor(profesor: any) {
    if (this.practicaSeleccionada.profesor) {
      // Si ya hay un profesor asignado, lo quitamos y decrementamos los informes asignados
      const profesorAnterior = this.profesores.find(p => p.nombre === this.practicaSeleccionada.profesor);
      if (profesorAnterior) {
        profesorAnterior.informesAsignados--;
      }
    }

    // Asignar el nuevo profesor
    this.practicaSeleccionada.profesor = profesor.nombre;
    profesor.informesAsignados++; // Incrementa los informes asignados
  }

  // Quita un profesor de la práctica
  quitarProfesor() {
    const profesor = this.profesores.find(p => p.nombre === this.practicaSeleccionada.profesor);
    if (profesor) profesor.informesAsignados--; // Decrementa los informes asignados

    this.practicaSeleccionada.profesor = null; // Elimina la asignación
  }

  // Confirma la asignación y cierra el modal
  confirmarAsignacion() {
    this.modalAbierto = false;
  }

  // Cancela la asignación y restaura el estado
  cancelarAsignacion() {
    const profesor = this.profesores.find(p => p.nombre === this.practicaSeleccionada.profesor);
    if (profesor && this.practicaSeleccionada.profesor) {
      profesor.informesAsignados--; // Restaura los informes asignados
    }
    this.practicaSeleccionada.profesor = null; // Restaura la asignación
    this.modalAbierto = false;
  }
}

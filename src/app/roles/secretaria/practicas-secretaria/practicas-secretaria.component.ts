import { Component } from '@angular/core';
import { HeaderSecretariaComponent } from "../header-secretaria/header-secretaria.component";
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-practicas-secretaria',
  standalone: true,
  imports: [HeaderSecretariaComponent, CommonModule, DropdownModule, FormsModule],
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
    'Andrés Martínez',
    'Laura Sánchez',
    'Javier Gómez',
    'Claudia Díaz',
  ];

  // Variable para saber cuál práctica se está editando
  selectedPracticaId: number | null = null;

  // Función para activar o desactivar la visibilidad del dropdown
  toggleDropdown(practicaId: number) {
    // Solo mostramos el dropdown si la práctica no tiene profesor asignado
    if (this.selectedPracticaId === practicaId) {
      this.selectedPracticaId = null; // Si ya es la práctica seleccionada, desactivamos
    } else {
      this.selectedPracticaId = practicaId; // Si no, la seleccionamos
    }
  }

  // Función para asignar profesor
  asignarProfesor(practica: any, profesor: string) {
    practica.profesor = profesor;
    this.selectedPracticaId = null; // Ocultar el dropdown después de asignar
  }
}

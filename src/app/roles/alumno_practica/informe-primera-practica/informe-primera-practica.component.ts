import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HeaderComponent } from "../components/header/header.component";
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

interface Pregunta{
  enunciado:string,
  tipo: string,
}

@Component({
  selector: 'app-informe-primera-practica',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NgxPaginationModule, FormsModule],
  templateUrl: './informe-primera-practica.component.html',
  styleUrl: './informe-primera-practica.component.css'
})
export class InformePrimeraPracticaAlumnoComponent {

  private readonly _router = inject(Router);
  public datos_listo = false;
  public page: number=1;
  preguntas: Pregunta[]= [
    {
      enunciado: "¿Qué tan satisfecho estás con la experiencia general que obtuviste en esta práctica?",
      tipo: "Cerrada",
    },
    {
      enunciado: "¿Consideras que tus tareas y responsabilidades fueron adecuadas para tu nivel de conocimiento y habilidades?",
      tipo: "Cerrada"
    },
    {
      enunciado: "¿Sientes que tus habilidades y conocimientos fueron valorados en el lugar donde realizaste tu práctica?",
      tipo: "Cerrada",
    },
    {
      enunciado: "¿Cómo calificarías el ambiente laboral y la relación con tus compañeros y supervisores?",
      tipo: "Cerrada",
    },
    {
      enunciado: "¿Qué aspectos de tu desempeño consideras que fueron tus fortalezas durante la práctica?",
      tipo: "Abierta",
    },
    {
      enunciado: "¿En qué aspectos crees que podrías mejorar en futuras oportunidades de práctica o empleo?",
      tipo: "Abierta",
    },
    {
      enunciado: "¿Qué nota le pondrías a tu desempeño en esta práctica? (Esta evaluación no afecta tu nota final, es solo para fines de autoevaluación y mejora continua)",
      tipo: "Evaluativa",
    },
    {
      enunciado: "¿Qué asignaturas de la carrera te ayudaron más en la practica? (Máximo 4)",
      tipo: "Asignaturas",
    },
  ]
  asignaturas: string[] = [
      "Introducción a la ingeniería industrial",
      "Taller  de ingeniería industrial",
      "Gestión de empresas",
      "Contabilidad y costos",     
      "Microeconomía",
      "Macroeconomía",
      "Taller de intregración de conocimientos",
      "Investigación operativa",
      "Ingenieria económica",
      "Gestión de operaciones I",
      "Finanzas",
      "Marketing",
      "Comportamiento organizacional y capital humano",
      "Estadística para ingeniería",
      "Sistema de información administrativa",
      "Prep. y evaluación de proyectos de ingeniería industrial",
      "Sistema de gestión y aseguramiento de la calidad",
      "Modelos estocásticos",
      "Econometría",
      "Dirección estratégica",
      "Gestión de proyectos",
      "Gestión de operaciones II",
      "Logística",
      
  ]
  asignaturas_seleccionadas: string[] = [];
  asignaturaSeleccionada: string = '';
  respuestas: { [key: number]: number} = {};  
  preguntas_paginas = 3;
  preguntas_len = Math.ceil(this.preguntas.length / this.preguntas_paginas);
  
  uploadedFile: File | null = null;
  errorMessage: string = '';

  onFileSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;
    this.processFile(file);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.errorMessage = '';  // Clear previous errors

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.processFile(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  processFile(file: File | null): void {
    if (file) {
      // Verificar que el archivo sea PDF
      if (file.type === 'application/pdf') {
        this.uploadedFile = file;
        this.errorMessage = '';
      } else {
        this.uploadedFile = null;
        this.errorMessage = 'Solo se permiten archivos PDF. Por favor, selecciona un archivo válido.';
      }
    }
  }

  removeFile(): void {
    this.uploadedFile = null;
    this.errorMessage = '';
  }

  seleccionarArchivo(){
    const fileInput = document.getElementById('dropzone-file') as HTMLInputElement;
    if (fileInput) {
        fileInput.click(); // Simula un clic en el input de archivo
    }
  }

  goTofin(){
    this._router.navigate(['agradecimientos-alumno'])
  }

  changeForm(){
    this.datos_listo = !this.datos_listo;
  }

  getOptionText(value: number): string {
    switch(value) {
      case 1: return 'Muy en desacuerdo';
      case 2: return 'En desacuerdo';
      case 3: return 'Neutral';
      case 4: return 'De acuerdo';
      case 5: return 'Muy de acuerdo';
      default: return '';
    }
  }

  // agregar asignatura seleccionada
  agregarAsignatura() {
    if (this.asignaturaSeleccionada) {
      this.asignaturas_seleccionadas.push(this.asignaturaSeleccionada);
      this.asignaturaSeleccionada = ''; // Reinicia la asignatura seleccionada
    }
  }

  // eliminar una asignatura de las seleccionadas
  eliminarAsignatura(asignatura: string) {
    this.asignaturas_seleccionadas = this.asignaturas_seleccionadas.filter(a => a !== asignatura);
  }

  // filtrar asignaturas no seleccionadas (quitar las seleccionadas del listado)
  obtenerAsignaturasDisponibles() {
    return this.asignaturas.filter(asignatura => !this.asignaturas_seleccionadas.includes(asignatura));
  }
}

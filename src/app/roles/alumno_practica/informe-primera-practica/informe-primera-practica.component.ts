import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HeaderComponent } from "../components/header/header.component";
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';



interface Pregunta{
  enunciado:string,
  tipo: string,
}

interface Asignatura{
  nombre: string,
  codigo: string,
  tipo: string
}


@Component({
  selector: 'app-informe-primera-practica',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NgxPaginationModule, FormsModule, DialogModule],
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
  asignaturas_seleccionadas2: Asignatura[] = [];

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

  agregarAsignatura() {
    if (this.asignaturaSeleccionada) {
      this.asignaturas_seleccionadas.push(this.asignaturaSeleccionada);
      this.asignaturaSeleccionada = ''; // Reinicia la asignatura seleccionada
    }
  }

  eliminarAsignatura(asignatura: string) {
    this.asignaturas_seleccionadas = this.asignaturas_seleccionadas.filter(a => a !== asignatura);
  }

  obtenerAsignaturasDisponibles() {
    return this.asignaturas.filter(asignatura => !this.asignaturas_seleccionadas.includes(asignatura));
  }


  dialogVisible: boolean = false;
  tituloDialogo: string = 'Malla Curricular';

  mostrarDialogo() {
    this.dialogVisible = true;
  }
  
  asignaturasFPCeleste: string[] = ['ME-167', 'CC-802', 'ME-260', 'ME-263', 'ME-445', 'ME-264', 'ME-266']

  semestres = [
    {
      nombre: 'Primer Semestre',
      asignaturas: [
        { nombre: 'Introducción al Cálculo', codigo: 'MA-067', tipo: 'FB' },
        { nombre: 'Introducción al Álgebra', codigo: 'MA-069', tipo: 'FB' },
        { nombre: 'Introducción a la Física', codigo: 'FI-035', tipo: 'FB' },
        { nombre: 'Taller de comunicación y redacción de informes', codigo: 'IN-043', tipo: 'FG' },
        { nombre: 'Introducción a la ingeniería industrial', codigo: 'IN-048', tipo: 'FP' },
      ],
    },
    {
      nombre: 'Segundo Semestre',
      asignaturas: [
        { nombre: 'Cálculo I', codigo: 'MA-601', tipo: 'FB' },
        { nombre: 'Álgebra I', codigo: 'MA-611', tipo: 'FB' },
        { nombre: 'Química inorgánica y orgánica', codigo: 'QU-833', tipo: 'FB' },
        { nombre: 'Interpretación gráfica para ingeniería', codigo: 'ME-167', tipo: 'FP' },
        { nombre: 'Taller de ingeniería industrial', codigo: 'IN-600', tipo: 'FP' },
      ],
    },
    {
      nombre: 'Tercer Semestre',
      asignaturas: [
        { nombre: 'Cálculo II', codigo: 'MA-602', tipo: 'FB' },
        { nombre: 'Álgebra II', codigo: 'MA-612', tipo: 'FB' },
        { nombre: 'Mecánica clásica', codigo: 'FI-601', tipo: 'FB' },
        { nombre: 'Programación y algoritmo', codigo: 'CC-802', tipo: 'FP' },
        { nombre: 'Gestión de empresas', codigo: 'IN-055', tipo: 'FP' },
      ],
    },
    {
      nombre: 'Cuarto Semestre',
      asignaturas: [
        { nombre: 'Cálculo III', codigo: 'MA-603', tipo: 'FB' },
        { nombre: 'Ecuaciones diferenciales', codigo: 'MA-220', tipo: 'FB' },
        { nombre: 'Ingeniería de materiales', codigo: 'ME-260', tipo: 'FP' },
        { nombre: 'Termodinámica', codigo: 'ME-263', tipo: 'FP' },
        { nombre: 'Contabilidad y costos', codigo: 'IN-605', tipo: 'FP' },
      ],
    },
    {
      nombre: 'Quinto Semestre',
      asignaturas: [
        { nombre: 'Electromagnetismo', codigo: 'FI-604', tipo: 'FB' },
        { nombre: 'Estadística y probabilidad', codigo: 'MA-424', tipo: 'FP' },
        { nombre: 'Operaciones unitarias', codigo: 'ME-445', tipo: 'FP' },
        { nombre: 'Mecánica de fluidos', codigo: 'ME-264', tipo: 'FP' },
        { nombre: 'Microeconomía', codigo: 'IN-054', tipo: 'FP' },
      ],
    },
    {
      nombre: 'Sexto Semestre',
      asignaturas: [
        { nombre: 'Formación cultural', codigo: 'II-006', tipo: 'FG' },
        { nombre: 'Investigación operativa', codigo: 'IN-009', tipo: 'FP' },
        { nombre: 'Ingeniería económica', codigo: 'IN-010', tipo: 'FP' },
        { nombre: 'Procesos industriales y manufactura', codigo: 'ME-266', tipo: 'FP' },
        { nombre: 'Macroeconomía', codigo: 'IN-156', tipo: 'FP' },
      ],
    },
    {
      nombre: 'Septimo Semestre',
      asignaturas: [
        { nombre: 'Gestión de operaciones I', codigo: 'IN-217', tipo: 'FP' },
        { nombre: 'Finanzas', codigo: 'IN-014', tipo: 'FP' },
        { nombre: 'Marketing', codigo: 'IN-434', tipo: 'FP' },
        { nombre: 'Comportamiento organizacional y capital humano', codigo: 'IN-049', tipo: 'FP' },
        { nombre: 'Estadística para ingeniería', codigo: 'IN-059', tipo: 'FP' },
      ],
    },
    {
      nombre: 'Octavo Semestre',
      asignaturas: [
        { nombre: 'Sistema de información administrativa', codigo: 'IN-061', tipo: 'FP' },
        { nombre: 'Prep. y evaluación de proyectos de ingeniería industrial', codigo: 'IN-062', tipo: 'FP' },
        { nombre: 'Sistema de gestión y aseguramiento de la calidad', codigo: 'IN-063', tipo: 'FP' },
        { nombre: 'Modelos estocásticos', codigo: 'IN-064', tipo: 'FP' },
        { nombre: 'Econometría', codigo: 'IN-065', tipo: 'FP' },
      ],
    },
    {
      nombre: 'Noveno Semestre',
      asignaturas: [
        { nombre: 'Inglés comunicacional preintermedio I', codigo: 'DI-088', tipo: 'FG' },
        { nombre: 'Dirección estratégica', codigo: 'IN-067', tipo: 'FP' },
        { nombre: 'Gestión de proyectos', codigo: 'IN-608', tipo: 'FP' },
        { nombre: 'Gestión de operaciones II', codigo: 'IN-068', tipo: 'FP' },
        { nombre: 'Logística', codigo: 'IN-069', tipo: 'FP' },
      ],
    },
    {
      nombre: 'Decimo Semestre',
      asignaturas: [
        { nombre: 'Inglés comunicacional preintermedio II', codigo: 'DI-089', tipo: 'FG' },
        { nombre: 'E.F.P. I', codigo: 'YY-036', tipo: 'FP' },
        { nombre: 'E.F.P. II', codigo: 'YY-036', tipo: 'FP' },
        { nombre: 'E.F.P. III', codigo: 'YY-036', tipo: 'FP' },
        { nombre: 'E.F.P. IV', codigo: 'YY-036', tipo: 'FP' },
      ],
    },
  ];

  isSelected(asignatura: Asignatura): boolean {
    return this.asignaturas_seleccionadas2.some(a => a.codigo == asignatura.codigo);
  }

  // Alterna la selección de una asignatura
  toggleSeleccion(asignatura: Asignatura): void {
    if (this.isSelected(asignatura)) {
      // Si ya está seleccionada, la elimina
      this.asignaturas_seleccionadas2 = this.asignaturas_seleccionadas2.filter(a => a.codigo != asignatura.codigo);
    } else {
      // Si no está seleccionada, la agrega
      this.asignaturas_seleccionadas2.push(asignatura);
    }
    console.log(this.asignaturas_seleccionadas2)
  }
}

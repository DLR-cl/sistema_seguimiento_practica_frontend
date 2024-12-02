import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HeaderComponent } from "../components/header/header.component";
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { PreguntasInformeService } from '../../jefe_compartido/services/preguntas-informe.service';
import { createInforme, ListaRespuestas, Respuesta, RespuestasInformeService } from '../services/respuestas-informe.service';



interface Pregunta{
  id_pregunta: number,
  enunciado_pregunta:string,
  tipo_pregunta: string,
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
export class InformePrimeraPracticaAlumnoComponent implements OnInit {

  constructor(
    private preguntasService: PreguntasInformeService,
    private respuestasService: RespuestasInformeService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.obtenerPreguntas()
    this.idAlumno = Number(this.route.snapshot.paramMap.get('idAlumno'))!;
    this.idPractica = Number(this.route.snapshot.paramMap.get('idPractica'))!;
  }

  private readonly _router = inject(Router);
  datos_listo = false;
  page: number = 1;
  preguntas: Pregunta[]= []
  preguntas_paginas = 3;
  preguntas_len!: number;
  
  idAlumno!: number
  idPractica!: number

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
  asignaturas_seleccionadas: Asignatura[] = [];  
  
  
  respuestas: { [key: number]: number} = {};
  respuestasAlumno: Respuesta[] = []  
  
  
  uploadedFile: File | null = null;
  errorMessage: string = '';

  // Este método actualizará las respuestas según la pregunta
  actualizarRespuesta(preguntaId: number, respuesta: Respuesta) {
    const index = this.respuestasAlumno.findIndex(r => r.id_pregunta === preguntaId);
    if (index !== -1) {
      this.respuestasAlumno[index] = respuesta; // Actualizamos la respuesta si existe
    } else {
      this.respuestasAlumno.push(respuesta); // Si no existe, agregamos una nueva respuesta
    }
  }
  
  public guardarAsignaturas() {
    this.respuestasAlumno.forEach(respuesta => {
      // Verificamos si la respuesta tiene el atributo 'asignaturas'
      if (respuesta.asignaturas) {
        // Extraemos solo los nombres de las asignaturas
        respuesta.asignaturas = this.asignaturas_seleccionadas.map(asignatura => asignatura.nombre);
      }
    });
    this.dialogVisible = false;
    console.log('Respuestas con asignaturas asignadas:', this.respuestasAlumno);
  }

  public datos(){
    // console.log(this.respuestas),
    // console.log(this.asignaturas_seleccionadas)
    console.log(this.respuestasAlumno)
  }

  public obtenerPreguntas(){
    this.preguntasService.getPreguntasAlumno().subscribe(result=>{
      console.log(result)
      this.preguntas = result
      this.preguntas_len = Math.ceil(result.length / this.preguntas_paginas)
      this.respuestasAlumno = this.preguntas.map(preg => {
        let respuesta: Respuesta = {
          id_pregunta: preg.id_pregunta
        };    
        if (preg.tipo_pregunta === 'DESARROLLO_PROFESIONAL') {
          respuesta.asignaturas = []; 
        }    
        if (preg.tipo_pregunta === 'ABIERTA') {
          respuesta.texto = '';
        }    
        if (preg.tipo_pregunta === 'EVALUATIVA' || preg.tipo_pregunta === 'CERRADA') {
          respuesta.puntaje = 0;
        }
        return respuesta;
      });
      console.log(this.respuestasAlumno)
    })
  }

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

  dialogVisible: boolean = false;
  tituloDialogo: string = 'Malla Curricular';

  mostrarDialogo() {
    this.dialogVisible = true;
  }
  
  isSelected(asignatura: Asignatura): boolean {
    return this.asignaturas_seleccionadas.some(a => a.codigo == asignatura.codigo);
  }

  // Alterna la selección de una asignatura
  toggleSeleccion(asignatura: Asignatura): void {
    if (this.isSelected(asignatura)) {
      // Si ya está seleccionada, la elimina
      this.asignaturas_seleccionadas = this.asignaturas_seleccionadas.filter(a => a.codigo != asignatura.codigo);
    } else {
      // Si no está seleccionada, la agrega
      this.asignaturas_seleccionadas.push(asignatura);
    }
    console.log(this.asignaturas_seleccionadas)
  }

  enviarInforme(){

    const nuevoInforme: createInforme = {
      id_alumno: this.idAlumno,
      id_practica: this.idPractica
    }
    const formData = new FormData()

    this.respuestasService.crearInformeAlumno(nuevoInforme).subscribe(result =>{
      console.log(result)
      this.respuestasAlumno = this.respuestasAlumno.map(respuesta => ({
        ...respuesta,
        id_informe: result.id_informe
      }));

      const asociarRespuestas: ListaRespuestas = {
        respuestas: this.respuestasAlumno
      }

      this.respuestasService.asociarRespuestas(asociarRespuestas).subscribe(resultRespuestas => {
        console.log(resultRespuestas)
        formData.append('id', result.)
        formData.append('file', this.uploadedFile!)
        this.respuestasService.enviarInforme(formData).subscribe(resultInforme =>{
          console.log(resultInforme)
        })
      })
    })
  }
}

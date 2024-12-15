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
import { AsignaturaBack, AsignaturasService, Semestre } from '../services/asignaturas.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { TipoPregunta } from '../../../enum/enumerables.enum';

interface Pregunta{
  id_pregunta: number,
  enunciado_pregunta:string,
  tipo_pregunta: TipoPregunta,
}

interface Asignatura{
  nombre: string,
  codigo: string,
  tipo: string
}


@Component({
  selector: 'app-informe-primera-practica',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NgxPaginationModule, FormsModule, DialogModule, RadioButtonModule, ButtonModule, InputTextareaModule, InputNumberModule, FileUploadModule],
  templateUrl: './informe-primera-practica.component.html',
  styleUrl: './informe-primera-practica.component.css'
})
export class InformePrimeraPracticaAlumnoComponent implements OnInit {

  constructor(
    private preguntasService: PreguntasInformeService,
    private respuestasService: RespuestasInformeService,
    private route: ActivatedRoute,
    private asignaturasService: AsignaturasService
  ){}

  ngOnInit(): void {
    this.obtenerPreguntas()
    this.obtenerAsignaturas()
    this.idAlumno = Number(this.route.snapshot.paramMap.get('idAlumno'))!;
    this.idPractica = Number(this.route.snapshot.paramMap.get('idPractica'))!;
    this.idInforme = Number(this.route.snapshot.paramMap.get('idInforme'))!;
    this.existeRespuesta()
  }

  private readonly _router = inject(Router);
  datos_listo = false;
  page: number = 1;
  preguntas: Pregunta[]= []
  preguntas_paginas = 3;
  preguntas_len!: number;
  
  idAlumno!: number
  idPractica!: number
  idInforme!: number

  asignaturasFPCeleste: string[] = ['ME-167', 'CC-802', 'ME-260', 'ME-263', 'ME-445', 'ME-264', 'ME-266']
  semestres: Semestre[] = []; 
  asignaturas_seleccionadas: Asignatura[] = [];  
  asignaturas_seleccionadasRespaldo: Asignatura[] = [];  

  respuestasAlumno: Respuesta[] = []  
  
  uploadedFile: File | null = null;
  errorMessage: string = '';

  public obtenerAsignaturas() {
    this.asignaturasService.obtenerAsignaturas().subscribe((result: AsignaturaBack[]) => {
      console.log(result); // Ver los datos que llegan del backend

      // Creamos un objeto para agrupar por semestre
      const semestresMap: { [key: number]: Semestre } = {};

      // Iteramos sobre las asignaturas y las agrupamos por semestre (sin tener en cuenta la parte decimal)
      result.forEach(asignatura => {
        const semestreEntero = Math.floor(asignatura.semestre); // Usamos solo la parte entera del semestre

        // Si no existe el semestre, lo inicializamos
        if (!semestresMap[semestreEntero]) {
          semestresMap[semestreEntero] = {
            nombre: `Semestre ${semestreEntero}`,
            asignaturas: []
          };
        }

        // Mapeamos el tipo de asignatura a una forma más corta (FB, FP, FG)
        const tipo = this.obtenerTipoAsignatura(asignatura.tipo_asignatura);

        // Agregamos la asignatura al semestre correspondiente
        semestresMap[semestreEntero].asignaturas.push({
          nombre: asignatura.nombre,
          codigo: asignatura.codigo,
          tipo: tipo
        });
      });

      // Convertimos el objeto semestresMap a un arreglo de semestres y lo ordenamos
      this.semestres = Object.values(semestresMap).sort((a, b) => {
        const semestreA = parseInt(a.nombre.split(' ')[1]);
        const semestreB = parseInt(b.nombre.split(' ')[1]);
        return semestreA - semestreB; // Ordenamos por el número del semestre
      });

      console.log(this.semestres); // Ver el resultado final
    });
  }
  
  // Método para convertir tipo de asignatura
  private obtenerTipoAsignatura(tipo: string): string {
    switch (tipo) {
      case 'FORMACION_BASICA': return 'FB';
      case 'FORMACION_PROFESIONAL': return 'FP';
      case 'FORMACION_GENERAL': return 'FG';
      default: return '';
    }
  }
  
  public volverCuestionario(){
    this.datos_listo = !this.datos_listo
  }

  public actualizarRespuesta(preguntaId: number, respuesta: Respuesta) {
    const index = this.respuestasAlumno.findIndex(r => r.id_pregunta === preguntaId);
    if (index !== -1) {
      this.respuestasAlumno[index] = respuesta; // actualiza la respuesta si existe
    } else {
      this.respuestasAlumno.push(respuesta); // si no existe agregas una nueva respuesta
    }
  }

  public datos(){
    // console.log(this.respuestas),
    // console.log(this.asignaturas_seleccionadas)
    console.log(this.respuestasAlumno)
    this.respuestasService.obtenerArchivo(13).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'informe.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar', err);
      },
    })
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
    console.log(this.respuestasAlumno)
      this.respuestasAlumno = this.respuestasAlumno.map(respuesta => ({
        ...respuesta,
        id_informe: this.idInforme
      }));

      const asociarRespuestas: ListaRespuestas = {
        respuestas: this.respuestasAlumno
      }

      this.respuestasService.asociarRespuestas(asociarRespuestas).subscribe(resultRespuestas => {
        console.log(resultRespuestas)
        this.datos_listo = !this.datos_listo;
        alert('Respuestas registradas con exito')
      })
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
    this.asignaturas_seleccionadasRespaldo = [...this.asignaturas_seleccionadas]; // Hacer una copia
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

  public cancelar(): void {
    this.asignaturas_seleccionadas = [...this.asignaturas_seleccionadasRespaldo]; // Restaurar la copia
    this.dialogVisible = false;
    console.log('Cambios cancelados. Estado restaurado:', this.asignaturas_seleccionadas);
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
    const formData: FormData = new FormData()
    
    formData.append('id', ''+this.idInforme)
    formData.append('file', this.uploadedFile!)
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    
    this.respuestasService.enviarInforme(formData).subscribe(resultInforme =>{
      console.log(resultInforme)
      alert('Informe subido con exito')
      this.goTofin()
    });
  }

  public existeRespuesta(){
    this.respuestasService.existeRespuesta(this.idPractica).subscribe((result: any) => {
      if(JSON. stringify(result) != '{}'){
        this.datos_listo = true;
        this.idInforme = result.id_informe
      } else {
        this.datos_listo = false
      }
    })
  }

}

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderJefeEmpleadorComponent } from "../components/header-jefe-empleador/header-jefe-empleador.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Respuesta, respuestaInformeConfidencial, RespuestasInformeService } from '../../alumno_practica/services/respuestas-informe.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { PreguntasInformeService } from '../../jefe_compartido/services/preguntas-informe.service';
import { ActualizarInformeConfidencialDto } from '../../../shared/interface/data-informe-confidencial.interface';

interface Pregunta{
  id_pregunta: number,
  enunciado_pregunta:string,
  tipo_pregunta: string,
}

@Component({
  selector: 'app-informe-primera-practica',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, HeaderJefeEmpleadorComponent, FormsModule, ReactiveFormsModule, CalendarModule, RadioButtonModule, ButtonModule ,InputTextareaModule, InputNumberModule],
  templateUrl: './informe-primera-practica.component.html',
  styleUrl: './informe-primera-practica.component.css'
})


export class InformePrimeraPracticaComponent implements OnInit{

  constructor(
    private preguntasService: PreguntasInformeService,
    private respuestasService: RespuestasInformeService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.obtenerPreguntas()
    this.idInforme = Number(this.route.snapshot.paramMap.get('idInforme'))!;
    console.log(this.idInforme)
  }

  private readonly _router = inject(Router);
  public datos_listo = false;
  public page: number=1;
  preguntas: Pregunta[]= [
    {
      id_pregunta: 1,
      enunciado_pregunta: "El practicante demostró conocimiento técnico adecuado para las tareas asignadas.",
      tipo_pregunta: "CERRADA",
    },
    {
      id_pregunta: 2,
      enunciado_pregunta: "El practicante realizó su trabajo con precisión y atención al detalle.",
      tipo_pregunta: "CERRADA"
    },
    {
      id_pregunta: 7,
      enunciado_pregunta: "¿Qué nota le evaluaría al alumno? (esto no afecta a la nota final del alumno)",
      tipo_pregunta: "EVALUATIVA",
    },

  ]
  preguntas_paginas: number = 3;
  preguntas_len! :number
  
  respuestasSupervisor: respuestaInformeConfidencial[] = [] 

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
  
  formularioDatos: FormGroup = new FormGroup({
    fecha_inicio_practica: new FormControl(null, Validators.required),
    fecha_fin_practica: new FormControl(null, Validators.required),
    horas_semanales: new FormControl(null, Validators.required),
    horas_practicas_regulares: new FormControl(null, Validators.required),
    horas_practicas_extraordinarias: new FormControl(null, Validators.required),
    horas_inasistencia: new FormControl(null, Validators.required)
  })

  idAlumno!: number
  idInforme!: number


  public actualizarRespuesta(preguntaId: number, respuesta: respuestaInformeConfidencial) {
    const index = this.respuestasSupervisor.findIndex(r => r.id_pregunta === preguntaId);
    if (index !== -1) {
      this.respuestasSupervisor[index] = respuesta; // actualiza la respuesta si existe
    } else {
      this.respuestasSupervisor.push(respuesta); // si no existe agregas una nueva respuesta
    }
    console.log(this.respuestasSupervisor)
  }

  public obtenerPreguntas(){
    this.preguntasService.getPreguntasConfidencial().subscribe(result=>{
      console.log(result)
      this.preguntas = result.map((pregunta:any) => pregunta.pregunta)
      this.preguntas_len = Math.ceil(result.length / this.preguntas_paginas)
      this.respuestasSupervisor = this.preguntas.map(preg => {
        let respuesta: respuestaInformeConfidencial = {
          id_pregunta: preg.id_pregunta,
          id_informe: this.idInforme
        };       
        if (preg.tipo_pregunta === 'ABIERTA') {
          respuesta.respuesta_texto = '';
        }    
        if (preg.tipo_pregunta === 'CERRADA') {
          respuesta.puntos = 0;
        }
        if (preg.tipo_pregunta === 'EVALUATIVA'){
          respuesta.nota = 0;
        }
        return respuesta;
      });
      console.log(this.respuestasSupervisor)
    })
  }

  goTofin(){
    this._router.navigate(['agradecimientos'])
  }

  changeForm(){
    if (!this.formularioDatos.invalid) {
      console.log(this.formularioDatos.value);
      this.datos_listo = true;
      console.log(this.respuestasSupervisor)
    } else {
      console.log(this.formularioDatos.value);
      alert("Formulario inválido");
    }
  }

  enviarRespuesta(){
    console.log(this.formularioDatos.value)
    console.log(this.respuestasSupervisor)
    const total_horas= this.formularioDatos.get('horas_practicas_regulares')?.value + this.formularioDatos.get('horas__practicas_extraordinarias')?.value + this.formularioDatos.get('horas_inasistencia')?.value
    const data: ActualizarInformeConfidencialDto = {
      ...this.formularioDatos.value,
      total_horas: total_horas,
    }
    
    this.respuestasService.registrarRespuestasConfidencial(this.respuestasSupervisor).subscribe({
      next: result =>{
        console.log(result)

        alert('Respuestas registradas correctamente')
      },
      error: error =>{
        console.log(error)
      }
    })
    this.respuestasService.enviarInformeConfidencial(this.formularioDatos.value, this.idInforme).subscribe(
      {
        next: result => {
          console.log(result);
        },
        error: error => {
          console.log(error);
        }
      }
    )
    this.goTofin()
  }
}

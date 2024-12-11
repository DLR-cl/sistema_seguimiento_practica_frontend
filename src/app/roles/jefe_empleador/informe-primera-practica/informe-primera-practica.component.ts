import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderJefeEmpleadorComponent } from "../components/header-jefe-empleador/header-jefe-empleador.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

interface Pregunta{
  enunciado:string,
  tipo: string,
}

@Component({
  selector: 'app-informe-primera-practica',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, HeaderJefeEmpleadorComponent, FormsModule, ReactiveFormsModule, CalendarModule],
  templateUrl: './informe-primera-practica.component.html',
  styleUrl: './informe-primera-practica.component.css'
})


export class InformePrimeraPracticaComponent {

  private readonly _router = inject(Router);
  public datos_listo = false;
  public page: number=1;
  preguntas: Pregunta[]= [
    {
      enunciado: "El practicante demostró conocimiento técnico adecuado para las tareas asignadas.",
      tipo: "Cerrada",
    },
    {
      enunciado: "El practicante realizó su trabajo con precisión y atención al detalle.",
      tipo: "Cerrada"
    },
    {
      enunciado: "El practicante entregó las tareas asignadas en el tiempo acordado.",
      tipo: "Cerrada",
    },
    {
      enunciado: "El practicante mostró habilidades efectivas para resolver problemas de manera autónoma.",
      tipo: "Cerrada",
    },
    {
      enunciado: "¿Cómo describiría el trabajo realizado por el practicante?",
      tipo: "Abierta",
    },
    {
      enunciado: "¿Cuáles son los aspectos a mejorar?",
      tipo: "Abierta",
    },
    {
      enunciado: "¿Qué nota le evaluaría al alumno? (esto no afecta a la nota final del alumno)",
      tipo: "Evaluativa",
    },
  ]

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
    fechaInicio: new FormControl (null, Validators.required,),
    fechaTermino: new FormControl (null, Validators.required),
    horasSemanales: new FormControl (null, [Validators.required]), 
    horasRegulares:  new FormControl (null, [Validators.required]),
    horasExtraordinarias: new FormControl (null, [Validators.required]),
    horasInasistencia: new FormControl (null, [Validators.required]),
  });

  respuestas: { [key: number]: number} = {};


  onSubmit(): void {
    if (this.formularioDatos.valid) {
      console.log(this.formularioDatos.value);
    } else {
      console.log("Formulario inválido");
    }
  }

  preguntas_paginas = 3;
  preguntas_len = Math.ceil(this.preguntas.length / this.preguntas_paginas);

  goTofin(){
    this._router.navigate(['agradecimientos'])
  }

  changeForm(){
    if (this.formularioDatos.valid) {
      console.log(this.formularioDatos.value);
      this.datos_listo = true;
      console.log(this.respuestas)
    } else {
      console.log(this.formularioDatos.value);
      alert("Formulario inválido");
    }
  }
}

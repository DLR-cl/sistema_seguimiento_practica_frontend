import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-informe-primera-practica',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './informe-primera-practica.component.html',
  styleUrl: './informe-primera-practica.component.css'
})
export class InformePrimeraPracticaComponent {

  private readonly _router = inject(Router);

  public page!: number;
  preguntas= [
    "El practicante demostró conocimiento técnico adecuado para las tareas asignadas.",
    "El practicante realizó su trabajo con precisión y atención al detalle.",
    "El practicante entregó las tareas asignadas en el tiempo acordado.",
    "El practicante mostró habilidades efectivas para resolver problemas de manera autónoma.",
    "El practicante se adaptó rápidamente a las normas y procedimientos del departamento.",
    "El practicante colaboró de manera efectiva con otros miembros del equipo.",
    "El practicante tomó la iniciativa para proponer soluciones o mejoras en su trabajo.",
    "El practicante asumió la responsabilidad de sus tareas y resultados.",
    "El practicante se comunicó de manera clara y efectiva con sus supervisores y colegas.",
    "El practicante mostró una actitud positiva y disposición para aprender.",
    "El practicante organizó y priorizó sus tareas de manera eficiente.",
    "El practicante cumplió con las normas de seguridad establecidas en la empresa.",
    "El practicante mostró capacidad para aprender y aplicar nuevos conocimientos rápidamente."
  ]
  preguntas_paginas = 3;
  preguntas_len = Math.ceil(this.preguntas.length / this.preguntas_paginas);

  goTofin(){
    this._router.navigate(['agradecimientos'])
  }
}

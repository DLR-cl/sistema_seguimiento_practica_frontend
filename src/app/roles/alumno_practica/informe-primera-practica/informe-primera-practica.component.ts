import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-informe-primera-practica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './informe-primera-practica.component.html',
  styleUrl: './informe-primera-practica.component.css'
})
export class InformePrimeraPracticaComponent {
  preguntas= [
    "He tenido una experiencia enriquecedora para mi formación profesional durante la práctica",
    "Los conocimientos adquiridos a lo largo de mi formación profesional en la carrera han sido mi mayor herramienta durante mi estancia laboral",
    "Durante mi práctica el ambiente laboral fue agradable",
    "He tenido que aprender a desarrollar habilidades que no contemplaba la malla curricular",
  ]

}

import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SolicitarPracticanteContactPageComponent } from "./components/solicitar-practicante-contact-page/solicitar-practicante-contact-page.component";
import { SolicitarPracticanteDocumentformatPageComponent } from "./components/solicitar-practicante-documentformat-page/solicitar-practicante-documentformat-page.component";

@Component({
  selector: 'app-solicitar-practicante',
  standalone: true,
  imports: [CommonModule, SolicitarPracticanteContactPageComponent, SolicitarPracticanteDocumentformatPageComponent],
  templateUrl: './solicitar-practicante.component.html',
  styleUrl: './solicitar-practicante.component.css'
})
export class SolicitarPracticanteComponent implements OnInit {
  private _router = inject(Router);

  imagenFondo: string = '/departamento_ici/transicion_2.webp'; // Ruta de la imagen de fondo
  imagenCargada: boolean = false;

  ngOnInit() {
    // Precargar la imagen de fondo
    const img = new Image();
    img.src = this.imagenFondo;
    img.onload = () => {
      this.imagenCargada = true;
    };
    img.onerror = () => {
      console.error('Error al cargar la imagen de fondo');
      this.imagenCargada = true; // Mostrar el contenido aunque falle la carga
    };
  }
}

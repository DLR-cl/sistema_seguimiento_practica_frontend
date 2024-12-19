import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitar-practicante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitar-practicante.component.html',
  styleUrl: './solicitar-practicante.component.css'
})
export class SolicitarPracticanteComponent {
  private _router = inject(Router);
  correo:string = "ici@gestion.uta.cl";

  imagenFondo: string = '/departamento_ici/transicion_2.webp'; // Ruta de la imagen de fondo
  urlPDF: SafeResourceUrl; // Aquí almacenaremos la URL sanitizada del PDF

  constructor(private sanitizer: DomSanitizer) {
    this.urlPDF = this.sanitizer.bypassSecurityTrustResourceUrl('/sample.pdf');
  }

  toHome(){
    this._router.navigate(['home']);
  }
  
}

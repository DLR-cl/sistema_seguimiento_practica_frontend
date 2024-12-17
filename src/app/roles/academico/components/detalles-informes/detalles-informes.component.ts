import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Practicas } from '../../../secretaria/dto/secretaria-data.dto';
import { DatosPracticaService } from '../../services/datos-practica.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../../../jefe_compartido/header-jefes/header.component";


@Component({
  selector: 'app-detalles-informes',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './detalles-informes.component.html',
  styleUrl: './detalles-informes.component.css'
})
export class DetallesInformesComponent implements OnInit{

  idPractica!: number
  practica!: Practicas

  pdfUrl!: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private practicaService: DatosPracticaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idPractica = Number(this.route.snapshot.paramMap.get('idPractica'))!;
    const url = '/sample.pdf'; // URL de tu PDF
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.obtenerInfoPractica()
  }

  preguntas = [
    { texto: '¿Cuál fue tu mayor aprendizaje en la práctica?', respuesta: 'La gestión del tiempo.' },
    { texto: 'Describe un desafío que enfrentaste.', respuesta: 'Coordinar con diferentes departamentos.' },
    // Agrega más preguntas aquí
  ];
  comentario: string = '';
  archivoSeleccionado: File | null = null;

  // Métodos
  onFileSelected(event: any): void {
    this.archivoSeleccionado = event.target.files[0];
  }

    descargarPdf() {
    const url = 'sample.pdf'; // La misma URL del PDF
    const link = document.createElement('a');
    link.href = url;
    link.download = 'informe.pdf'; // Nombre del archivo a descargar
    link.target = '_blank'; // Abre en una nueva pestaña
    link.click();
  }

  enviarRevision(): void {
    if (!this.archivoSeleccionado) {
      alert('Por favor selecciona un archivo.');
      return;
    }
    if (!this.comentario.trim()) {
      alert('Por favor ingresa un comentario.');
      return;
    }

    // Lógica para enviar la revisión al backend
    console.log('Enviando revisión:', {
      archivo: this.archivoSeleccionado,
      comentario: this.comentario,
    });
  }

  obtenerInfoPractica(){
    this.practicaService.obtenerInfoPractica(this.idPractica).subscribe({
      next: result =>{
        this.practica = result
        console.log(result)
      },
      error: error => {
        console.log(error)
      }
    })
  }

  obtenerInformeAlumno(idInforme: number){
    this.practicaService.obtenerInformeAlumno(idInforme).subscribe({
      // next: result 
    })
  }
}

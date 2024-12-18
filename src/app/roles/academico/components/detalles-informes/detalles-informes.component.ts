import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Practicas } from '../../../secretaria/dto/secretaria-data.dto';
import { DatosPracticaService } from '../../services/datos-practica.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../../../jefe_compartido/header-jefes/header.component";
import { DataAccessService } from '../../services/data-access.service';


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
  respuestasConfidenciales: any[] = [];

  idInforme!: number;
  pdfUrl!: SafeResourceUrl;
  idInformeConfidencial!: number;
  informeConfidencial: any;
  constructor(
    private sanitizer: DomSanitizer,
    private practicaService: DatosPracticaService,
    private route: ActivatedRoute
  ) {}

  private readonly _dataccessService = inject(DataAccessService);
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
        console.log("practica: ", result)
        if(this.practica.informe_alumno ){
          this.idInforme = this.practica.informe_alumno?.id_informe
          this.obtenerInformeAlumno()
        }

        if(this.practica.informe_confidencial?.id_informe_confidencial){
          this.idInformeConfidencial = this.practica.informe_confidencial?.id_informe_confidencial;
          this.informeConfidencial = this.practica.informe_confidencial;
          this.obtenerInformeConfidencial()
        }

        console.log("informe_confidencial" ,this.practica.informe_confidencial)


        console.log("id_informe: ", this.idInforme)
      },
      error: error => {
        console.log(error)
      }
    })
  }

  obtenerInformeAlumno() {
    if (this.idInforme) {
      this._dataccessService.getArchivoInforme(this.idInforme).subscribe({
        next: (result) => {
          // Crear un Blob a partir de la respuesta
          const blob = new Blob([result], { type: 'application/pdf' });

          // Generar una URL segura usando DomSanitizer
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            window.URL.createObjectURL(blob)
          );
        },
        error: (error) => {
          console.error('Error al obtener el informe:', error);
        },
      });
    }
  }

  obtenerInformeConfidencial() {
    if (this.idInformeConfidencial) {
      this._dataccessService.getRespuestasInformeConfidencial(this.idInformeConfidencial).subscribe({
        next: (result:any) => {
          console.log('Respuestas del informe confidencial:', result);
          this.respuestasConfidenciales = result; // Asigna las respuestas al arreglo
        },
        error: (error) => {
          console.error('Error al obtener el informe confidencial:', error);
        },
      });
    }
  }
  
  
}

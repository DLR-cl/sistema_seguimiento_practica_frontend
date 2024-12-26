import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatosPracticaService } from '../../services/datos-practica.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../../../jefe_compartido/header-jefes/header.component";
import { DataAccessService } from '../../services/data-access.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Practicas } from '../../../secretaria/dto/practicas.dto';
import { PreguntaEvaluacion } from '../../dto/revision-informes.dto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-detalles-informes',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, InputTextareaModule],
  templateUrl: './detalles-informes.component.html',
  styleUrl: './detalles-informes.component.css'
})
export class DetallesInformesComponent implements OnInit {

  idPractica!: number;
  practica!: Practicas;
  respuestasConfidenciales: any[] = [];

  idInforme!: number;
  pdfUrl!: SafeResourceUrl;
  pdfUrlDownload!: string;
  url!: string;
  idInformeConfidencial!: number;
  informeConfidencial: any;

  archivoSeleccionado: File | null = null;
  
  observaciones: string = '';
  
  paginaActual: number = 0;
  preguntasPorPagina: number = 3;

  preguntasBackend!: PreguntaEvaluacion[]; // Datos del backend
  respuestasEvaluacion: { [key: number]: string } = {}; // Almacena respuestas seleccionadas
  opcionesRevision = ['T', 'R', 'S', 'D']; // Opciones para revisión académica
  opcionesCumple = ['Si', 'No']; // Opciones para preguntas cerradas

  // Mapa de abreviaturas a nombres completos
  opcionesMap: Record<string, string> = {
    T: 'Total',
    R: 'Regular',
    S: 'Suficiente',
    D: 'Deficiente'
  };

  cargando: boolean = true;

  constructor(
    private sanitizer: DomSanitizer,
    private practicaService: DatosPracticaService,
    private route: ActivatedRoute,
    private dataAccessService: DataAccessService,
    private messageService: MessageService
  ) {}

  fileName: string = '';
  uploadStatus: boolean = false;

  // Referencia al input de archivo
  fileInput: any;

  // Maneja la carga del archivo
  handleFileUpload(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      // Verificar si el archivo es PDF
      if (file.type !== 'application/pdf') {
        alert('Por favor, selecciona un archivo PDF');
        this.fileName = '';
        fileInput.value = '';  // Limpiar el archivo seleccionado
        return;
      }

      this.fileName = file.name;
    }
  }

  // Subir corrección (simulación)
  uploadCorrection(): void {
    // Aquí puedes agregar la lógica para subir el archivo al servidor
    console.log('Subiendo corrección...');
    this.uploadStatus = true;

    // Simulando un tiempo de espera para ocultar el mensaje
    setTimeout(() => {
      this.uploadStatus = false;
    }, 3000);
  }

  ngOnInit(): void {
    this.idPractica = Number(this.route.snapshot.paramMap.get('idPractica'))!;
    this.obtenerInfoPractica();
    this.getPreguntas()
  }

  // Llama al servicio para obtener preguntas
  public getPreguntas() {
    this.practicaService.obtenerPreguntasEvaluacion().subscribe({
      next: (result) => {
        console.log(result, 'preg')
        this.preguntasBackend = result;
      },
      error: (error) => {
        console.error('Error al obtener las preguntas:', error);
      }
    });
  }

  get agrupadosAspectos() {
    const grupos = this.preguntasBackend
      .filter((item) =>
        item.pregunta.dimension.nombre === 'Formato' ||
        item.pregunta.dimension.nombre === 'Estructura'
      )
      .reduce((acc: { [key: string]: any }, item) => {
        const aspecto = item.pregunta.dimension.nombre;

        if (!acc[aspecto]) {
          acc[aspecto] = { aspecto, preguntas: [] };
        }

        acc[aspecto].preguntas.push({
          id: item.pregunta.id_pregunta,
          pregunta: item.pregunta.enunciado_pregunta,
          tipo: item.pregunta.tipo_pregunta
        });

        return acc;
      }, {});

    return Object.values(grupos); // Convierte el objeto a un array para que sea iterable
  }

  // Filtra preguntas de "Evaluación General Informe Confidencial"
  get evaluacionGeneralConfidencial() {
    return this.preguntasBackend.filter(
      (item) => item.pregunta.dimension.nombre === 'Evaluación General Informe Confidencial'
    ).map((item) => ({
      id: item.pregunta.id_pregunta,
      pregunta: item.pregunta.enunciado_pregunta,
      tipo: item.pregunta.tipo_pregunta
    }));
  }

  // Selección de una respuesta
  selectOne(id: number, opcion: string) {
    // Mapea la abreviatura a su nombre completo
    if (this.opcionesMap[opcion]) {
      this.respuestasEvaluacion[id] = this.opcionesMap[opcion]; // Almacena el nombre completo
    } else {
      this.respuestasEvaluacion[id] = opcion; // Para otros tipos de preguntas (como Sí/No)
    }
  }

  tienePreguntasRevisionAcademica(subdimensiones: { [key: string]: any[] }): boolean {
    return Object.values(subdimensiones).some((preguntas: any[]) =>
      preguntas.some((p) => p.tipo === 'REVISION_ACADEMICA')
    );
  }

  enviarEvaluacion() {
    // if (!this.archivoSeleccionado) {
    //   alert('Por favor selecciona un archivo.');
    //   return;
    // }
    // if (!this.comentario.trim()) {
    //   alert('Por favor ingresa un comentario.');
    //   return;
    // }

    // Lógica para enviar la revisión al backend

    console.log('Enviando revisión:', {
      archivo: this.archivoSeleccionado,
      comentario: this.observaciones,
    });

    const respuestas = Object.keys(this.respuestasEvaluacion).map((preguntaId) => {
      return {
        respuesta_texto: this.respuestasEvaluacion[+preguntaId],
        pregunta_id: +preguntaId, 
        informe_id: this.idInforme, 
      };
    });

    const revision = {
      id_academico: this.practica.informe_confidencial?.id_academico,
      id_informe_alumno: this.idInforme,
      id_informe_confidencial:  this.practica.informe_confidencial?.id_informe_confidencial,
      fecha_revision: new Date(),
      respuestas: respuestas,
      observacion: this.observaciones
    }

    if (revision.respuestas.length < this.agrupadosAspectos[0].preguntas.length + this.agrupadosAspectos[1].preguntas.length + this.evaluacionGeneralConfidencial.length){
      this.messageService.add({ severity: 'warn', summary: 'Precaución', detail: `Debe responder todas las preguntas`});
      return
    }

    console.log('Respuestas de Evaluación:', revision);

    this.practicaService.enviarRevision(revision).subscribe({
      next: result => {
        console.log(result)
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Respuestas registradas con éxito.' });
      },
      error: error => {
        console.log(error)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrió un error al registrar las respuestas: ${error.message}` });
      }
    })

  }

  onFileSelected(event: any): void {
    this.archivoSeleccionado = event.target.files[0];
  }

  descargarPdf() {
    const link = document.createElement('a');
    link.href = this.pdfUrlDownload;
    link.download = `informe-${this.practica.tipo_practica}-${this.practica.informe_alumno.alumno.usuario.nombre}`; // Nombre del archivo descargado
    link.target = '_blank'; // Abre en una nueva pestaña
    link.click();
  }

  obtenerInfoPractica() {
    this.practicaService.obtenerInfoPractica(this.idPractica).subscribe({
      next: result => {
        this.practica = result;
        console.log("practica: ", result);
        if (this.practica.informe_alumno) {
          this.idInforme = this.practica.informe_alumno?.id_informe;
          this.obtenerInformeAlumno();
        }

        if (this.practica.informe_confidencial?.id_informe_confidencial) {
          this.idInformeConfidencial = this.practica.informe_confidencial?.id_informe_confidencial;
          this.informeConfidencial = this.practica.informe_confidencial;
          this.obtenerInformeConfidencial();
        }

        console.log("informe_confidencial", this.practica.informe_confidencial);
        console.log("id_informe: ", this.idInforme);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  obtenerInformeAlumno() {
    if (this.idInforme) {
      this.practicaService.getArchivoInforme(this.idInforme).subscribe({
        next: (result) => {
          // Crear un Blob a partir de la respuesta
          const blob = new Blob([result], { type: 'application/pdf' });

          // Generar una URL segura usando DomSanitizer
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            window.URL.createObjectURL(blob)
          );
          this.pdfUrlDownload = window.URL.createObjectURL(blob);
        },
        error: (error) => {
          console.error('Error al obtener el informe:', error);
        },
      });
    }
  }

  obtenerInformeConfidencial() {
    if (this.idInformeConfidencial) {
      this.dataAccessService.getRespuestasInformeConfidencial(this.idInformeConfidencial).subscribe({
        next: (result: any) => {
          console.log('Respuestas del informe confidencial:', result);
          this.respuestasConfidenciales = result; // Asigna las respuestas al arreglo
          this.cargando = false;

        },
        error: (error) => {
          console.error('Error al obtener el informe confidencial:', error);
        },
      });
    }
  }

  convertirPuntaje(puntos: number): string {
    switch (puntos) {
      case 1:
        return 'Muy en desacuerdo';
      case 2:
        return 'En desacuerdo';
      case 3:
        return 'Neutral';
      case 4:
        return 'De acuerdo';
      case 5:
        return 'Muy de acuerdo';
      default:
        return 'Sin calificación';
    }
  }

  obtenerTandaPreguntas(): any[] {
    const inicio = this.paginaActual * this.preguntasPorPagina;
    const fin = inicio + this.preguntasPorPagina;
    return this.respuestasConfidenciales.slice(inicio, fin);
  }

  // Navegar a la página anterior
  paginaAnterior(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
    }
  }

  // Navegar a la siguiente página
  paginaSiguiente(): void {
    if ((this.paginaActual + 1) * this.preguntasPorPagina < this.respuestasConfidenciales.length) {
      this.paginaActual++;
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Practicas } from '../../../secretaria/dto/secretaria-data.dto';
import { DatosPracticaService, PreguntaEvaluacion } from '../../services/datos-practica.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../../../jefe_compartido/header-jefes/header.component";
import { DataAccessService } from '../../services/data-access.service';
import { InputTextareaModule } from 'primeng/inputtextarea';

interface PreguntaOrganizada {
  id: number;
  pregunta: string;
  tipo: string;
}

interface SubdimensionOrganizada {
  [subdimension: string]: PreguntaOrganizada[];
}

interface DimensionOrganizada {
  nombre: string;
  subdimensiones: SubdimensionOrganizada;
}


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

  estado = {
    aprobado: false,
    rechazado: false,
    corregir: false
  };

  comentario: string = '';
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

  // Llama al servicio para obtener preguntas
  public getPreguntas() {
    this.practicaService.obtenerPreguntasEvaluacion().subscribe({
      next: (result) => {
        this.preguntasBackend = result; // Almacena los datos obtenidos
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

  constructor(
    private sanitizer: DomSanitizer,
    private practicaService: DatosPracticaService,
    private route: ActivatedRoute,
    private _dataccessService: DataAccessService,
  ) {}

  ngOnInit(): void {
    this.idPractica = Number(this.route.snapshot.paramMap.get('idPractica'))!;
    this.obtenerInfoPractica();
    this.getPreguntas()
  }

  

  get preguntasConfidencial() {
    return this.preguntasBackend
      .filter((p) => p.pregunta.dimension.nombre === 'Evaluación General Informe Confidencial')
      .map((p) => ({
        id: p.pregunta.id_pregunta,
        pregunta: p.pregunta.enunciado_pregunta
      }));
  }

  tienePreguntasRevisionAcademica(subdimensiones: { [key: string]: any[] }): boolean {
    return Object.values(subdimensiones).some((preguntas: any[]) =>
      preguntas.some((p) => p.tipo === 'REVISION_ACADEMICA')
    );
  }

  actualizarEstado(estado: string): void {
    switch (estado) {
      case 'aprobado':
        this.estado.aprobado = !this.estado.aprobado;
        this.estado.rechazado = false;
        this.estado.corregir = false;
        break;
      case 'rechazado':
        this.estado.rechazado = !this.estado.rechazado;
        this.estado.aprobado = false;
        this.estado.corregir = false;
        break;
      case 'corregir':
        this.estado.corregir = !this.estado.corregir;
        this.estado.aprobado = false;
        this.estado.rechazado = false;
        break;
    }
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
      comentario: this.comentario,
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

    console.log('Respuestas de Evaluación:', revision);

    this.practicaService.enviarRevision(revision).subscribe({
      next: result => {
        console.log(result)
      },
      error: error => {
        console.log(error)
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
      this._dataccessService.getArchivoInforme(this.idInforme).subscribe({
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
      this._dataccessService.getRespuestasInformeConfidencial(this.idInformeConfidencial).subscribe({
        next: (result: any) => {
          console.log('Respuestas del informe confidencial:', result);
          this.respuestasConfidenciales = result; // Asigna las respuestas al arreglo
        },
        error: (error) => {
          console.error('Error al obtener el informe confidencial:', error);
        },
      });
    }
  }

  convertirPuntaje(puntos: number | null): string {
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

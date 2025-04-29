import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatosPracticaService } from '../../services/datos-practica.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from "../../../jefe_compartido/header-jefes/header.component";
import { DataAccessService } from '../../services/data-access.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PracticaAlumno } from '../../../../../gestion-practicas/interfaces/practica-alumno.interface';
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
  practica!: PracticaAlumno;
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

  textoModalidad: Record<string, string> = {
    PRESENCIAL: 'Presencial',
    REMOTO: 'Remoto',
    SEMI_PRESENCIAL: 'Semipresencial'
  };

  tipoPractica: Record<string, string> = {
    PRACTICA_UNO: 'Práctica Profesional I',
    PRACTICA_DOS: 'Práctica Profesional II'
  }

  cargando: boolean = true;
  cargandoSolicitudes: number = 0

  constructor(
    private sanitizer: DomSanitizer,
    private practicaService: DatosPracticaService,
    private route: ActivatedRoute,
    private router: Router,
    private dataAccessService: DataAccessService,
    private messageService: MessageService
  ) { }

  fileName: string = '';
  selectedFile: File | null = null; // Almacena el archivo seleccionado

  // Maneja la carga del archivo
  handleFileUpload(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      // Verificar si el archivo es PDF
      if (file.type !== 'application/pdf') {
        this.fileName = '';
        this.selectedFile = null; // Limpiar el archivo seleccionado
        fileInput.value = ''; // Limpiar el input
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Solo se permiten archivos PDF' });
        return;
      }

      this.fileName = file.name;
      this.selectedFile = file; // Asignar el archivo seleccionado
    }
  }

  ngOnInit(): void {
    this.idPractica = Number(this.route.snapshot.paramMap.get('idPractica'))!;
    this.obtenerInfoPractica();
    this.getPreguntas()
  }

  // Llama al servicio para obtener preguntas
  public getPreguntas() {
    this.cargandoSolicitudes++;
    this.practicaService.obtenerPreguntasEvaluacion().subscribe({
      next: (result) => {
        console.log(result, 'preg')
        this.preguntasBackend = result;
      },
      error: (error) => {
        console.error('Error al obtener las preguntas:', error);
      },
      complete: () => {
        this.cargandoSolicitudes--;
        this.checkCargandoFinalizado()
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

  get evaluacionGeneralAlumno() {
    return this.preguntasBackend.filter(
      (item) => item.pregunta.dimension.nombre === 'Evaluación General Informe Alumno'
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

    const respuestas = Object.keys(this.respuestasEvaluacion).map((preguntaId) => {
      return {
        respuesta_texto: this.respuestasEvaluacion[+preguntaId],
        pregunta_id: +preguntaId,
        informe_id: this.idInforme,
      };
    });
    respuestas.push({
      respuesta_texto: this.observaciones,
      pregunta_id: 13,
      informe_id: this.idInforme,
    })
    const revision = {
      id_academico: this.practica.informe_confidencial?.id_academico,
      id_informe_alumno: this.idInforme,
      id_informe_confidencial: this.practica.informe_confidencial?.id_informe_confidencial,
      fecha_revision: new Date(),
      respuestas: respuestas,
      observacion: this.observaciones
    }

    if (revision.respuestas.length < this.agrupadosAspectos[0].preguntas.length + this.agrupadosAspectos[1].preguntas.length + this.evaluacionGeneralConfidencial.length) {
      this.messageService.add({ severity: 'warn', summary: 'Precaución', detail: `Debe responder todas las preguntas` });
      return
    }
    console.log('Respuestas de Evaluación:', revision);

    this.practicaService.enviarRevision(revision).subscribe({
      next: result => {
        console.log(result)
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Respuestas registradas con éxito.' });
        this.router.navigate(['home-academicos'])
        if (this.selectedFile) {
          const formData: FormData = new FormData();
          formData.append('id_informe', '' + this.idInforme);
          formData.append('id_academico', '' + this.practica.informe_alumno.id_academico);
          formData.append('nombre_alumno', '' + this.practica.informe_alumno.alumno.usuario.nombre);
          formData.append('tipo_practica', this.practica.tipo_practica);
          formData.append('file', this.selectedFile); // Usar el archivo seleccionado

          // Simulación de la carga del archivo
          formData.forEach((value, key) => {
            console.log(`${key}:`, value);
          });
          console.log('Subiendo corrección...');

          this.practicaService.enviarCorreccionInforme(formData).subscribe({
            next: result => {
              console.log(result)
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Corrección de Informe subida con éxito.' });
            },
            error: error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrió un error al enviar la corrección: ${error.message}` });
            }
          })
        }
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
    this.cargandoSolicitudes++;
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
      },
      complete: () => {
        this.cargandoSolicitudes--;
        this.checkCargandoFinalizado()
      }
    });
  }

  obtenerInformeAlumno() {
    this.cargandoSolicitudes++;
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
        complete: () => {
          this.cargandoSolicitudes--;
          this.checkCargandoFinalizado()
        }
      });
    }
  }

  obtenerInformeConfidencial() {
    this.cargandoSolicitudes++;
    if (this.idInformeConfidencial) {
      this.dataAccessService.getRespuestasInformeConfidencial(this.idInformeConfidencial).subscribe({
        next: (result: any) => {
          console.log('Respuestas del informe confidencial:', result);
          this.respuestasConfidenciales = result; // Asigna las respuestas al arreglo
        },
        error: (error) => {
          console.error('Error al obtener el informe confidencial:', error);
        },
        complete: () => {
          this.cargandoSolicitudes--;
          this.checkCargandoFinalizado()
        }
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

  checkCargandoFinalizado() {
    if (this.cargandoSolicitudes === 0) {
      this.cargando = false;
    }
  }

}

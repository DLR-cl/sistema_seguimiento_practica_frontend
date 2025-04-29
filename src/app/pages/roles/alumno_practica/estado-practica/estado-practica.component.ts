import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PracticasAlumnoService } from '../services/practicas-alumno.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PracticaAlumno } from '../../../../gestion-practicas/interfaces/practica-alumno.interface';
import { RespuestasInformeService } from '../services/respuestas-informe.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Empresa } from '../../jefe_compartido/dto/empresa.dto';
import { HeaderComponent } from '../../jefe_compartido/header-jefes/header.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DetallePractica } from '../../../../gestion-practicas/interfaces/detalle-practica.interface';

@Component({
  selector: 'app-estado-practica',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule, InputTextareaModule],
  templateUrl: './estado-practica.component.html',
  styleUrls: ['./estado-practica.component.css'] // Cambiado a styleUrls para corregir un typo
})
export class EstadoPracticaComponent implements OnInit {
  idAlumno!: number;
  practicas: any[] = [];
  datosEmpresa: Empresa | null = null; 
  practicaSeleccionada!: number;
  detallesPractica: PracticaAlumno | null = null;
  respuestasAlumno: any
  pasos: string[] = ['Cursando', 'En espera de informe', 'Informe recibido', 'Revisión general', 'Finalizada'];
  pasoActual: number = 0;
  resaltarPasos: boolean[] = [false, false, false, false, false];

  cargando: boolean = true;
  cargandoDetalle: boolean = false;

  tipoPractica: Record<string, string> = {
    PRACTICA_UNO: 'Práctica Profesional I',
    PRACTICA_DOS: 'Práctica Profesional II'
  };

  textoEstadoInforme: Record<string, string> = {
    ENVIADA: 'Enviado',
    REVISION: 'Revisión',
    CORRECCION: 'Corrección',
    ESPERA: 'Espera',
    APROBADA: 'Aprobado',
    DESAPROBADA: 'Desaprobado'
  };

  textoEstadoPractica: Record<string, string> = {
    CURSANDO: 'Cursando',
    REVISION_GENERAL: 'Revisión General',
    ESPERA_INFORMES: 'Espera Informes',
    FINALIZADA: 'Finalizada',
    INFORMES_RECIBIDOS: 'Informes Recibidos'
  };

  textoModalidad: Record<string, string> = {
    PRESENCIAL: 'Presencial',
    REMOTO: 'Remoto',
    SEMI_PRESENCIAL: 'Semipresencial'
  };

  paginaActual: number = 0;
  preguntasPorPagina: number = 3;

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
    return this.respuestasAlumno.respuestas.slice(inicio, fin);
  }

  // Navegar a la página anterior
  paginaAnterior(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
    }
  }

  // Navegar a la siguiente página
  paginaSiguiente(): void {
    if ((this.paginaActual + 1) * this.preguntasPorPagina < this.respuestasAlumno.respuestas.length) {
      this.paginaActual++;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private practicasService: PracticasAlumnoService,
    private informeService: RespuestasInformeService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const idAlumnoParam = this.route.snapshot.paramMap.get('idAlumno');
    if (!idAlumnoParam || isNaN(Number(idAlumnoParam))) {
      console.error('ID de alumno no válido o no proporcionado');
      this.router.navigate(['/home-alumno']);
      return;
    }

    this.idAlumno = Number(idAlumnoParam);
    this.obtenerPracticasAlumno();
  }

  obtenerPracticasAlumno(): void {
    this.practicasService.obtenerPracticasAlumno(this.idAlumno).subscribe({
      next: (result) => {
        if (result && Array.isArray(result)) {
          this.practicas = result;
        } else {
          console.warn('Respuesta inesperada:', result);
        }
        this.cargando = false
      },
      error: (error) => console.error('Error al obtener prácticas:', error)
    });
  }

  alumno: any

  correccionURL: SafeResourceUrl | null = null

  obtenerDetallePractica(): void {
    this.cargandoDetalle = true;
    this.detallesPractica = null;
    this.respuestasAlumno = null;
    this.pasoActual = 0;
    this.resaltarPasos.fill(false);
    this.datosEmpresa = null

    this.practicasService.obtenerDetallePractica(this.practicaSeleccionada).subscribe({
      next: (result) => {
        this.detallesPractica = result;
        console.log(result, 'PRACTICA')

        if(result.informe_alumno && result.informe_alumno.archivo_correccion){
          this.informeService.obtenerArchivoCorreccion(result.informe_alumno.id_informe).subscribe(
            (result) => {
              // Crear un objeto URL para el Blob recibido
              const blobUrl = window.URL.createObjectURL(result);
              this.correccionURL = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
            },
            (error) => {
              console.error('Error al cargar el archivo:', error);
              this.correccionURL = null;
            }
          );
        }

        if(result.estado == 'ESPERA_INFORMES'){
          this.actualizarPasoActual(result.informe_alumno.estado);
        } else {
          this.actualizarPasoActual(result.estado);
        }
      },
      error: (error) => console.error('Error al obtener detalles de la práctica:', error)
      
    });
  }

  actualizarPasoActual(estado: string): void {
    console.log('entro')

    const estados: Record<string, number> = {
      CURSANDO: 1,
      ESPERA: 2,
      ENVIADA : 3,
      REVISION_GENERAL: 4,
      FINALIZADA: 5,
    };
  
    if(estados[estado] >= 3){
      this.informeService.obtenerRespuestasAlumno(this.detallesPractica!.informe_alumno.id_informe).subscribe({
        next: result => {
          this.respuestasAlumno = result
          console.log(this.respuestasAlumno)
          this.cargandoDetalle = false
        }
      })
    } else {
      this.cargandoDetalle = false
    }

    this.pasoActual = estados[estado] || 0;
    this.resaltarPasos.fill(false);
    this.animarResaltado();
  }

  private timeouts: any[] = [];

  animarResaltado(): void {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];

    this.resaltarPasos.fill(false);

    const resetTimeout = setTimeout(() => {
      for (let i = 0; i < this.pasoActual; i++) {
        const timeout = setTimeout(() => {
          this.resaltarPasos[i] = true;
        }, i * 300); 
        this.timeouts.push(timeout);
      }
    }, 200);
    this.timeouts.push(resetTimeout);
  }
}

import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../components/header/header.component";
import { ActivatedRoute, Router } from '@angular/router';
import { PracticasAlumnoService } from '../services/practicas-alumno.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Practicas } from '../../secretaria/dto/practicas.dto';
import { RespuestasInformeService } from '../services/respuestas-informe.service';
import { InputTextareaModule } from 'primeng/inputtextarea';

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
  practicaSeleccionada!: number;
  detallesPractica: Practicas | null = null;
  respuestasAlumno: any
  pasos: string[] = ['Cursando', 'En espera de informe', 'Informe recibido', 'Revisión general', 'Finalizada'];
  pasoActual: number = 0;
  resaltarPasos: boolean[] = [false, false, false, false, false];

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
    private router: Router
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
      },
      error: (error) => console.error('Error al obtener prácticas:', error)
    });
  }

  obtenerDetallePractica(): void {
    this.detallesPractica = null;
    this.respuestasAlumno = null;
    this.pasoActual = 0;
    this.resaltarPasos.fill(false);

    this.practicasService.obtenerDetallePractica(this.practicaSeleccionada).subscribe({
      next: (result) => {
        this.detallesPractica = result;
        console.log(this.detallesPractica)
        this.actualizarPasoActual(result.estado);
      },
      error: (error) => console.error('Error al obtener detalles de la práctica:', error)
    });
  }

  actualizarPasoActual(estado: string): void {
    const estados: Record<string, number> = {
      CURSANDO: 1,
      EN_ESPERA_INFORMES: 2,
      INFORMES_RECIBIDOS: 3,
      REVISION_GENERAL: 4,
      FINALIZADA: 5,
    };
  
    if(estados[estado] >= 3){
      this.informeService.obtenerRespuestasAlumno(this.detallesPractica!.informe_alumno.id_informe).subscribe({
        next: result => {
          this.respuestasAlumno = result
          console.log(this.respuestasAlumno)
        }
      })
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
        }, i * 500); 
        this.timeouts.push(timeout);
      }
    }, 300);

    this.timeouts.push(resetTimeout);
  }
  
}

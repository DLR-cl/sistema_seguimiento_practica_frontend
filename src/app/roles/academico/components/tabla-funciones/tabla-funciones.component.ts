import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InfoInformes } from '../../interfaces/info-informes.dto';
import { AuthService } from '../../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { GenerarPDF } from '../../interfaces/revision-informes.dto';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { PdfgeneratorComponent } from '../../../../shared/pdfgenerator/pdfgenerator.component';
import { DataAccessService } from '../../services/data-access.service';
import { DatosPracticaService } from '../../services/datos-practica.service';

@Component({
  selector: 'app-tabla-funciones',
  standalone: true,
  imports: [CommonModule, TableModule, PdfgeneratorComponent],
  templateUrl: './tabla-funciones.component.html',
  styleUrls: ['./tabla-funciones.component.css'],
})
export class TablaFuncionesComponent implements OnInit {
  asignado: boolean = false;
  @Output() estadoCargando = new EventEmitter<boolean>();
  cargando: boolean = true;
  cargandoDescarga: boolean = false;

  constructor(
    private router: Router,
    private dataAccessService: DataAccessService,
    private authService: AuthService,
    private datosPracticaService: DatosPracticaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.decodedToken = this.authService.getDecodedToken();
    this.getInfoInformes();
  }

  data!: InfoInformes[];
  decodedToken: any;

  textoEstadoInforme: Record<string, string> = {
    ENVIADA: 'Enviado',
    REVISION: 'Revisión',
    CORRECCION: 'Corrección',
    ESPERA: 'Espera',
    APROBADA: 'Aprobada',
    DESAPROBADA: 'Desaprobada'
  };

  tipoPractica: Record<string, string> = {
    PRACTICA_UNO: 'Práctica Profesional I',
    PRACTICA_DOS: 'Práctica Profesional II'
  };

  mostrarPdfComponent = false;
  idPracticaSeleccionada!: number;
  idInformeSeleccionado!: number;
  idDocenteSeleccionado!: number;

  public descargarPDF(idPractica: number, idInforme: number, idDocente: number): void {
    this.cargandoDescarga = true;
    this.idPracticaSeleccionada = idPractica;
    this.idInformeSeleccionado = idInforme;
    this.idDocenteSeleccionado = idDocente;
    this.mostrarPdfComponent = true;
  }

  public onPdfGenerado(): void {
    this.cargandoDescarga = false;
    this.mostrarPdfComponent = false;
  }

  private getInfoInformes() {
    const token = this.decodedToken?.access_token;
    this.dataAccessService.getInformacionInformes(token).subscribe({
      next: (r) => {
        this.data = r;
        this.asignado = this.data.length > 0;
        this.cargando = false;
        this.estadoCargando.emit(false);
      },
      error: (err) => {
        this.data = [];
        this.asignado = false;
        this.cargando = false;
        this.estadoCargando.emit(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los informes'
        });
      },
    });
  }

  public cantidadDiasSobrantes(fecha: Date) {
    const cant = new Date(fecha).getDate() - new Date().getDate();
    return cant;
  }

  public revision(idPractica: number) {
    this.router.navigate(['/academico/revision-informe', idPractica]);
  }
}

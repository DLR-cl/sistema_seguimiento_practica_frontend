import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { GestionReportesService } from '../../services/gestion-reportes.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-resultado-academico',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './resultado-academico.component.html'
})
export class ResultadoAcademicoComponent implements OnInit {
  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;
  loading: boolean = false;

  constructor(
    private gestionReportesService: GestionReportesService,
    private messageService: MessageService,
    private config: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.config.setTranslation({
      firstDayOfWeek: 1,
      dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      today: 'Hoy',
      clear: 'Limpiar'
    });
  }

  generarReporte() {
    if (!this.fechaInicio || !this.fechaFin) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor seleccione ambas fechas'
      });
      return;
    }

    if (this.fechaInicio > this.fechaFin) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'La fecha de inicio no puede ser posterior a la fecha final'
      });
      return;
    }

    this.loading = true;
    this.gestionReportesService.obtenerReporteAcademicos(this.fechaInicio, this.fechaFin)
      .subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
          link.download = `reporte-academicos-${this.fechaInicio?.toISOString().split('T')[0]}-${this.fechaFin?.toISOString().split('T')[0]}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);
          this.loading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Reporte generado correctamente'
          });
        },
        error: (error) => {
          console.error('Error al generar el reporte:', error);
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al generar el reporte'
          });
        }
    });
  }
}

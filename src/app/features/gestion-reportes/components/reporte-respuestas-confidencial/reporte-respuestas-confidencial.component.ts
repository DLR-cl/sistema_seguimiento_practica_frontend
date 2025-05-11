import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TipoPractica } from '../../../../enum/enumerables.enum';
import { GestionReportesService } from '../../services/gestion-reportes.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-reporte-respuestas-confidencial',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CalendarModule, DropdownModule, ToastModule],
  templateUrl: './reporte-respuestas-confidencial.component.html',
  styleUrl: './reporte-respuestas-confidencial.component.css'
})
export class ReporteRespuestasConfidencialComponent {
  
  private gestionReportesService = inject(GestionReportesService);  
  private messageService = inject(MessageService);
  
  reporteRespuestasConfidencialForm = new FormGroup({
    fecha_ini: new FormControl('', [Validators.required]),
    fecha_fin: new FormControl('', [Validators.required]),
  });

  tipoPracticaOptions = input.required<string[]>();
  
  public generarReporteConfidencial() {
    if(this.reporteRespuestasConfidencialForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor complete todos los campos requeridos'
      });
      return;
    }

    const fechaInicio = this.reporteRespuestasConfidencialForm.value.fecha_ini!;
    const fechaFin = this.reporteRespuestasConfidencialForm.value.fecha_fin!;

    this.gestionReportesService.generarReporteConfidencial(fechaInicio, fechaFin).subscribe({
      next: (response) => {
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = `resultados-respuestas-informes-${fechaInicio}-${fechaFin}.xlsx`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Reporte generado correctamente'
        });
      },
      error: (error) => {
        console.error('Error al generar el reporte:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al generar el reporte'
        });
      },
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TipoPractica } from '../../../../enum/enumerables.enum';
import { GestionReportesService } from '../../services/gestion-reportes.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-reporte-resultados-practica',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CalendarModule, DropdownModule, ToastModule],
  templateUrl: './reporte-resultados-practica.component.html',
  styleUrl: './reporte-resultados-practica.component.css'
})
export class ReporteResultadosPracticaComponent {

  private gestionReportesService = inject(GestionReportesService);
  private messageService = inject(MessageService);

  reporteSemestralForm = new FormGroup({
    practica: new FormControl('', [Validators.required]),
    fecha_in: new FormControl('', [Validators.required]),
    fecha_fin: new FormControl('', [Validators.required]),
  });

  tipoPracticaOptions = input.required<string[]>();

  generarReporteSemestral() {
    if (this.reporteSemestralForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor complete todos los campos requeridos'
      });
      return;
    }

    const tipoPractica = this.reporteSemestralForm.value.practica! as TipoPractica;
    const fechaInicio = this.reporteSemestralForm.value.fecha_in!;
    const fechaFin = this.reporteSemestralForm.value.fecha_fin!;

    this.gestionReportesService.obtenerReporteSemestral(
      tipoPractica,
      fechaInicio,
      fechaFin
    ).subscribe({
      next: (response) => {
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = `reporte-semestral-${tipoPractica}-${fechaInicio}-${fechaFin}.xlsx`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Reporte generado correctamente'
        });
      },
      error: (error) => {
        console.error('Error al descargar el archivo:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al generar el reporte'
        });
      },
    });
  }
}

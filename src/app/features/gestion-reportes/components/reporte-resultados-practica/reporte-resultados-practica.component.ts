import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TipoPractica } from '../../../../enum/enumerables.enum';
import { GestionReportesService } from '../../services/gestion-reportes.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-reporte-resultados-practica',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CalendarModule,
    DropdownModule,
    ToastModule,
    ButtonModule
  ],
  providers: [MessageService],
  templateUrl: './reporte-resultados-practica.component.html',
  styleUrl: './reporte-resultados-practica.component.css'
})
export class ReporteResultadosPracticaComponent implements OnInit {

  private gestionReportesService = inject(GestionReportesService);
  private messageService = inject(MessageService);
  private config = inject(PrimeNGConfig);

  reporteSemestralForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reporteSemestralForm = this.fb.group({
      fecha_in: [null, [Validators.required]],
      fecha_fin: [null, [Validators.required]],
    });
  }

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

  generarReporteSemestral() {
    if (this.reporteSemestralForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor complete todos los campos requeridos'
      });
      return;
    }

    const fechaInicio = this.reporteSemestralForm.value.fecha_in!;
    const fechaFin = this.reporteSemestralForm.value.fecha_fin!;

    if (fechaInicio > fechaFin) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'La fecha de inicio no puede ser posterior a la fecha final'
      });
      return;
    }

    this.gestionReportesService.obtenerReporteSemestral(
      fechaInicio,
      fechaFin
    ).subscribe({
      next: (response) => {
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = `reporte-semestral-${fechaInicio}-${fechaFin}.xlsx`;
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

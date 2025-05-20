import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators, FormBuilder } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TipoPractica } from '../../../../enum/enumerables.enum';
import { GestionReportesService } from '../../services/gestion-reportes.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-reporte-respuestas-confidencial',
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
  templateUrl: './reporte-respuestas-confidencial.component.html',
  styleUrl: './reporte-respuestas-confidencial.component.css'
})
export class ReporteRespuestasConfidencialComponent implements OnInit {
  
  private gestionReportesService = inject(GestionReportesService);  
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);
  private config = inject(PrimeNGConfig);
  
  reporteRespuestasConfidencialForm: FormGroup;

  constructor() {
    this.reporteRespuestasConfidencialForm = this.fb.group({
      fecha_ini: [null, Validators.required],
      fecha_fin: [null, Validators.required]
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

    if (fechaInicio > fechaFin) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'La fecha de inicio no puede ser posterior a la fecha final'
      });
      return;
    }

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

  validarTipoPractica(): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const validValues = Object.values(TipoPractica);
      if (!validValues.includes(control.value)) {
        return { tipoPracticaInvalida: true }; // Retorna un error si no es válido
      }
      return null; // Válido
    };
  }
}

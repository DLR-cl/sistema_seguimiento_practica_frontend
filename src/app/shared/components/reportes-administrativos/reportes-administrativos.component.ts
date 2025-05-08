import { Component, inject } from '@angular/core';
import { TipoPractica } from '../../../enum/enumerables.enum';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { TipoUsuario } from '../../../enum/enumerables.enum';
import { DashboardService } from '../../../pages/roles/jefe_compartido/services/dashboard.service';
import { AuthStateService } from '../../data-access/auth-state.service';
import { PayloadInterface } from '../../interface/payload.interface';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-reportes-administrativos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DropdownModule, CalendarModule],
  templateUrl: './reportes-administrativos.component.html',
  styleUrl: './reportes-administrativos.component.css'
})
export class ReportesAdministrativosComponent {
  private readonly _dataUserService = inject(AuthStateService);
  private readonly _dashboardService = inject(DashboardService);

  dataUser?: PayloadInterface | null
  reporteForm!: FormGroup;
  filtroForm!: FormGroup;
  reporteSemestralForm!: FormGroup;
  reporteAnualAcademicos!: FormGroup;

  tipoPracticaOptions = [
    { label: 'Práctica Profesional I', value: 'PRACTICA_UNO' },
    { label: 'Práctica Profesional II', value: 'PRACTICA_DOS' }
  ];

  constructor(private fb: FormBuilder) {
    if (this.dataUser?.rol !== TipoUsuario.SECRETARIA_DEPARTAMENTO) {

      this.filtroForm = this.fb.group({
        anio: [new Date().getFullYear(), Validators.required],
        tipoPractica: ['PRACTICA_UNO', [Validators.required, this.validarTipoPractica()]], // Validación personalizada
        mes: [new Date().getMonth() + 1, Validators.required],
      });

      this.reporteSemestralForm = this.fb.group(
        {
          practica: [TipoPractica.PRACTICA_UNO, [Validators.required]],
          fecha_in: ['', [Validators.required]],
          fecha_fin: ['', [Validators.required]],
        },
        {
          validators: this.validarFechas('fecha_in', 'fecha_fin'),
        }
      );

      this.reporteForm = this.fb.group({
        fecha_ini: ['', Validators.required],
        fecha_fin: ['', Validators.required],
      });
    }
    this.reporteAnualAcademicos = this.fb.group(
      {
        practica: [TipoPractica.PRACTICA_UNO, [Validators.required]]
      }
    )
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

  
  validarFechas(fechaInicioKey: string, fechaFinKey: string) {
    return (formGroup: FormGroup) => {
      const fechaInicio = formGroup.get(fechaInicioKey)?.value;
      const fechaFin = formGroup.get(fechaFinKey)?.value;

      if (fechaInicio && fechaFin && new Date(fechaInicio) > new Date(fechaFin)) {
        formGroup.get(fechaFinKey)?.setErrors({ fechaInvalida: true });
      } else {
        formGroup.get(fechaFinKey)?.setErrors(null);
      }
    };
  }

  generarReporteSemestral(): void {
    if (this.reporteSemestralForm.valid) {
      // Obtén los valores del formulario
      const { practica, fecha_in, fecha_fin } = this.reporteSemestralForm.value;


      // Llama al servicio con los datos corregidos
      this._dashboardService.obtenerReporteSemestral(practica, fecha_in, fecha_fin)
    }
  }

  generarReporteConfidencial(): void {
    if (this.reporteForm.valid) {
        const { fecha_ini, fecha_fin } = this.reporteForm.value;

        // Convertir las fechas a formato ISO y extraer la parte de la fecha
        const fechaInicioFormateada = new Date(fecha_ini).toISOString().split('T')[0];
        const fechaFinFormateada = new Date(fecha_fin).toISOString().split('T')[0];

        this._dashboardService.generarReporteConfidencialPorPeriodo(fechaInicioFormateada, fechaFinFormateada).subscribe({
            next: (response: Blob) => {
                const url = window.URL.createObjectURL(response);
                const link = document.createElement('a');
                link.href = url;
                link.download = `reporte_confidencial_${fechaInicioFormateada}_a_${fechaFinFormateada}.xlsx`;
                link.click();
                window.URL.revokeObjectURL(url);
            },
            error: (error) => {
                console.error('Error al generar el reporte confidencial:', error);
            },
        });
    } else {
        console.error('Formulario inválido');
    }
  }
}
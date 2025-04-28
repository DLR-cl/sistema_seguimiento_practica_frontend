import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TEXTO_ESTADO_INFORME, TEXTO_ESTADO_PRACTICA, TEXTO_MODALIDAD } from '../constants/estados-practica.constants';
import type { AcademicoData } from '../../../interfaces/academico-info.interface';
import type { PracticaAlumno } from '../../../interfaces/practica-alumno.interface';

@Component({
  selector: 'app-modal-detalles-info-academico-practica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-detalles-info-academico-practica.component.html',
  styleUrl: './modal-detalles-info-academico-practica.component.css'
})
export class ModalDetallesInfoAcademicoPracticaComponent {


  data = input<{
    practica: PracticaAlumno,
    academico: AcademicoData,
  }>();

  textoModalidad = TEXTO_MODALIDAD;
  textoEstadoPractica = TEXTO_ESTADO_PRACTICA;
  textoEstadoInforme = TEXTO_ESTADO_INFORME;

  // filepath: modal-detalles-info-academico-practica.component.ts
  isPracticaEnEstadoValido(): boolean {
    const practica = this.data()?.practica;
    return practica?.estado !== 'CURSANDO' &&
      ['REVISION', 'CORRECCION', 'APROBADA', 'ENVIADA', 'DESAPROBADA'].includes(practica!.informe_alumno?.estado);
  }
}

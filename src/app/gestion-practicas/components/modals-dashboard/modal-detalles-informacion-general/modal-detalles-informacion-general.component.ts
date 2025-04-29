import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { PracticaAlumno } from '../../../interfaces/practica-alumno.interface';
import { TEXTO_ESTADO_INFORME, TEXTO_MODALIDAD, TEXTO_ESTADO_PRACTICA} from '../../../constants/estados-practica.constants';
import { CommonModule } from '@angular/common';
import { DataPracticaAlumnoService } from '../../../services/data-practica-alumno.service';
import { AcademicoData } from '../../../interfaces/academico-info.interface';
@Component({
  selector: 'app-modal-detalles-informacion-general',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-detalles-informacion-general.component.html',
  styleUrl: './modal-detalles-informacion-general.component.css'
})
export class ModalDetallesInformacionGeneralComponent {
  

  practicaAlumno = input<PracticaAlumno | null>(null);

  textoModalidad = TEXTO_MODALIDAD;
  textoEstadoPractica = TEXTO_ESTADO_PRACTICA;
  textoEstadoInforme = TEXTO_ESTADO_INFORME;


}

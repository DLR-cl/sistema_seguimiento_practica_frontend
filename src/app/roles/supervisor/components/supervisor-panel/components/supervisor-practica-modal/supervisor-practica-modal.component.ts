import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { PracticaAlumno } from '../../../../../../gestion-practicas/interfaces/practica-alumno.interface';


@Component({
  selector: 'app-supervisor-practica-modal',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './supervisor-practica-modal.component.html',
  styleUrl: './supervisor-practica-modal.component.css'
})
export class SupervisorPracticaModalComponent {
  @Input() visible: boolean = false;
  @Input() practicaSeleccionada: PracticaAlumno | null = null;
  @Output() close = new EventEmitter<boolean>();
}

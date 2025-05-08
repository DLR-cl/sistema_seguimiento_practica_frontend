import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ListboxModule } from 'primeng/listbox';
import { DetallesInformes } from '../../../../dto/informe-confidencial.dto';
import { TIPO_PRACTICA } from '../../../../interface/supervisor.types';

@Component({
  selector: 'app-supervisor-pending-reports',
  standalone: true,
  imports: [ListboxModule],
  templateUrl: './supervisor-pending-reports.component.html',
  styleUrl: './supervisor-pending-reports.component.css'
})
export class SupervisorPendingReportsComponent {
  @Input() informesPendientesList: DetallesInformes[] = [];
  @Output() informeSeleccionado = new EventEmitter<number>();

  getTipoPractica(tipo: string): string {
    return TIPO_PRACTICA[tipo as keyof typeof TIPO_PRACTICA] || '';
  }

  realizarInforme(id_practica: number) {
    this.informeSeleccionado.emit(id_practica);
  }
}

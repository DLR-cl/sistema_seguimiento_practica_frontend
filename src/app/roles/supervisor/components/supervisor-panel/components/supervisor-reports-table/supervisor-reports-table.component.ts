import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableModule } from 'primeng/table';
import { NgClass } from '@angular/common';
import { DetallesInformes } from '../../../../dto/informe-confidencial.dto';
import { TIPO_PRACTICA, ESTADO_INFORME } from '../../../../interface/supervisor.types';

@Component({
  selector: 'app-supervisor-reports-table',
  standalone: true,
  imports: [TableModule, NgClass],
  templateUrl: './supervisor-reports-table.component.html',
  styleUrl: './supervisor-reports-table.component.css'
})
export class SupervisorReportsTableComponent {
  @Input() detalleInformes: DetallesInformes[] = [];
  @Output() realizarInforme = new EventEmitter<number>();
  @Output() verInforme = new EventEmitter<DetallesInformes>();

  getTipoPractica(tipo: string): string {
    return TIPO_PRACTICA[tipo as keyof typeof TIPO_PRACTICA] || '';
  }

  getEstadoInforme(estado: string): string {
    return ESTADO_INFORME[estado as keyof typeof ESTADO_INFORME] || '';
  }
}

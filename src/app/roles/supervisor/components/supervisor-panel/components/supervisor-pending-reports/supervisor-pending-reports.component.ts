import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TIPO_PRACTICA } from '../../../../interface/supervisor.types';

@Component({
  selector: 'app-supervisor-pending-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supervisor-pending-reports.component.html',
  styleUrl: './supervisor-pending-reports.component.css'
})
export class SupervisorPendingReportsComponent {
  @Input() informesPendientesList: any[] = [];
  @Output() realizarInforme = new EventEmitter<number>();

  getTipoPractica(tipo: string): string {
    return TIPO_PRACTICA[tipo as keyof typeof TIPO_PRACTICA] || '';
  }
}

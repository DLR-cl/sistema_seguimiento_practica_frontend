import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableModule } from 'primeng/table';
import { NgClass } from '@angular/common';
import { DetallesInformes } from '../../../../dto/informe-confidencial.dto';
import { TIPO_PRACTICA, ESTADO_INFORME } from '../../../../interface/supervisor.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supervisor-reports-table',
  standalone: true,
  imports: [TableModule, NgClass, CommonModule],
  templateUrl: './supervisor-reports-table.component.html',
  styleUrl: './supervisor-reports-table.component.css'
})
export class SupervisorReportsTableComponent {
  @Input() detalleInformes: DetallesInformes[] = [];
  @Output() realizarInforme = new EventEmitter<number>();
  @Output() verInforme = new EventEmitter<DetallesInformes>();

  // Propiedades para la paginación
  currentPage = 1;
  itemsPerPage = 5;
  Math = Math; // Para usar Math en el template

  get totalPages(): number {
    return Math.ceil(this.detalleInformes.length / this.itemsPerPage);
  }

  get paginatedItems(): DetallesInformes[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.detalleInformes.slice(start, end);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getTipoPractica(tipo: string): string {
    return TIPO_PRACTICA[tipo as keyof typeof TIPO_PRACTICA] || '';
  }

  getEstadoInforme(estado: string): string {
    return ESTADO_INFORME[estado as keyof typeof ESTADO_INFORME] || '';
  }
}

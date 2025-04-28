import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DataEstadisticaPracticaService } from '../../../services/data-estadistica-practica.service';
import { TEXTO_ESTADO_PRACTICA, TEXTO_MODALIDAD } from '../constants/estados-practica.constants';
import type { DetallePractica } from '../../../interfaces/detalle-practica.interface';

@Component({
  selector: 'app-modal-alumnos-practica',
  standalone: true,
  imports: [DialogModule,  ChartModule, TableModule, ButtonModule, CommonModule],
  templateUrl: './modal-alumnos-practica.component.html',
  styleUrl: './modal-alumnos-practica.component.css'
})
export class ModalAlumnosPracticaComponent implements OnInit{
  // COMPONENTE QUE MUESTRA LOS ALUMNOS EN PRACTICA pero no se puede ver el detalle: Emite el id de la practica al padre
  dataEstadisticaService = inject(DataEstadisticaPracticaService);
  id_practica = output<DetallePractica>();

  listaPracticas = signal<DetallePractica[]>([]);
  textoEstadoPractica = TEXTO_ESTADO_PRACTICA;
  textoModalidad = TEXTO_MODALIDAD;

  ngOnInit(): void {
    this.setDetallesPractica();
  }

  private setDetallesPractica() {
    this.dataEstadisticaService.obtenerDetallesAlumnosEnPractica().subscribe(
      (resp) => {
        this.listaPracticas.set(resp);
      }
    );
  }
  seleccionarPractica(practica: DetallePractica): void {
    this.id_practica.emit(practica);
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DataAccessService } from '../../services/data-access.service';
import { InfoInformes } from '../../interface/info-informes.interface';

@Component({
  selector: 'app-tabla-funciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-funciones.component.html',
  styleUrl: './tabla-funciones.component.css',
})
export class TablaFuncionesComponent implements OnInit {
  asignado: boolean = false;

  private readonly _dataAccessService = inject(DataAccessService);

  data?: InfoInformes[];

  ngOnInit(): void {
    this.getInfoInformes();
  }

  private getInfoInformes() {
    this._dataAccessService.getInformacionInformes().subscribe({
      next: (r) => {
        this.data = r;
        this.asignado = this.data?.length > 0;
      },
      error: (err) => console.error('Error al obtener información de informes:', err),
    });
  }

  public cantidadDiasSobrantes(fecha: Date) {
    const cant = new Date(fecha).getDate() - new Date().getDate();
    return cant;
  }
}

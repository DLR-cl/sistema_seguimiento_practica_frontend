import { Component, inject, OnInit } from '@angular/core';
import { DataSecretariaService } from '../services/data-secretaria.service';
import { SeguimientoData } from '../dto/secretaria-data.dto';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../jefe_compartido/header-jefes/header.component";

@Component({
  selector: 'app-estado-academicos',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './estado-academicos.component.html',
  styleUrl: './estado-academicos.component.css'
})
export class EstadoAcademicosComponent implements OnInit{
  // SERVICIOS
  private readonly _datasecretariaService = inject(DataSecretariaService);

  // VARIABLES
  dataSeguimiento: SeguimientoData[] = [];
  paginaActual: number = 0; // Página actual
  elementosPorPagina: number = 5; // Número de elementos por página
  ngOnInit(): void {
    this.obtenerEstadoAcademicos()
  }

  private obtenerEstadoAcademicos(){
    this._datasecretariaService.obtenerEstadoAcademico().subscribe({
      next: (result: SeguimientoData[]) => {
        this.dataSeguimiento = result;
        console.log(result)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  formatearFecha(fecha: Date): string {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  }

  // Convertir el tipo de práctica a un texto más amigable
  convertirTipoPractica(tipo: string): string {
    switch (tipo) {
      case 'PRACTICA_UNO':
        return 'Práctica Uno';
      case 'PRACTICA_DOS':
        return 'Práctica Dos';
      default:
        return tipo;
    }
  }
  obtenerDatosPaginados(): SeguimientoData[] {
    const inicio = this.paginaActual * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return this.dataSeguimiento.slice(inicio, fin);
  }

  // Cambiar a la página anterior
  paginaAnterior(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
    }
  }

  // Cambiar a la página siguiente
  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas - 1) {
      this.paginaActual++;
    }
  }

  // Total de páginas
  get totalPaginas(): number {
    return Math.ceil(this.dataSeguimiento.length / this.elementosPorPagina);
  }


}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ReporteResultadosPracticaComponent } from './components/reporte-resultados-practica/reporte-resultados-practica.component';
import { ReporteRespuestasConfidencialComponent } from './components/reporte-respuestas-confidencial/reporte-respuestas-confidencial.component';
import { ResultadoAcademicoComponent } from './components/resultado-academico/resultado-academico.component';
import { TipoPractica } from '../../enum/enumerables.enum';

@Component({
  selector: 'app-gestion-reportes',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ReporteResultadosPracticaComponent,
    ReporteRespuestasConfidencialComponent,
    ResultadoAcademicoComponent
  ],
  templateUrl: './gestion-reportes.component.html',
  styleUrls: ['./gestion-reportes.component.css']
})
export class GestionReportesComponent {
  tipoPracticaOptions = [
    { label: 'Práctica Profesional I', value: TipoPractica.PRACTICA_UNO },
    { label: 'Práctica Profesional II', value: TipoPractica.PRACTICA_DOS }
  ];

  // Variables para controlar la visibilidad de los modales
  mostrarModalResultadosPractica = false;
  mostrarModalRespuestasConfidencial = false;
  mostrarModalResultadosAcademicos = false;

  mostrarModal(tipo: 'resultados-practica' | 'respuestas-confidenciales' | 'resultados-academicos') {
    switch (tipo) {
      case 'resultados-practica':
        this.mostrarModalResultadosPractica = true;
        break;
      case 'respuestas-confidenciales':
        this.mostrarModalRespuestasConfidencial = true;
        break;
      case 'resultados-academicos':
        this.mostrarModalResultadosAcademicos = true;
        break;
    }
  }
}

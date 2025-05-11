import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TipoPractica } from '../../enum/enumerables.enum';
import { ReporteResultadosPracticaComponent } from './components/reporte-resultados-practica/reporte-resultados-practica.component';
import { ReporteRespuestasConfidencialComponent } from './components/reporte-respuestas-confidencial/reporte-respuestas-confidencial.component';

@Component({
  selector: 'app-gestion-reportes',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CalendarModule, DropdownModule, ReporteResultadosPracticaComponent, ReporteRespuestasConfidencialComponent],
  templateUrl: './gestion-reportes.component.html',
  styleUrl: './gestion-reportes.component.css'
})
export class GestionReportesComponent implements OnInit {


  tipoPracticaOptions!: string[]; 

  ngOnInit(): void {

    this.tipoPracticaOptions = Object.values(TipoPractica).map(tipo => {
      if(tipo === TipoPractica.PRACTICA_UNO) {
        return 'Primera Práctica';
      }
        return 'Segunda Práctica';
    });
  }
}

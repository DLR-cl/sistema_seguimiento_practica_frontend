import { Component, OnInit } from '@angular/core';
import { InformesService } from '../services/informes.service';
import { InformeEvaluativo } from '../dto/informes.dto';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header-jefes/header.component';
import { PdfgeneratorComponent } from '../../../../shared/pdfgenerator/pdfgenerator.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-informes',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PdfgeneratorComponent],
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css'],
})
export class InformesComponent implements OnInit {
  listaEvaluaciones: InformeEvaluativo[] = [];
  listaAgrupadaPorAcademico: { nombreAcademico: string; correoAcademico: string; evaluaciones: InformeEvaluativo[] }[] =
    [];

  // Paginación
  paginaActual = 1;
  elementosPorPagina = 1;
  listaPaginada: { nombreAcademico: string; correoAcademico: string; evaluaciones: InformeEvaluativo[] }[] = [];
  totalPaginas: number = 1;

  cargando: boolean = true;
  cargandoDescarga: boolean = false;

  mostrarPdfComponent = false;
  idPracticaSeleccionada!: number;
  idInformeSeleccionado!: number;
  idDocenteSeleccionado!: number;

  tipoPractica: Record<string, string> = {
    PRACTICA_UNO: 'Práctica Profesional I',
    PRACTICA_DOS: 'Práctica Profesional II'
  }

  constructor(private informesService: InformesService) {}

  ngOnInit(): void {
    this.informesService.obtenerInformes().subscribe({
      next: (result) => {
        this.listaEvaluaciones = result;
        this.agruparEvaluacionesPorAcademico();
        this.actualizarListaPaginada();
        console.log(result);
        this.cargando = false;
      },
    });
  }

  public agruparEvaluacionesPorAcademico(): void {
    const agrupacion = this.listaEvaluaciones.reduce((acc, evaluacion) => {
      const { nombre_academico, correo_academico } = evaluacion;
      const key = `${nombre_academico}-${correo_academico}`;

      if (!acc[key]) {
        acc[key] = {
          nombreAcademico: nombre_academico,
          correoAcademico: correo_academico,
          evaluaciones: [],
        };
      }

      acc[key].evaluaciones.push(evaluacion);
      return acc;
    }, {} as Record<string, { nombreAcademico: string; correoAcademico: string; evaluaciones: InformeEvaluativo[] }>);

    this.listaAgrupadaPorAcademico = Object.values(agrupacion);
    this.totalPaginas = Math.ceil(this.listaAgrupadaPorAcademico.length / this.elementosPorPagina);  // Calcular el total de páginas
  }

  public actualizarListaPaginada(): void {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.listaPaginada = this.listaAgrupadaPorAcademico.slice(inicio, fin);
  }

  public cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.actualizarListaPaginada();
  }

  public descargarPDF(idPractica: number, idInforme: number, idDocente: number): void {
    this.cargandoDescarga = true;
    this.idPracticaSeleccionada = idPractica;
    this.idInformeSeleccionado = idInforme;
    this.idDocenteSeleccionado = idDocente;
    this.mostrarPdfComponent = true;
  }

  public onPdfGenerado(): void {
    console.log('PDF generado');
    this.cargandoDescarga = false;
    this.mostrarPdfComponent = false;
  }
}

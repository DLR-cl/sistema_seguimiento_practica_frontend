import { Component, OnInit } from '@angular/core';
import { InformesService } from '../services/informes.service';
import { InformeEvaluativo } from '../dto/informes.dto';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header-jefes/header.component';
import { PdfgeneratorComponent } from '../../../shared/pdfgenerator/pdfgenerator.component';

@Component({
  selector: 'app-informes',
  standalone: true,
  imports: [CommonModule, HeaderComponent, PdfgeneratorComponent],
  templateUrl: './informes.component.html',
  styleUrl: './informes.component.css'
})
export class InformesComponent implements OnInit{

  constructor(
    private informesService: InformesService,
  ){}

  ngOnInit(): void {
    this.informesService.obtenerInformes().subscribe({
      next: result => {
        this.listaEvaluaciones = result
        console.log(result)
        this.cargando = false
      }
    })
  }

  listaEvaluaciones: InformeEvaluativo[] = []

  cargando: boolean = true
  cargandoDescarga: boolean = false;

  mostrarPdfComponent = false;
  idPracticaSeleccionada!: number;
  idInformeSeleccionado!: number;
  idDocenteSeleccionado!: number;

  public descargarPDF(idPractica: number, idInforme: number, tipoPractica: number): void {
    this.cargandoDescarga = true
    this.idPracticaSeleccionada = idPractica;
    this.idInformeSeleccionado = idInforme;
    this.idDocenteSeleccionado = tipoPractica;
    this.mostrarPdfComponent = true;
  }

  public onPdfGenerado(): void {
    console.log('si')
    this.cargandoDescarga = false
    this.mostrarPdfComponent = false;
  }


}


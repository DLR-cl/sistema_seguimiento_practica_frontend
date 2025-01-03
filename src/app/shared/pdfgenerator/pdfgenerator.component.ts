import { Component, OnInit } from '@angular/core';
import { PdfgeneratorService } from '../../core/services/pdfgenerator.service';
import { EvaluacionPracticaInterface } from '../../core/interfaces/data.interface';

@Component({
  selector: 'app-pdfgenerator',
  standalone: true,
  imports: [],
  templateUrl: './pdfgenerator.component.html',
  styleUrl: './pdfgenerator.component.css'
})
export class PdfgeneratorComponent implements OnInit{
  constructor(private pdfGeneratorService: PdfgeneratorService) {}
  dataPdf!: EvaluacionPracticaInterface; 


  ngOnInit(): void {
    this.obtenerData();
  }

  private obtenerData(){
    this.pdfGeneratorService.obtenerDatosParaGenerarPdf(1, 46, 2).subscribe({
      next: (data:EvaluacionPracticaInterface) => {
        this.dataPdf = data;
      },
      error: (error:any) => {
        console.error('Error al obtener los datos del conteo:', error);
      },
    });
  }


  generarPDF(): void {
    const fileName = `evaluacion_practica_${new Date().toISOString().slice(0, 10)}.pdf`;
    this.pdfGeneratorService.generarPdfDesdeHtml('contenidoPdf', fileName).catch((error) => {
      console.error('Error al generar el PDF:', error);
    });
  }
}

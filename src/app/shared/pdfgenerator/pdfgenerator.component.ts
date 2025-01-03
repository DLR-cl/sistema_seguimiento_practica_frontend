import { Component, EventEmitter, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { PdfgeneratorService } from '../../core/services/pdfgenerator.service';
import { EvaluacionPracticaInterface } from '../../core/interfaces/data.interface';

@Component({
  selector: 'app-pdfgenerator',
  standalone: true,
  imports: [],
  templateUrl: './pdfgenerator.component.html',
  styleUrl: './pdfgenerator.component.css',
})
export class PdfgeneratorComponent implements OnChanges {
  constructor(private pdfGeneratorService: PdfgeneratorService) {}
  dataPdf!: EvaluacionPracticaInterface;

  @Input() idPractica!: number;
  @Input() idInformeEvaluativo!: number;
  @Input() idDocente!: number;
  @Output() pdfGenerado = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Input changes:', this.idPractica, this.idInformeEvaluativo, this.idDocente);
    if (this.idPractica && this.idInformeEvaluativo && this.idDocente) {
      this.obtenerData();
    }
  }

  private obtenerData(): void {
    this.pdfGeneratorService
      .obtenerDatosParaGenerarPdf(this.idPractica, this.idInformeEvaluativo, this.idDocente)
      .subscribe({
        next: (data: EvaluacionPracticaInterface) => {
          this.dataPdf = data;
          console.log('Datos obtenidos para el PDF:', this.dataPdf);

          // Esperar a que el DOM se actualice con los datos
          setTimeout(() => this.generarPDF(), 300); // Retraso de 300ms para asegurar el render
        },
        error: (error: any) => {
          console.error('Error al obtener los datos para el PDF:', error);
          this.pdfGenerado.emit(); // Emitir incluso en caso de error
        },
      });
  }

  generarPDF(): void {
    const fileName = `evaluacion_practica_${new Date().toISOString().slice(0, 10)}.pdf`;

    this.pdfGeneratorService
      .generarPdfDesdeHtml('contenidoPdf', fileName)
      .then(() => {
        console.log('PDF generado con éxito');
      })
      .catch((error) => {
        console.error('Error al generar el PDF:', error);
      })
      .finally(() => {
        // Emitir el evento para indicar que la generación del PDF ha terminado
        this.pdfGenerado.emit();
      });
  }
}

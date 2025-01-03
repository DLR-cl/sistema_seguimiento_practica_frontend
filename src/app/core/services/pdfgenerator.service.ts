import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EvaluacionPracticaInterface } from '../interfaces/data.interface';
import { enviroment } from '../../environment/environment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfgeneratorService {

  constructor() { }
  private readonly _http = inject(HttpClient);


  public obtenerDatosParaGenerarPdf(id_practica: number, id_informe_evaluativo: number, id_docente: number){
    const params = {
      id_practica: id_practica,
      id_informe_evaluativo: id_informe_evaluativo,
      id_docente: id_docente
    }
    return this._http.get<EvaluacionPracticaInterface>(`${enviroment.API_URL}/evaluacion-academica/generate`, { params })
  }

  async generarPdfDesdeHtml(elementId: string, fileName: string): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`No se encontró el elemento con ID "${elementId}"`);
    }

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 210; // Ancho de la página A4 en mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(fileName);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      throw error;
    }
  }
}

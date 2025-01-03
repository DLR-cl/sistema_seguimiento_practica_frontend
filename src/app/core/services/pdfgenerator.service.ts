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
  
    // Crear un contenedor "off-screen"
    const offScreenContainer = document.createElement('div');
    offScreenContainer.style.position = 'absolute';
    offScreenContainer.style.top = '0';
    offScreenContainer.style.left = '200vw'; // Fuera del viewport
    offScreenContainer.style.width = '210mm'; // Tamaño de una página A4
    offScreenContainer.style.height = '297mm'; // Tamaño de una página A4
    offScreenContainer.style.background = 'white'; // Fondo blanco para el PDF
  
    // Clonar el contenido del elemento original al contenedor "off-screen"
    const clonedElement = element.cloneNode(true) as HTMLElement;
    offScreenContainer.appendChild(clonedElement);
  
    // Añadir el contenedor "off-screen" al DOM
    document.body.appendChild(offScreenContainer);
  
    try {
      // Generar el canvas desde el contenedor "off-screen"
      const canvas = await html2canvas(clonedElement, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      const imgWidth = 210; // Ancho de la página A4 en mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(fileName);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      throw error;
    } finally {
      // Eliminar el contenedor "off-screen" del DOM
      document.body.removeChild(offScreenContainer);
    }
  }
  
  
  

}

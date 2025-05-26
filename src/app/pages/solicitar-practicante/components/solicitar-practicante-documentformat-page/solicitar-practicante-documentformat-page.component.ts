import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-solicitar-practicante-documentformat-page',
  standalone: true,
  imports: [],
  templateUrl: './solicitar-practicante-documentformat-page.component.html',
  styleUrl: './solicitar-practicante-documentformat-page.component.css'
})
export class SolicitarPracticanteDocumentformatPageComponent {

  urlPDF: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer){
    this.urlPDF = this.sanitizer.bypassSecurityTrustResourceUrl('documentos/sample.pdf');
  }
}

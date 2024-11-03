import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HeaderComponent } from "../components/header/header.component";

@Component({
  selector: 'app-informe-primera-practica',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './informe-primera-practica.component.html',
  styleUrl: './informe-primera-practica.component.css'
})
export class InformePrimeraPracticaAlumnoComponent {

  uploadedFile: File | null = null;
  errorMessage: string = '';

  onFileSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;
    this.processFile(file);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.errorMessage = '';  // Clear previous errors

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.processFile(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  processFile(file: File | null): void {
    if (file) {
      // Verificar que el archivo sea PDF
      if (file.type === 'application/pdf') {
        this.uploadedFile = file;
        this.errorMessage = '';
      } else {
        this.uploadedFile = null;
        this.errorMessage = 'Solo se permiten archivos PDF. Por favor, selecciona un archivo válido.';
      }
    }
  }

  removeFile(): void {
    this.uploadedFile = null;
    this.errorMessage = '';
  }

  seleccionarArchivo(){
    const fileInput = document.getElementById('dropzone-file') as HTMLInputElement;
    if (fileInput) {
        fileInput.click(); // Simula un clic en el input de archivo
    }
  }
}

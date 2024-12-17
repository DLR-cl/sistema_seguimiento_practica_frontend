import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, JsonPipe } from '@angular/common';
import { HeaderComponent } from '../../jefe_compartido/header-jefes/header.component';
import { enviroment } from '../../../environment/environment';

@Component({
  selector: 'app-cargar-usuarios-nomina',
  standalone: true,
  templateUrl: './cargar-usuarios-nomina.component.html',
  styleUrl: './cargar-usuarios-nomina.component.css',
  imports: [JsonPipe, CommonModule, HeaderComponent]
})
export class CargarUsuariosNominaComponent {
  selectedFile: File | null = null;
  uploadResponse?: {intentos: number, cantidad_existentes_sin_cambios: number, cantidad_actualizados: number, cantidad_insertados: number};
  errorMessage: string | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private http: HttpClient) {}

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.errorMessage = null;
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
      this.errorMessage = null;
    }
  }

  onUpload(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post(`${enviroment.API_URL}/alumnos-nomina/excel`, formData).subscribe({
      next: (response: any) => {
        this.uploadResponse = response;
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = 'Error al subir el archivo. Intenta de nuevo.';
        console.error(err);
      }
    });
  }
}

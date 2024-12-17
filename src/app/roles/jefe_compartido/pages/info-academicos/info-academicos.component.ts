import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header-jefes/header.component";

import { CommonModule } from '@angular/common';
import { DatosAcademicosService } from '../../services/datos-academicos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-info-academicos',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './info-academicos.component.html',
  styleUrl: './info-academicos.component.css'
})
export class InfoAcademicosComponent implements OnInit {

  private readonly _datosAcademicosService = inject(DatosAcademicosService);

  // Datos actuales de académicos
  academicosData?: any[];

  // Modelo para el nuevo académico
  nuevoAcademico = {
    nombre: '',
    correo: '',
    rut: ''
  };

  // Mensaje de retroalimentación
  mensajeExito: string = '';
  mensajeError: string = '';

  ngOnInit(): void {
    this.getDatosDeAcademicos();
  }

  // Obtener los datos de académicos
  private getDatosDeAcademicos(): void {
    this._datosAcademicosService.getInfoAcademicos().subscribe(
      data => {
        this.academicosData = data;
        console.log(data);
      },
      error => {
        console.error('Error al cargar datos de académicos', error);
      }
    );
  }

  // Crear un nuevo académico
  crearAcademico(): void {
    this._datosAcademicosService.crearAcademico(this.nuevoAcademico).subscribe(
      (response) => {
        this.mensajeExito = '¡Académico creado exitosamente!';
        this.mensajeError = '';
        this.getDatosDeAcademicos(); // Refrescar los datos
        this.nuevoAcademico = { nombre: '', correo: '', rut: '' }; // Limpiar formulario
      },
      (error) => {
        console.error('Error al crear el académico', error);
        this.mensajeError = 'Error al crear el académico. Inténtelo de nuevo.';
        this.mensajeExito = '';
      }
    );
  }

  verEstadoAcademico(id_academico: number){
    
  }
}

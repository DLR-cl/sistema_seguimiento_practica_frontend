import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { DatosAcademicosService } from '../../services/datos-academicos.service';
import { HeaderComponent } from "../../header-jefes/header.component";
import { CommonModule } from '@angular/common';
import { checkRunValidator } from '../../../../../core/util/validator-rut.function';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-info-academicos',
  standalone: true,
  templateUrl: './info-academicos.component.html',
  styleUrls: ['./info-academicos.component.css'],
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule, FormsModule],
})
export class InfoAcademicosComponent implements OnInit {
  academicosData?: any[]; // Lista de académicos
  formAcademico!: FormGroup; // Formulario Reactivo

  cargando: boolean = true
  cargandoCrear: boolean = false


  constructor(
    private datosAcademicosService: DatosAcademicosService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getDatosDeAcademicos();
    this.initForm();
  }

  // Inicialización del Formulario Reactivo
  private initForm(): void {
    this.formAcademico = new FormGroup({
      nombre: new FormControl ('', [Validators.required, Validators.minLength(3)]),
      correo: new FormControl ('', [Validators.required, Validators.email]),
      rut: new FormControl ('', [Validators.required, Validators.pattern(/^\d{1,8}-\d{1}$/), checkRunValidator()]),
      tipo_usuario: new FormControl ('ACADEMICO'),
    });
  }

  // Obtener los datos de académicos
  private getDatosDeAcademicos(): void {
    this.datosAcademicosService.getInfoAcademicos().subscribe({
      next: (data) => {
        this.academicosData = data,
        this.cargando = false
      },
      error: (err) => console.error('Error al cargar datos', err),
    });
  }

  // Crear un nuevo académico
  crearAcademico(): void {
    if (this.formAcademico.valid) {
      this.cargandoCrear = true
      this.datosAcademicosService.crearAcademico(this.formAcademico.value).subscribe({
        next: (response) => {
          this.getDatosDeAcademicos(); // Actualizar lista
          this.formAcademico.reset({ tipo_usuario: 'ACADEMICO' });
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Académico registrado con éxito.' });
          this.cargandoCrear = false
        },
        error: (error) => {
          console.error('Error al crear académico', error),
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrió un error al registrar el académico: ${error.message}` });
          this.cargandoCrear = false
        },
      });
    }
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatosAcademicosService } from '../../services/datos-academicos.service';
import { HeaderComponent } from "../../header-jefes/header.component";
import { CommonModule } from '@angular/common';
import { validarRUT } from '../../../../core/util/validator-rut.function';


@Component({
  selector: 'app-info-academicos',
  standalone: true,
  templateUrl: './info-academicos.component.html',
  styleUrls: ['./info-academicos.component.css'],
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],
})
export class InfoAcademicosComponent implements OnInit {
  private readonly _datosAcademicosService = inject(DatosAcademicosService);
  academicosData?: any[]; // Lista de académicos
  formAcademico!: FormGroup; // Formulario Reactivo

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getDatosDeAcademicos();
    this.initForm();
  }

  // Inicialización del Formulario Reactivo
  private initForm(): void {
    this.formAcademico = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      rut: ['', [Validators.required, Validators.pattern(/^\d{7,8}-[0-9kK]$/)]],
      tipo_usuario: ['ACADEMICO'],
    });
  }

  // Obtener los datos de académicos
  private getDatosDeAcademicos(): void {
    this._datosAcademicosService.getInfoAcademicos().subscribe({
      next: (data) => (this.academicosData = data),
      error: (err) => console.error('Error al cargar datos', err),
    });
  }
  validarInputRut(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    // Elimina caracteres no permitidos
    let valor = input.value.replace(/[^0-9kK-]/g, '');
  
    // Asegura que solo haya un guion y en la penúltima posición
    const partes = valor.split('-');
    if (partes.length > 2) {
      valor = partes[0] + '-' + partes[1].replace(/-/g, '');
    }
  
    // Limita la posición del guion (penúltimo carácter)
    if (valor.includes('-')) {
      const [rut, dv] = valor.split('-');
      valor = rut.slice(0, 8) + (dv ? '-' + dv.slice(0, 1) : '-');
    }
  
    // Asigna el valor filtrado al input
    input.value = valor;
  }
  
  // Crear un nuevo académico
  crearAcademico(): void {
    if (this.formAcademico.valid) {
      this._datosAcademicosService.crearAcademico(this.formAcademico.value).subscribe({
        next: (response) => {
          this.getDatosDeAcademicos(); // Actualizar lista
          this.formAcademico.reset({ tipo_usuario: 'ACADEMICO' });
        },
        error: (err) => console.error('Error al crear académico', err),
      });
    }
  }
}

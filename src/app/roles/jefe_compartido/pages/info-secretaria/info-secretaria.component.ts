import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from "../../header-jefes/header.component";
import { DatosSecretariaService } from '../../services/datos-secretaria.service';

@Component({
  selector: 'app-info-secretaria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './info-secretaria.component.html',
  styleUrls: ['./info-secretaria.component.css']
})
export class InfoSecretariaComponent implements OnInit {
  secretariasData: any[] = []; // Datos de secretarias obtenidos del servicio
  formSecretaria!: FormGroup; // Formulario Reactivo

  mostrarModal = false; // Estado del modal
  secretariaSeleccionada: any = null; // Información de la secretaria seleccionada

  constructor(
    private datosSecretariaService: DatosSecretariaService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.obtenerSecretarias();
    this.initForm();
  }

  private initForm(): void {
    this.formSecretaria = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      rut: ['', [Validators.required, Validators.pattern(/^\d{7,8}-[0-9kK]$/)]],
      tipo_usuario: ['SECRETARIA']
    });
  }

  obtenerSecretarias(): void {
    this.datosSecretariaService.getInfoSecretarias().subscribe({
      next: (data) => (this.secretariasData = data),
      error: (err) => console.error('Error al obtener las secretarias:', err),
    });
  }

  crearSecretaria(): void {
    if (this.formSecretaria.valid) {
      const nuevaSecretaria = this.formSecretaria.value;
      this.datosSecretariaService.crearSecretaria(nuevaSecretaria).subscribe({
        next: (data) => {
          this.secretariasData.push(data);
          this.formSecretaria.reset({ tipo_usuario: 'SECRETARIA' });
        },
        error: (err) => console.error('Error al crear secretaria:', err),
      });
    }
  }
   // Validar y limpiar la entrada del RUT
   validarInputRut(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/[^0-9kK-]/g, ''); // Solo números, k/K y guion

    // Limita la posición del guion (penúltimo carácter)
    if (valor.includes('-')) {
      const [rut, dv] = valor.split('-');
      valor = rut.slice(0, 8) + (dv ? '-' + dv.slice(0, 1) : '-');
    }

    input.value = valor;
    this.formSecretaria.get('rut')?.setValue(valor);
  }

  // Abrir Modal
  abrirModal(secretaria: any): void {
    
    this.secretariaSeleccionada = secretaria;
    this.mostrarModal = true;
  }

  // Cerrar Modal
  cerrarModal(): void {
    this.mostrarModal = false;
    this.secretariaSeleccionada = null;
  }
}

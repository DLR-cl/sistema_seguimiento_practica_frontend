import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from "../../header-jefes/header.component";
import { DatosSecretariaService } from '../../services/datos-secretaria.service';
import { MessageService } from 'primeng/api';
import { checkRunValidator } from '../../../../core/util/validator-rut.function';

@Component({
  selector: 'app-info-secretaria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FormsModule],
  templateUrl: './info-secretaria.component.html',
  styleUrls: ['./info-secretaria.component.css']
})
export class InfoSecretariaComponent implements OnInit {

  cargando: boolean = true;
  cargandoCrear: boolean = false;

  secretariasData: any[] = []; // Datos de secretarias obtenidos del servicio
  formSecretaria!: FormGroup; // Formulario Reactivo

  mostrarModal = false; // Estado del modal
  secretariaSeleccionada: any = null; // Información de la secretaria seleccionada

  constructor(
    private datosSecretariaService: DatosSecretariaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.obtenerSecretarias();
    this.initForm();
  }

  private initForm(): void {
    this.formSecretaria = new FormGroup({
      nombre: new FormControl ('', [Validators.required, Validators.minLength(3)]),
      correo: new FormControl ('', [Validators.required, Validators.email]),
      rut: new FormControl ('', [Validators.required, Validators.pattern(/^\d{1,8}-\d{1}$/), checkRunValidator()]),
      tipo_usuario: new FormControl ('SECRETARIA'),
    });
  }

  obtenerSecretarias(): void {
    this.datosSecretariaService.getInfoSecretarias().subscribe({
      next: (data) => {
        this.secretariasData = data;
        console.log(data)
        this.cargando = false
      },
      error: (err) => console.error('Error al obtener las secretarias:', err),
    });
  }

  crearSecretaria(): void {
    if (this.formSecretaria.valid) {
      this.cargandoCrear = true
      const nuevaSecretaria = this.formSecretaria.value;
      this.datosSecretariaService.crearSecretaria(nuevaSecretaria).subscribe({
        next: (data) => {
          this.secretariasData.push(data);
          this.formSecretaria.reset({ tipo_usuario: 'SECRETARIA' });
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Secretaria registrada con éxito.' });
          this.cargandoCrear = false
        },
        error: (error) => {
          console.error('Error al crear secretaria:', error)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrió un error al registrar la secretaria: ${error.message}` });
          this.cargandoCrear = false
        },
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

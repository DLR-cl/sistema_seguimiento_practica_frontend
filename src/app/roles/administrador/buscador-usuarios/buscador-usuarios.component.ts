import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Tipo de Usuario Filter -->
        <div>
          <label for="tipoUsuario" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tipo de Usuario
          </label>
          <select id="tipoUsuario" [(ngModel)]="tipoUsuarioFiltro" (ngModelChange)="aplicarFiltros()"
            class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
            <option value="">Todos los usuarios</option>
            <option value="JEFE_CARRERA">Jefe de Carrera</option>
            <option value="JEFE_DEPARTAMENTO">Jefe de Departamento</option>
            <option value="SECRETARIA_CARRERA">Secretaria de Carrera</option>
            <option value="SECRETARIA_DEPARTAMENTO">Secretaria de Departamento</option>
            <option value="ACADEMICO">Académico</option>
            <option value="SUPERVISOR">Supervisor</option>
            <option value="ALUMNO">Alumno</option>
          </select>
        </div>

        <!-- Search -->
        <div>
          <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Buscar
          </label>
          <input type="text" id="search" [(ngModel)]="terminoBusqueda" (ngModelChange)="aplicarFiltros()"
            placeholder="Buscar por nombre, email o RUT..."
            class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        </div>
      </div>
    </div>
  `
})
export class BuscadorUsuariosComponent {
  @Output() filtrosCambiados = new EventEmitter<{tipoUsuario: string, terminoBusqueda: string}>();
  
  tipoUsuarioFiltro: string = '';
  terminoBusqueda: string = '';

  aplicarFiltros() {
    this.filtrosCambiados.emit({
      tipoUsuario: this.tipoUsuarioFiltro,
      terminoBusqueda: this.terminoBusqueda
    });
  }
}

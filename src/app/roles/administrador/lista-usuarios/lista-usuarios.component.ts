import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  rut: string;
  tipo_usuario: string;
}

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule],
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <!-- Loading Spinner -->
      <div *ngIf="cargando" class="flex justify-center items-center p-8">
        <p-progressSpinner></p-progressSpinner>
      </div>

      <!-- Users Table -->
      <div *ngIf="!cargando" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Nombre
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                RUT
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Tipo de Usuario
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr *ngFor="let usuario of usuariosPaginados" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{usuario.nombre}}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{usuario.correo}}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{usuario.rut}}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{usuario.tipo_usuario}}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                <button *ngIf="esRolPermitido(usuario.tipo_usuario)" (click)="onGestionarUsuario(usuario)"
                  class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                  Gestionar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button (click)="cambiarPagina(paginaActual - 1)" [disabled]="paginaActual === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            Anterior
          </button>
          <button (click)="cambiarPagina(paginaActual + 1)" [disabled]="paginaActual === totalPaginas"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            Siguiente
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Mostrando
              <span class="font-medium">{{(paginaActual - 1) * usuariosPorPagina + 1}}</span>
              a
              <span class="font-medium">{{min(paginaActual * usuariosPorPagina, totalUsuarios)}}</span>
              de
              <span class="font-medium">{{totalUsuarios}}</span>
              resultados
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button (click)="cambiarPagina(paginaActual - 1)" [disabled]="paginaActual === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                <span class="sr-only">Anterior</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                  aria-hidden="true">
                  <path fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
              </button>
              <button *ngFor="let pagina of [].constructor(totalPaginas); let i = index" (click)="cambiarPagina(i + 1)"
                [class.bg-indigo-50]="paginaActual === i + 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                {{i + 1}}
              </button>
              <button (click)="cambiarPagina(paginaActual + 1)" [disabled]="paginaActual === totalPaginas"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                <span class="sr-only">Siguiente</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                  aria-hidden="true">
                  <path fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ListaUsuariosComponent implements OnChanges {
  @Input() usuarios: Usuario[] = [];
  @Input() cargando: boolean = false;
  @Output() gestionarUsuario = new EventEmitter<Usuario>();

  paginaActual: number = 1;
  usuariosPorPagina: number = 10;
  totalUsuarios: number = 0;
  totalPaginas: number = 0;
  usuariosPaginados: Usuario[] = [];

  rolesPermitidos = [
    'JEFE_CARRERA',
    'JEFE_DEPARTAMENTO',
    'SECRETARIA_CARRERA',
    'SECRETARIA_DEPARTAMENTO',
    'ACADEMICO',
    'JEFE_EMPLEADOR'
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['usuarios']) {
      this.totalUsuarios = this.usuarios.length;
      this.totalPaginas = Math.ceil(this.totalUsuarios / this.usuariosPorPagina);
      this.actualizarUsuariosPaginados();
    }
  }

  esRolPermitido(tipoUsuario: string): boolean {
    return this.rolesPermitidos.includes(tipoUsuario);
  }

  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
      this.actualizarUsuariosPaginados();
    }
  }

  actualizarUsuariosPaginados() {
    const inicio = (this.paginaActual - 1) * this.usuariosPorPagina;
    const fin = inicio + this.usuariosPorPagina;
    this.usuariosPaginados = this.usuarios.slice(inicio, fin);
  }

  onGestionarUsuario(usuario: Usuario) {
    this.gestionarUsuario.emit(usuario);
  }

  min(a: number, b: number): number {
    return Math.min(a, b);
  }
}

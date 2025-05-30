import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../pages/roles/jefe_compartido/header-jefes/header.component';
import { UsuariosService } from '../../../../pages/roles/jefe_compartido/services/usuarios.service';
import { forkJoin } from 'rxjs';  // Importamos forkJoin
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { cambiarCorreo } from '../../../../pages/roles/jefe_compartido/dto/usuarios.dto';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  rut: string;
  tipo_usuario: string;
}

@Component({
  selector: 'app-gestionar-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    DialogModule,
    ConfirmDialogModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  templateUrl: './gestionar-usuarios.component.html',
  styleUrls: ['./gestionar-usuarios.component.css'],
  providers: [MessageService]
})
export class GestionarUsuariosComponent implements OnInit {

  cargando: boolean = true;

  modalVisible: boolean = false;
  usuarioSeleccionado: Usuario | null = null;
  nuevoCorreo: string = '';
  rolesConCambiarCorreo: string[] = ['JEFE_CARRERA', 'JEFE_DEPARTAMENTO'];

  // Propiedades para el filtrado y paginación
  tipoUsuarioFiltro: string = '';
  terminoBusqueda: string = '';
  usuariosFiltrados: Usuario[] = [];
  paginaActual: number = 1;
  usuariosPorPagina: number = 10;
  totalUsuarios: number = 0;
  totalPaginas: number = 0;
  Math = Math; // Para usar en el template

  constructor(
    private usuariosService: UsuariosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    forkJoin({
      academicos: this.usuariosService.getUsuariosRol('ACADEMICO'),
      supervisores: this.usuariosService.getUsuariosRol('JEFE_EMPLEADOR'),
      alumnos: this.usuariosService.getUsuariosRol('ALUMNO_PRACTICA'),
      listadoAdministrador: this.usuariosService.listadoAdministrador() // Incluimos la nueva llamada
    }).subscribe({
      next: ({ academicos, supervisores, alumnos, listadoAdministrador }) => {
        this.listaAcademicos = [...academicos];
        this.listaSupervisores = [...supervisores];
        this.listaAlumnos = [...alumnos];
  
        // Clasificamos los usuarios del listadoAdministrador en sus respectivas listas
        listadoAdministrador.forEach((usuario: any) => {
          switch (usuario.tipo_usuario) {
            case 'JEFE_DEPARTAMENTO':
            case 'JEFE_CARRERA':
              this.listaJefesCarreraDepartamento.push(usuario); // Juntamos los dos tipos en una sola lista
              break;
            case 'SECRETARIA_DEPARTAMENTO':
            case 'SECRETARIA_CARRERA':
              this.listaSecretarias.push(usuario);
              break;
          }
        });
  
        // Inicializamos las listas filtradas y términos de búsqueda
        this.filteredListas = [
          [...this.listaJefesCarreraDepartamento],
          [...this.listaSecretarias],
          [...this.listaAcademicos],
          [...this.listaSupervisores],
          [...this.listaAlumnos]
        ];
  
        this.searchTerms = Array(this.filteredListas.length).fill('');
  
        this.cargando = false; // Finalizamos la carga

        // Combinar todas las listas y aplicar filtros iniciales
        this.aplicarFiltros();
      },
      error: error => {
        console.error("Error al obtener los datos de los usuarios", error);
        this.cargando = false; // Aseguramos detener la carga en caso de error
      }
    });
  }

  listaSecretarias: Usuario[] = [];
  listaAcademicos: Usuario[] = [];
  listaAlumnos: Usuario[] = [];
  listaSupervisores: Usuario[] = [];
  listaJefesCarreraDepartamento: Usuario[] = [];
  listaAdministradores: any = [];

  searchTerms: string[] = []; // Array para los términos de búsqueda de cada lista
  filteredListas: any[][] = []; // Array de listas filtradas

  // Verifica si el rol del usuario es permitido
  esRolPermitido(rol: string): boolean {
    const rolesPermitidos = [
      'JEFE_CARRERA',
      'JEFE_DEPARTAMENTO',
      'SECRETARIA_CARRERA',
      'SECRETARIA_DEPARTAMENTO',
      'ACADEMICO',
      'JEFE_EMPLEADOR'
    ];
    return rolesPermitidos.includes(rol);
  }

  debeMostrarRut(lista: any[]): boolean {
    // Especificar roles para los que se debe mostrar el RUT
    const rolesConRut = ['ACADEMICO', 'JEFE_EMPLEADOR', 'ALUMNO_PRACTICA']; 
    return lista.some((usuario) => rolesConRut.includes(usuario.tipo_usuario));
  }

  abrirModal(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
    this.nuevoCorreo = usuario.correo;
    this.modalVisible = true;
    this.mostrarInputCorreo = false;
    console.log(this.usuarioSeleccionado, 'usuario')
  }

  cerrarModal() {
    this.modalVisible = false;
    this.usuarioSeleccionado = null;
    this.nuevoCorreo = '';
    this.mostrarInputCorreo = false; // Reinicia el estado del input
  }

  mostrarInputCorreo = false;  // Controla la visibilidad del input de correo

  // Método que se llama cuando el usuario hace clic en "Editar Correo"
  activarEdicionCorreo() {
    this.mostrarInputCorreo = true;  // Mostrar el input de correo
    this.nuevoCorreo = this.usuarioSeleccionado?.correo || '';
  }

  // El resto del código se mantiene igual
  confirmarCambiarCorreo() {
    this.confirmationService.confirm({
      message: `¿Estás seguro de actualizar el correo a "${this.nuevoCorreo}"?`,
      acceptButtonStyleClass: 'bg-red-600 border-none hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg',
      rejectButtonStyleClass: 'bg-gray-300 border-none hover:bg-gray-400 text-black text-sm font-medium px-4 py-2 rounded-lg',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        const usuario: cambiarCorreo = {
          correoAnterior: this.usuarioSeleccionado?.correo || '',
          correoActual: this.nuevoCorreo
        }
        this.usuariosService.cambiarCorreo(usuario).subscribe({
          next: result => {
            this.messageService.add({ severity: 'success', summary: 'Correo Actualizado', detail: 'El correo ha sido actualizado exitosamente.' });
            this.cerrarModal();    
          },
          error: error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrió un error al actualizar el correo: ${error.message}` });
          }
        })
      }
    });
  }

  confirmarRestablecerContrasena() {
    this.confirmationService.confirm({
      message: `¿Estás seguro de restablecer la contraseña para ${this.usuarioSeleccionado?.nombre}?`,
      acceptButtonStyleClass: 'bg-red-600 border-none hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg',
      rejectButtonStyleClass: 'bg-gray-300 border-none hover:bg-gray-400 text-black text-sm font-medium px-4 py-2 rounded-lg',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.usuariosService.restablecerContraseña(this.usuarioSeleccionado?.id_usuario || 0, this.usuarioSeleccionado?.tipo_usuario || '').subscribe({
          next: result => {
            this.messageService.add({ severity: 'success', summary: 'Contraseña Restablecida', detail: 'La contraseña ha sido restablecida.' });
            this.cerrarModal();
          },
          error: error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrió un error al restablecer la contraseña: ${error.message}` });
          }
        })
      }
    });
  }

  filterTable(index: number) {
    const searchTermLower = this.searchTerms[index].toLowerCase(); // Convertimos a minúsculas para la comparación
  
    // Filtramos la lista de acuerdo al término de búsqueda (nombre o rut)
    this.filteredListas[index] = this.getListaByIndex(index).filter((usuario: any) => {
      // Comprobamos si el usuario tiene el campo 'rut' antes de intentar acceder a él
      const hasRut = usuario.rut && usuario.rut.toLowerCase().startsWith(searchTermLower);
      return usuario.nombre.toLowerCase().includes(searchTermLower) || hasRut;
    });
  }
  

  // Método que devuelve la lista original según el índice
  getListaByIndex(index: number) {
    switch (index) {
      case 0: return this.listaJefesCarreraDepartamento;
      case 1: return this.listaSecretarias;
      case 2: return this.listaAcademicos;
      case 3: return this.listaSupervisores;
      case 4: return this.listaAlumnos;
      default: return [];
    }
  }

  // Función para obtener el nombre del rol de la lista
  getRolNombre(lista: any[]) {
    if (lista === this.listaJefesCarreraDepartamento) return 'Jefes de Carrera y Departamento';
    if (lista === this.listaSecretarias) return 'Secretarias';
    if (lista === this.listaAcademicos) return 'Académicos';
    if (lista === this.listaAlumnos) return 'Alumnos';
    if (lista === this.listaSupervisores) return 'Supervisores';
    return 'Usuarios';
  }

  aplicarFiltros() {
    // Combinar todas las listas
    let todosLosUsuarios = [
      ...this.listaJefesCarreraDepartamento,
      ...this.listaSecretarias,
      ...this.listaAcademicos,
      ...this.listaSupervisores,
      ...this.listaAlumnos
    ];

    // Aplicar filtro por tipo de usuario
    if (this.tipoUsuarioFiltro) {
      todosLosUsuarios = todosLosUsuarios.filter(usuario => 
        usuario.tipo_usuario === this.tipoUsuarioFiltro
      );
    }

    // Aplicar búsqueda
    if (this.terminoBusqueda) {
      const busqueda = this.terminoBusqueda.toLowerCase().trim();
      todosLosUsuarios = todosLosUsuarios.filter(usuario =>
        (usuario.nombre && usuario.nombre.toLowerCase().includes(busqueda)) ||
        (usuario.correo && usuario.correo.toLowerCase().includes(busqueda)) ||
        (usuario.rut && usuario.rut.toLowerCase().includes(busqueda))
      );
    }

    // Actualizar totales
    this.totalUsuarios = todosLosUsuarios.length;
    this.totalPaginas = Math.ceil(this.totalUsuarios / this.usuariosPorPagina);

    // Aplicar paginación
    const inicio = (this.paginaActual - 1) * this.usuariosPorPagina;
    this.usuariosFiltrados = todosLosUsuarios.slice(inicio, inicio + this.usuariosPorPagina);
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      this.aplicarFiltros();
    }
  }
}

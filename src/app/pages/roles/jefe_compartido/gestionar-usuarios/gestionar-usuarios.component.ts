import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header-jefes/header.component';
import { UsuariosService } from '../services/usuarios.service';
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
import { cambiarCorreo } from '../dto/usuarios.dto';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
@Component({
  selector: 'app-gestionar-usuarios',
  standalone: true,
  imports: [CommonModule, TableModule, InputTextModule, ButtonModule, FormsModule, DialogModule, ConfirmDialogModule, MessageModule, MessagesModule, NavbarComponent],
  templateUrl: './gestionar-usuarios.component.html',
  styleUrls: ['./gestionar-usuarios.component.css']
})
export class GestionarUsuariosComponent implements OnInit {

  cargando: boolean = true;

  modalVisible: boolean = false;
  usuarioSeleccionado: any;
  nuevoCorreo: string = '';
  rolesConCambiarCorreo: string[] = ['JEFE_CARRERA', 'JEFE_DEPARTAMENTO'];

  constructor(
    private usuariosService: UsuariosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
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
      },
      error: error => {
        console.error("Error al obtener los datos de los usuarios", error);
        this.cargando = false; // Aseguramos detener la carga en caso de error
      }
    });
  }

  listaSecretarias: any = [];
  listaAcademicos: any = [];
  listaAlumnos: any = [];
  // listaJefeCarrera: any = [];
  // listaJefeDepartamento: any = [];
  listaSupervisores: any = [];
  listaJefesCarreraDepartamento: any = []
  listaAdministradores: any = []

  searchTerms: string[] = []; // Array para los términos de búsqueda de cada lista
  filteredListas: any[][] = []; // Array de listas filtradas

  // Verifica si el rol del usuario es permitido
  esRolPermitido(rol: string): boolean {
    return this.rolesConCambiarCorreo.includes(rol);
  }

  debeMostrarRut(lista: any[]): boolean {
    // Especificar roles para los que se debe mostrar el RUT
    const rolesConRut = ['ACADEMICO', 'JEFE_EMPLEADOR', 'ALUMNO_PRACTICA']; 
    return lista.some((usuario) => rolesConRut.includes(usuario.tipo_usuario));
  }

  abrirModal(usuario: any) {
    this.usuarioSeleccionado = usuario;
    this.nuevoCorreo = usuario.correo;
    this.modalVisible = true;
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
          correoAnterior: this.usuarioSeleccionado.correo,
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
      message: `¿Estás seguro de restablecer la contraseña para ${this.usuarioSeleccionado.nombre}?`,
      acceptButtonStyleClass: 'bg-red-600 border-none hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg',
      rejectButtonStyleClass: 'bg-gray-300 border-none hover:bg-gray-400 text-black text-sm font-medium px-4 py-2 rounded-lg',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.usuariosService.restablecerContraseña(this.usuarioSeleccionado.id_usuario, this.usuarioSeleccionado.tipo_usuario).subscribe({
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
}

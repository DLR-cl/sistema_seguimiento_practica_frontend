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

@Component({
  selector: 'app-gestionar-usuarios',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TableModule, InputTextModule, ButtonModule, FormsModule, DialogModule, ConfirmDialogModule, MessageModule, MessagesModule],
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

  // Verifica si el rol del usuario es permitido
  esRolPermitido(rol: string): boolean {
    return this.rolesConCambiarCorreo.includes(rol);
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
  }

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
        console.log(this.usuarioSeleccionado)
        console.log(usuario)
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
      accept: () => {
        this.usuariosService.restablecerContraseña(this.usuarioSeleccionado.id_usuario, this.usuarioSeleccionado.tipo_usuario).subscribe({
          next: result =>{
            this.messageService.add({ severity: 'success', summary: 'Contraseña Restablecida', detail: 'La contraseña ha sido restablecida.' });
            this.cerrarModal();
          },
          error: error =>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrió un error al restablecer la contraseña: ${error.message}` });
          }
        })

      }
    });
  }


  ngOnInit(): void {
    // Usamos forkJoin para esperar que todas las peticiones se completen
    forkJoin([
      this.usuariosService.getUsuariosRol('SECRETARIA'),
      this.usuariosService.getUsuariosRol('ACADEMICO'),
      this.usuariosService.getUsuariosRol('JEFE_EMPLEADOR'),
      this.usuariosService.getUsuariosRol('JEFE_CARRERA'),
      this.usuariosService.getUsuariosRol('JEFE_DEPARTAMENTO'),
      this.usuariosService.getUsuariosRol('ALUMNO_PRACTICA')
    ]).subscribe({
      next: ([secretarias, academicos, supervisores, jefeC, jefeD, alumnos]) => {
        this.listaSecretarias = [...secretarias];
        this.listaAcademicos = [...academicos];
        this.listaSupervisores = [...supervisores];
        this.listaJefeCarrera = [...jefeC];
        this.listaJefeDepartamento = [...jefeD];
        this.listaAlumnos = [...alumnos];

        this.cargando = false;

        // Inicializamos filteredListas con las listas originales
        this.filteredListas = [
          [...this.listaSecretarias],
          [...this.listaAcademicos],
          [...this.listaSupervisores],
          [...this.listaAlumnos],
          [...this.listaJefeCarrera],
          [...this.listaJefeDepartamento]
        ];

        // Inicializamos searchTerms con valores vacíos (uno por lista)
        this.searchTerms = Array(this.filteredListas.length).fill('');

      },
      error: error => {
        console.log("Error al obtener los datos de los usuarios", error);
        this.cargando = false; 
      }
    });

  }

  listaSecretarias: any = [];
  listaAcademicos: any = [];
  listaAlumnos: any = [];
  listaJefeCarrera: any = [];
  listaJefeDepartamento: any = [];
  listaSupervisores: any = [];

  searchTerms: string[] = []; // Array para los términos de búsqueda de cada lista
  filteredListas: any[][] = []; // Array de listas filtradas

   // Método para filtrar la lista por nombre o rut para cada lista
   filterTable(index: number) {
    const searchTermLower = this.searchTerms[index].toLowerCase(); // Convertimos a minúsculas para la comparación

    // Filtramos la lista de acuerdo al término de búsqueda (nombre o rut)
    this.filteredListas[index] = this.getListaByIndex(index).filter((usuario:any) =>
      usuario.nombre.toLowerCase().includes(searchTermLower) || usuario.rut.toLowerCase().startsWith(searchTermLower)
    );
  }

  // Método que devuelve la lista original según el índice
  getListaByIndex(index: number) {
    switch (index) {
      case 0: return this.listaSecretarias;
      case 1: return this.listaAcademicos;
      case 2: return this.listaAlumnos;
      case 3: return this.listaJefeCarrera;
      case 4: return this.listaJefeDepartamento;
      default: return [];
    }
  }

  // Función para obtener el nombre del rol de la lista
  getRolNombre(lista: any[]) {
    if (lista === this.listaSecretarias) return 'Secretarias';
    if (lista === this.listaAcademicos) return 'Académicos';
    if (lista === this.listaAlumnos) return 'Alumnos';
    if (lista === this.listaJefeCarrera) return 'Jefes de Carrera';
    if (lista === this.listaJefeDepartamento) return 'Jefes de Departamento';
    if (lista === this.listaSupervisores) return 'Supervisores';
    return 'Usuarios';
  }
}

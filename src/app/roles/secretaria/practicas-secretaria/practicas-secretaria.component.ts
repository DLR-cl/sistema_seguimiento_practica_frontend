import { Component, inject, OnInit } from '@angular/core';
import { HeaderSecretariaComponent } from "../header-secretaria/header-secretaria.component";
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AcademicoInformes, AsignacionInformesService, PracticaInfo } from '../services/asignacion-informes.service';
import { AsignacionDto } from '../dto/secretaria-data.dto';
import { InputTextModule } from 'primeng/inputtext';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';
import { PayloadInterface } from '../../../shared/interface/payload.interface';
import { TipoUsuario } from '../../../enum/enumerables.enum';


@Component({
  selector: 'app-practicas-secretaria',
  standalone: true,
  imports: [HeaderSecretariaComponent, CommonModule, DropdownModule, FormsModule, DialogModule, InputTextModule],
  templateUrl: './practicas-secretaria.component.html',
  styleUrl: './practicas-secretaria.component.css'
})
export class PracticasSecretariaComponent implements OnInit {

  private readonly _asignacionService = inject(AsignacionInformesService);
  private readonly _dataUserService = inject(AuthStateService);

  


  ngOnInit(): void {
    this.getProfesores(),
    this.getPracticas(),
    this.getData()
  }

  dataUser?: PayloadInterface | null;
  tipoJefeCarrera = TipoUsuario.JEFE_CARRERA;
  tipoSecretaria= TipoUsuario.SECRETARIA;


  buscador: string = ''

  practicasBackend: PracticaInfo[] = []
  profesoresBackend: AcademicoInformes[] = []
  
  modalAsignacion = false;
  modalDetalles = false;
  practicaSeleccionada!: PracticaInfo | null;
  copiaPractica!: PracticaInfo | null;

  textoEstadoInforme: Record<string, string> = {
    ENVIADA: 'Enviado',
    REVISION: 'Revisión',
    CORRECCION: 'Corrección',
    ESPERA: 'Espera',
    APROBADA: 'Aprobada'
  };
  textoEstadoInformeConfidencial: Record<string, string> = {
    ENVIADA: 'Enviado',
    REVISION: 'Revisión',
    CORRECCION: 'Corrección',
    ESPERA: 'Espera',
    APROBADA: 'Aprobada'
  };

  
  textoEstadoPractica: Record<string, string> = {
    CURSANDO: 'Cursando',
    REVISION_GENERAL: 'Revisión General',
    ESPERA_INFORMES: 'Espera Informes',
    FINALIZADA: 'Finalizada',
    INFORMES_RECIBIDOS: 'Informes Recibidos'
  };


  textoModalidad: Record<string, string> = {
    PRESENCIAL: 'Presencial',
    REMOTO: 'Remoto',
    SEMI_PRESENCIAL: 'Semipresencial'
  };

  paginaActual: number = 0; // Página actual
  elementosPorPagina: number = 5; // Número de elementos por página

  private getData() {
    this.dataUser = this._dataUserService.getData();
  }

  obtenerDatosPaginados() {
    // Filtrar los datos solo si hay un valor en el buscador
    const datosFiltrados = this.buscador
      ? this.practicasBackend.filter((data) =>
          data.alumno_rut.startsWith(this.buscador) // Verifica la secuencia exacta
        )
      : this.practicasBackend;
  
    // Calcular el inicio y fin de los elementos paginados
    const inicio = this.paginaActual * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
  
    // Retorna los elementos paginados
    return datosFiltrados.slice(inicio, fin);
  }
  

  // Cambiar a la página anterior
  paginaAnterior(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
    }
  }

  // Cambiar a la página siguiente
  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas - 1) {
      this.paginaActual++;
    }
  }

  // Total de páginas
  get totalPaginas(): number {
    return Math.ceil(this.practicasBackend.length / this.elementosPorPagina);
  }

  abrirModal() {
    this.modalAsignacion = true;
  }

  asignarProfesor(profesor: AcademicoInformes) {
    if (this.copiaPractica!.academico_nombre) {
      const profesorAnterior = this.profesoresBackend.find(p => p.nombre_academico === this.copiaPractica!.academico_nombre);
      if (profesorAnterior) profesorAnterior.cantidad_informes--;
    }

    this.copiaPractica!.academico_nombre = profesor.nombre_academico;
    this.copiaPractica!.academico_rut = profesor.rut_academico;
    profesor.cantidad_informes++;
  }

  quitarProfesor() {
    const profesor = this.profesoresBackend.find(p => p.nombre_academico === this.copiaPractica!.academico_nombre);
    if (profesor) profesor.cantidad_informes--;
    this.copiaPractica!.academico_nombre = '';
    this.copiaPractica!.academico_rut = '';
    console.log(this.copiaPractica)
  }

  confirmarAsignacion() {
    if(this.copiaPractica?.academico_nombre !== ''){
      const academicoAsociado: AsignacionDto= {
        id_informe_alumno: this.copiaPractica?.id_informe_alumno!,
        id_academico: this.profesoresBackend.find(academico => academico.nombre_academico === this.copiaPractica?.academico_nombre)?.id_academico!,
        id_practica: this.copiaPractica?.id_practica!,
        id_informe_confidencial: this.copiaPractica?.id_informe_confidencial!
      }
  
      this._asignacionService.asociarInformeAcademico(academicoAsociado).subscribe(result => {
        this.cerrarModalAsignacion();
        this.getProfesores()
        this.getPracticas();
        console.log(this.copiaPractica)
      })
    } else{
      alert('Debe asignar un profesor antes de confirmar')
    }
    
  }

  cancelarAsignacion() {
    if (this.copiaPractica!.academico_nombre) {
      const profesorActual = this.profesoresBackend.find(p => p.nombre_academico === this.copiaPractica!.academico_nombre);
      if (profesorActual) profesorActual.cantidad_informes--;
    }
  
    if (this.practicaSeleccionada?.academico_nombre) {
      const profesorOriginal = this.profesoresBackend.find(p => p.nombre_academico === this.practicaSeleccionada?.academico_nombre);
      if (profesorOriginal) profesorOriginal.cantidad_informes++;
    }  
    this.copiaPractica = {... this.practicaSeleccionada!}
    this.cerrarModalAsignacion();
  }

  cerrarModalAsignacion() {
    this.modalAsignacion = false;
  }

  public getProfesores(){
   this._asignacionService.getProfesores().subscribe(result =>{
    this.profesoresBackend = result
   }) 
  }

  public getPracticas(){
    this._asignacionService.getPracticas().subscribe(result =>{
      console.log(result)
      this.practicasBackend = result
      if(this.modalDetalles){
        this.practicaSeleccionada = result.find(practica => practica.id_practica == this.practicaSeleccionada?.id_practica)!
      }
    })
  }

  abrirModalDetalles(practica: any) {
    this.practicaSeleccionada = practica;
    this.modalDetalles = true;  
    this.copiaPractica = { ...practica };
  }
  
  cerrarModalDetalles() {
    this.modalDetalles = false;
    this.practicaSeleccionada = null;
  }

}
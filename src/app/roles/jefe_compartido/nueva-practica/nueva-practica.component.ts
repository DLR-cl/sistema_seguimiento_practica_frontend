import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../header-jefes/header.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { alumno, AlumnoNominaInterface, empresa, GenerarPracticaService, jefeSupervisor, nuevaPractica, nuevoAlumno, nuevoSupervisor } from '../services/generar-practica.service';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { AlumnosNominaService } from '../services/alumnos-nomina.service';

@Component({
  selector: 'app-nueva-practica',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterLink, ReactiveFormsModule, DialogModule, FormsModule, FloatLabelModule, InputTextModule, DropdownModule, CalendarModule],
  templateUrl: './nueva-practica.component.html',
  styleUrl: './nueva-practica.component.css'
})
export class NuevaPracticaComponent implements OnInit{

  private servicioPracticas= inject(GenerarPracticaService);
  private readonly _alumnosNominaService = inject(AlumnosNominaService);
  errorMessage?:string | null = null;

  ngOnInit(): void {
    this.obtenerEmpresas()
    this.obtenerAlumnos()
    this.formPractica.get('id_empresa')?.valueChanges.subscribe((idEmpresa) => {
      this.filterSupervisores(idEmpresa);
    });
  }
  
  empresas: empresa[] = [];

  tipoPracticas: any = [{tipo: "PRACTICA_UNO", titulo:'Práctica profesional I'},{tipo:"PRACTICA_DOS", titulo:"Práctica profesional II"}]

  modalidades: any = [{tipo: "PRESENCIAL", titulo: "Presencial"},{tipo: "SEMI_PRESENCIAL", titulo: "Semipresencial"}, {tipo: "REMOTO", titulo: "Remoto"}]
  
  supervisoresFiltrados: jefeSupervisor[] = [];

  alumnos: alumno[] = [];

  formPractica: FormGroup = new FormGroup({
    id_empresa: new FormControl (null, Validators.required),
    id_supervisor: new FormControl (null, Validators.required),
    id_alumno: new FormControl (null, Validators.required), 
    fecha_inicio:  new FormControl ('', Validators.required),
    fecha_termino: new FormControl ('', Validators.required),
    tipo_practica: new FormControl ('', Validators.required),
    modalidad: new FormControl ('', Validators.required),
    cantidad_horas: new FormControl (null, [Validators.required, Validators.min(1)]),
    horas_semanales: new FormControl (null, [Validators.required, Validators.min(1)]),
  });

  formEmpresa: FormGroup = new FormGroup({
    nombre_razon_social: new FormControl ('', Validators.required),
    ubicacion: new FormControl ('', Validators.required),
    rubro: new FormControl ('', Validators.required),
    nombre_gerente: new FormControl ('', Validators.required)
  });

  formSupervisor: FormGroup = new FormGroup({
    nombre: new FormControl ('', Validators.required),
    rut: new FormControl ('', Validators.required),
    correo: new FormControl ('', [Validators.required, Validators.email]),
    cargo: new FormControl ('', Validators.required),
  });

  formAlumno: FormGroup = new FormGroup({
    nombre: new FormControl ('', Validators.required),
    correo: new FormControl (null, [Validators.required, Validators.email]),
    rut: new FormControl ('', Validators.required)
  });

  showModal = false;
  modalType: 'empresa' | 'supervisor' | 'alumno' | null = null;
  modalTitle = '';

  pasoActual = 1;  

  openModal(type: 'empresa' | 'supervisor' | 'alumno') {
    this.modalType = type;
    this.showModal = true;
    this.modalTitle = `Agregar ${type.charAt(0).toUpperCase() + type.slice(1)}`;
  }

  closeModal() {
    this.showModal = false;
    this.modalType = null;
    this.formAlumno.reset()
    this.formEmpresa.reset()
    this.formSupervisor.reset()
  }

  submitModal() {
    if (this.modalType === 'empresa') {
      //agregar manejo de errores a los subscribe
      this.servicioPracticas.crearEmpresa(this.formEmpresa.value).subscribe(result => {
        this.obtenerEmpresas()
        console.log(result)
        this.closeModal();
        this.formSupervisor.reset()
        alert('creado con exito')
      })
      this.formEmpresa.reset()
    } else if (this.modalType === 'supervisor') {
      const supervisor : nuevoSupervisor= {
        ...this.formSupervisor.value,
        tipo_usuario: 'JEFE_EMPLEADOR',
        id_empresa: this.formPractica.get('id_empresa')?.value,
      };
      this.servicioPracticas.crearSupervisor(supervisor).subscribe(result => {
        this.obtenerEmpresas()
        console.log(result)
        this.closeModal();
        this.formSupervisor.reset()
        alert('creado con exito')
      })
    } else if (this.modalType === 'alumno') {
      const alumno : nuevoAlumno = {
        ...this.formAlumno.value,
        tipo_usuario: 'ALUMNO_PRACTICA',
      };
      console.log(alumno)
      this.servicioPracticas.crearAlumno(alumno).subscribe(result => {
        this.obtenerAlumnos()
        console.log(result)
        this.closeModal();
        this.formAlumno.reset()
        alert('creado con exito')
      })
    }
  }

  siguientePaso() {
    if (this.pasoActual < 4) {
      this.pasoActual++;
      this.errorMessage = null;
    }
  }

  pasoAnterior() {
    if (this.pasoActual > 1) {
      this.pasoActual--;
      this.errorMessage = null;
    }
  }

  onSubmit() {
    if (this.formPractica.valid) {
      const practica = this.formPractica.value;
      delete practica.id_empresa;
      practica.id_alumno= Number(practica.id_alumno),
      practica.id_supervisor= Number(practica.id_supervisor)
      practica.fecha_inicio = new Date(practica.fecha_inicio);
      practica.fecha_termino = new Date(practica.fecha_termino);
      console.log(practica);
      this.servicioPracticas.crearPractica(practica).subscribe(
        {
          next: (result: any) =>{
            alert('Práctica generada con exito 👍')
            this.formPractica.reset()
            this.pasoActual = 1
            console.log(result)
          },
          error: (error: any) => {
            this.errorMessage = error.message;
          }    
        }
      )
    }
  }

  obtenerEmpresas() {
    this.servicioPracticas.obtenerEmpresas().subscribe(result => {
      this.empresas = result;
      console.log("empresas",result)
      const idEmpresaSeleccionada = this.formPractica.get('id_empresa')?.value;
      if (idEmpresaSeleccionada) {
        this.filterSupervisores(idEmpresaSeleccionada);
      }
    });
  }
  

  obtenerAlumnos() {
    this.servicioPracticas.obtenerAlumnos().subscribe(result =>{
      this.alumnos = result
    })
  }

  filterSupervisores(idEmpresa: number) {
    const empresaSeleccionada = this.empresas.find(
      (empresa) => empresa.id_empresa == idEmpresa
    );
    this.supervisoresFiltrados = empresaSeleccionada?.jefe_supervisor || [];
    
    this.formPractica.get('id_supervisor')?.setValue(null);
  }

  obtenerDatosAlumno(){
    const rut = this.rutControl.value?.trim().toLowerCase();
    if (!rut) {
      alert('Por favor, ingrese un RUT válido.');
      return;
    }
    console.log(rut, "obtener alumno")
    const alumno = this._alumnosNominaService.obtenerAlumnoNomina(rut).subscribe(
      (response) => {
        this.alumno = response
      }
    )
  }
  rutBusqueda: string = ''
  modalAlumno: boolean = false;
  rutControl = new FormControl(''); // Control Reactivo del RUT
  alumno: any = null; // Datos del alumno encontrado
  alumnoNoEncontrado = false; // Estado si no se encuentra el alumno
  openModalAlumno(){
    this.modalAlumno = true;
  }
  cerrarModal(): void {
    this.modalAlumno = false;
  }

  confirmarAlumno() {
    console.log(this.alumno)
    if(this.alumno){
      const crear: nuevoAlumno = {
        nombre: this.alumno.nombre,
        correo: this.alumno.email,
        rut: this.alumno.rut,
        nomina: true,
        tipo_usuario: "ALUMNO_PRACTICA"
      }
      const createALumno = this.servicioPracticas.crearAlumno(crear).subscribe(
        (res) => {
          console.log(res)
        }
      );
    }
  }
}

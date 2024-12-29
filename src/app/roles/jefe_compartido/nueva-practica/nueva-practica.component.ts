import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../header-jefes/header.component";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { AlumnosNominaService } from '../services/alumnos-nomina.service';
import { GenerarPracticaService } from '../services/generar-practica.service';
import { Empresa, JefeSupervisor, NuevoSupervisor } from '../dto/empresa.dto';
import { AlumnosDataDto, nuevoAlumno } from '../dto/alumno.dto';
import { MessageService } from 'primeng/api';
import { checkRunValidator } from '../../../core/util/validator-rut.function';


@Component({
  selector: 'app-nueva-practica',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterLink, ReactiveFormsModule, DialogModule, FormsModule, FloatLabelModule, InputTextModule, DropdownModule, CalendarModule],
  templateUrl: './nueva-practica.component.html',
  styleUrl: './nueva-practica.component.css'
})
export class NuevaPracticaComponent implements OnInit{

  errorMessage:string | null = null;

  constructor(
    private practicasService: GenerarPracticaService,
    private alumnosNominaService: AlumnosNominaService,
    private messageService: MessageService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.obtenerEmpresas()
    this.obtenerAlumnos()
    this.formPractica.get('id_empresa')?.valueChanges.subscribe((idEmpresa) => {
      this.filterSupervisores(idEmpresa);
    });
  }
  
  cargando: boolean = true;
  cargandoCrear: boolean = false;
  cargandoBuscar: boolean = false;

  practicaSeleccionada: boolean = false;

  empresas: Empresa[] = [];
  alumnoSeleccionado!: AlumnosDataDto;
  tipoPracticas: any = [{tipo: "PRACTICA_UNO", titulo:'Práctica profesional I'},{tipo:"PRACTICA_DOS", titulo:"Práctica profesional II"}]

  modalidades: any = [{tipo: "PRESENCIAL", titulo: "Presencial"},{tipo: "SEMI_PRESENCIAL", titulo: "Semipresencial"}, {tipo: "REMOTO", titulo: "Remoto"}]
  
  supervisoresFiltrados: JefeSupervisor[] = [];

  alumnos: AlumnosDataDto[] = [];

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
    caracter_empresa: new FormControl('', Validators.required),
    tamano_empresa: new FormControl('', Validators.required)
  });

  formSupervisor: FormGroup = new FormGroup({
    nombre: new FormControl ('', Validators.required),
    rut: new FormControl ('', [Validators.required,Validators.pattern(/^\d{1,8}-\d{1}$/), checkRunValidator()]),
    correo: new FormControl ('', [Validators.required, Validators.email]),
    cargo: new FormControl ('', Validators.required),
    numero_telefono: new FormControl ('', Validators.required)
  });

  // formAlumno: FormGroup = new FormGroup({
  //   nombre: new FormControl ('', Validators.required),
  //   correo: new FormControl (null, [Validators.required, Validators.email]),
  //   rut: new FormControl ('', [Validators.required, Validators.pattern(/^\d{1,8}-\d{1}$/), checkRunValidator()])
  // });

  showModal = false;
  modalType: 'empresa' | 'supervisor' | 'alumno' | null = null;
  modalTitle = '';

  pasoActual = 1;  

  rutBusqueda: string = ''
  modalAlumno: boolean = false;
  rutControl = new FormControl('', [Validators.required,Validators.pattern(/^\d{1,8}-\d{1}$/), checkRunValidator()]); // Control Reactivo del RUT
  alumno: any = null; // Datos del alumno encontrado

  getNombreAlumnoSeleccionado(): string | null {
    const idAlumno = this.formPractica.get('id_alumno')?.value;
    const alumno = this.alumnos.find(alumno => alumno.id_user === idAlumno);
    return alumno ? alumno.usuario.nombre : null;
  }
  
  get listadoAlumnos(){
    if(this.formPractica.get('tipo_practica')?.value === 'PRACTICA_UNO'){
      return this.alumnos.filter(alumno => !alumno.primer_practica)
    } else{
      return this.alumnos.filter(alumno => !alumno.segunda_practica && alumno.primer_practica)
    }
  }

  openModal(type: 'empresa' | 'supervisor' | 'alumno') {
    this.modalType = type;
    this.showModal = true;
    this.modalTitle = `Agregar ${type.charAt(0).toUpperCase() + type.slice(1)}`;
  }

  closeModal() {
    this.showModal = false;
    this.modalType = null;
    this.alumno = null
    this.rutControl.reset()
    this.formEmpresa.reset()
    this.formSupervisor.reset()
  }

  submitModal() {
    if (this.modalType === 'empresa') {
      this.cargandoCrear = true;
      this.practicasService.crearEmpresa(this.formEmpresa.value).subscribe({
        next: result =>{
          this.obtenerEmpresas()
          console.log(result, 'empresa')
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Empresa registrada con éxito' });
          this.formEmpresa.reset()
          this.cargandoCrear = false;
        },
        error: error =>{
          console.log(error)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrió un error al registrar la empresa: ${error.message}` });
          this.cargandoCrear = false;
        }
      })
      
    } else if (this.modalType === 'supervisor') {
      this.cargandoCrear = true;
      const supervisor : NuevoSupervisor= {
        ...this.formSupervisor.value,
        tipo_usuario: 'JEFE_EMPLEADOR',
        id_empresa: this.formPractica.get('id_empresa')?.value,
      };
      this.practicasService.crearSupervisor(supervisor).subscribe({
        next: result => {
          this.obtenerEmpresas()
          console.log(result, 'supervisor')
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Supervisor registrado con éxito' });
          this.formSupervisor.reset()
          this.cargandoCrear = false;
        },
        error: error => {
          console.log(error)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrió un error al registrar el supervisor: ${error.message}` });
          this.cargandoCrear = false;
        }
      })
    }
    // } else if (this.modalType === 'alumno') {
    //   const alumno : nuevoAlumno = {
    //     ...this.formAlumno.value,
    //     tipo_usuario: 'ALUMNO_PRACTICA',
    //   };
    //   console.log(alumno)
    //   this.practicasService.crearAlumno(alumno).subscribe({
    //     next: result => {
    //       this.obtenerAlumnos()
    //       console.log(result, 'alumno')
    //       this.closeModal();
    //       this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Supervisor registrado con éxito' });
    //       this.formAlumno.reset()
    //     },
    //     error: error =>{
    //       console.log(error)
    //       this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrió un error al registrar el alumno: ${error.message}` });
    //     }
    //   })
    // }
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
      this.cargandoCrear = true;
      const practica = this.formPractica.value;
      delete practica.id_empresa;
      practica.id_alumno= Number(practica.id_alumno),
      practica.id_supervisor= Number(practica.id_supervisor)
      practica.fecha_inicio = new Date(practica.fecha_inicio);
      practica.fecha_termino = new Date(practica.fecha_termino);
      console.log(practica);
      this.practicasService.crearPractica(practica).subscribe({
        next: result =>{
          this.formPractica.reset()
          this.pasoActual = 1
          console.log(result)
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Práctica generada con exito' });
          this.cargandoCrear = false
          // this.router.navigate(['home-administracion'])
        },
        error: error => {
          this.errorMessage = error.message;
          console.log(error)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrió un error: ${error.message}` });
          this.cargandoCrear = false
        }
      })
    }
  }

  seleccionarPractica(practica: string){
    this.practicaSeleccionada = true
    this.formPractica.patchValue({
      tipo_practica: practica
    })
  }

  obtenerEmpresas() {
    this.practicasService.obtenerEmpresas().subscribe(result => {
      this.empresas = result;
      console.log("empresas",result)
      const idEmpresaSeleccionada = this.formPractica.get('id_empresa')?.value;
      if (idEmpresaSeleccionada) {
        this.filterSupervisores(idEmpresaSeleccionada);
      }
      this.cargando = false
    });
  }
  

  obtenerAlumnos() {
    this.practicasService.obtenerAlumnos().subscribe(result =>{
      this.alumnos = result.filter(alumno => !alumno.primer_practica && !alumno.segunda_practica);
      console.log("Alumnos disponibles:", this.alumnos);
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
    this.cargandoBuscar = true;
    this.alumno = null
    const rut = this.rutControl.value?.trim().toLowerCase()!;

    console.log(rut, "obtener alumno")
    this.alumnosNominaService.obtenerAlumnoNomina(rut).subscribe({
      next: (response) => {
        this.alumno = response;
        this.cargandoBuscar = false;
      },
      error: error =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Error: ${error.message}` });
        this.cargandoBuscar = false;
      }
    })
  }

  openModalAlumno(){
    this.modalAlumno = true;
  }
  cerrarModal(): void {
    this.modalAlumno = false;
  }

  confirmarAlumno() {
    console.log(this.alumno)
    if(this.alumno){
      this.cargandoCrear = true;
      const crear: nuevoAlumno = {
        nombre: this.alumno.nombre,
        correo: this.alumno.email,
        rut: this.alumno.rut,
        nomina: true,
        tipo_usuario: "ALUMNO_PRACTICA"
      }
      this.practicasService.crearAlumno(crear).subscribe({
        next: result => {
          console.log('Alumno c reado:', result);
          this.alumnos.push(result.data) 
          this.obtenerAlumnos()
          console.log(this.alumnos)
          this.rutControl.reset()
          this.alumno = null; // Limpiar alumno seleccionado
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Alumno registrado con éxito.' });
          this.cargandoCrear = false;

        },
        error: error => {
          console.log('Error al crear el alumno:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrió un error al registrar el alumno: ${error.message}` });
          this.cargandoCrear = false;

        }
      });
      this.obtenerAlumnos()
    }
  }
}

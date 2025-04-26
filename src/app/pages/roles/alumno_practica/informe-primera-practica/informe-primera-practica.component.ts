import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { PreguntasInformeService } from '../../jefe_compartido/services/preguntas-informe.service';
import { RespuestasInformeService } from '../services/respuestas-informe.service';
import { AsignaturasService } from '../services/asignaturas.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { TipoPractica } from '../../../../enum/enumerables.enum';
import { Asignatura, AsignaturaBack, Semestre } from '../dto/asignaturas.dto';
import { ListaRespuestas, Pregunta, Respuesta } from '../dto/informe-alumno.dto'  ;
import { MessageService } from 'primeng/api';
import { HeaderComponent } from '../../jefe_compartido/header-jefes/header.component';
import { AlumnoService } from '../data-access/alumno.service';


@Component({
  selector: 'app-informe-primera-practica',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NgxPaginationModule, FormsModule, DialogModule, RadioButtonModule, ButtonModule, InputTextareaModule, InputNumberModule],
  templateUrl: './informe-primera-practica.component.html',
  styleUrl: './informe-primera-practica.component.css'
})
export class InformePrimeraPracticaAlumnoComponent implements OnInit {

  constructor(
    private preguntasService: PreguntasInformeService,
    private respuestasService: RespuestasInformeService,
    private route: ActivatedRoute,
    private asignaturasService: AsignaturasService,
    private messageService: MessageService,
    private router:Router,
    private alumnoService: AlumnoService
  ){}

  ngOnInit(): void {
    this.obtenerDatosAlumno()
    this.obtenerPreguntas()
    this.obtenerAsignaturas()
    this.idAlumno = Number(this.route.snapshot.paramMap.get('idAlumno'))!;
    this.idPractica = Number(this.route.snapshot.paramMap.get('idPractica'))!;
    this.idInforme = Number(this.route.snapshot.paramMap.get('idInforme'))!;
    this.existeRespuesta()
  }

  datos_listo: boolean = false;
  correccion: boolean = false;
  dataAlumno: any
  page: number = 1;
  preguntas: Pregunta[]= []
  preguntas_paginas = 3;
  preguntas_len!: number;
  
  idAlumno!: number
  idPractica!: number
  idInforme!: number

  asignaturasFPCeleste: string[] = ['ME-167', 'CC-802', 'ME-260', 'ME-263', 'ME-445', 'ME-264', 'ME-266']
  semestres: Semestre[] = []; 
  asignaturas_seleccionadas: Asignatura[] = [];  
  asignaturas_seleccionadasRespaldo: Asignatura[] = [];  

  electivasDialogVisible = false;
  asignaturasElectivas: Asignatura[] = [];
  selectedElectiva = null;

  respuestasAlumno: Respuesta[] = []  
  
  uploadedFile: File | null = null;
  errorMessage: string = '';

  cargando: boolean = true;
  cargandoEnviar: boolean = false;

  public obtenerDatosAlumno(){
    this.alumnoService.getAlumnoPracticante().subscribe({
      next: result => {
        this.dataAlumno = result
        console.log(this.dataAlumno)
      },
      error: error => {
        console.log(error)
      }
    })
  }

  public obtenerAsignaturas() {
    this.asignaturasService.obtenerAsignaturas().subscribe((result: AsignaturaBack[]) => {
        console.log(result); // Ver los datos que llegan del backend
        // Creamos un objeto para agrupar por semestre
        const semestresMap: { [key: number]: Semestre } = {};

        // Iteramos sobre las asignaturas y las agrupamos por semestre (sin tener en cuenta la parte decimal)
        result.forEach(asignatura =>  {
          if (asignatura.nombre.startsWith('E.F.G.') || (asignatura.nombre.startsWith('E.F.P.') && !/^[A-Za-z\.]+\s*[IVXLCDM]+$/.test(asignatura.nombre))) {
            this.asignaturasElectivas.push({
                nombre: asignatura.nombre,
                codigo: asignatura.codigo,
                tipo: this.obtenerTipoAsignatura(asignatura.tipo_asignatura),
            });
            console.log(this.asignaturasElectivas)
            return; // No procesamos más esta asignatura en el listado principal
          }

          const semestreEntero = Math.floor(asignatura.semestre); // Usamos solo la parte entera del semestre

          // Si no existe el semestre, lo inicializamos
          if (!semestresMap[semestreEntero]) {
              semestresMap[semestreEntero] = {
                  nombre: `Semestre ${semestreEntero}`,
                  asignaturas: []
              };
          }

          // Mapeamos el tipo de asignatura a una forma más corta (FB, FP, FG)
          const tipo = this.obtenerTipoAsignatura(asignatura.tipo_asignatura);

          // Agregamos la asignatura al semestre correspondiente
          semestresMap[semestreEntero].asignaturas.push({
              nombre: asignatura.nombre,
              codigo: asignatura.codigo,
              tipo: tipo
          });
        });

        // Convertimos el objeto semestresMap a un arreglo de semestres y lo ordenamos
        this.semestres = Object.values(semestresMap).sort((a, b) => {
            const semestreA = parseInt(a.nombre.split(' ')[1]);
            const semestreB = parseInt(b.nombre.split(' ')[1]);
            return semestreA - semestreB; // Ordenamos por el número del semestre
        });

        console.log(this.semestres); // Ver el resultado final
    });
}
  
  // Método para convertir tipo de asignatura
  private obtenerTipoAsignatura(tipo: string): string {
    switch (tipo) {
      case 'FORMACION_BASICA': return 'FB';
      case 'FORMACION_PROFESIONAL': return 'FP';
      case 'FORMACION_GENERAL': return 'FG';
      default: return '';
    }
  }
  
  public volverCuestionario(){
    this.datos_listo = !this.datos_listo
  }

  public actualizarRespuesta(preguntaId: number, respuesta: Respuesta) {
    const index = this.respuestasAlumno.findIndex(r => r.id_pregunta === preguntaId);
    if (index !== -1) {
      this.respuestasAlumno[index] = respuesta; // actualiza la respuesta si existe
    } else {
      this.respuestasAlumno.push(respuesta); // si no existe agregas una nueva respuesta
    }
  }

  public obtenerPreguntas(){
    this.preguntasService.getPreguntasAlumno().subscribe(result=>{
      console.log(result)
      this.preguntas = result
      this.preguntas_len = Math.ceil(result.length / this.preguntas_paginas)
      this.respuestasAlumno = this.preguntas.map(preg => {
        let respuesta: Respuesta = {
          id_pregunta: preg.id_pregunta
        };    
        if (preg.tipo_pregunta === 'DESARROLLO_PROFESIONAL') {
          respuesta.asignaturas = []; 
        }    
        if (preg.tipo_pregunta === 'ABIERTA') {
          respuesta.texto = '';
        }    
        if (preg.tipo_pregunta === 'CERRADA') {
          respuesta.puntaje = 0;
        }
        return respuesta;
      });
      console.log(this.respuestasAlumno)
      this.cargando = false;
    })
  }

  onFileSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;
    this.processFile(file);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.errorMessage = '';  // Clear previous errors

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.processFile(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  processFile(file: File | null): void {
    if (file) {
      // Verificar que el archivo sea PDF
      if (file.type === 'application/pdf') {
        this.uploadedFile = file;
        this.errorMessage = '';
      } else {
        this.uploadedFile = null;
        this.errorMessage = 'Solo se permiten archivos PDF. Por favor, selecciona un archivo válido.';
      }
    }
  }

  removeFile(): void {
    this.uploadedFile = null;
    this.errorMessage = '';
  }

  seleccionarArchivo(){
    const fileInput = document.getElementById('dropzone-file') as HTMLInputElement;
    if (fileInput) {
        fileInput.click(); // Simula un clic en el input de archivo
    }
  }

  goTofin(){
    this.router.navigate(['agradecimientos-alumno'])
  }

  changeForm(){
    this.datos_listo = !this.datos_listo
  }

  getOptionText(value: number): string {
    switch(value) {
      case 1: return 'Muy en desacuerdo';
      case 2: return 'En desacuerdo';
      case 3: return 'Neutral';
      case 4: return 'De acuerdo';
      case 5: return 'Muy de acuerdo';
      default: return '';
    }
  }

  dialogVisible: boolean = false;
  tituloDialogo: string = 'Malla Curricular';

  mostrarDialogo() {
    this.dialogVisible = true;
    this.asignaturas_seleccionadasRespaldo = [...this.asignaturas_seleccionadas]; // Hacer una copia
  }

  public guardarAsignaturas() {
    this.respuestasAlumno.forEach(respuesta => {
      // Verificamos si la respuesta tiene el atributo 'asignaturas'
      if (respuesta.asignaturas) {
        // Extraemos solo los nombres de las asignaturas
        respuesta.asignaturas = this.asignaturas_seleccionadas.map(asignatura => asignatura.nombre);  
      }
    });
    this.dialogVisible = false;
    console.log('Respuestas con asignaturas asignadas:', this.respuestasAlumno);
  }

  public cancelar(): void {
    this.asignaturas_seleccionadas = [...this.asignaturas_seleccionadasRespaldo]; // Restaurar la copia
    this.dialogVisible = false;
    console.log('Cambios cancelados. Estado restaurado:', this.asignaturas_seleccionadas);
  }
  
  isSelected(asignatura: Asignatura): boolean {
    return this.asignaturas_seleccionadas.some(a => a.codigo == asignatura.codigo);
  }

  toggleSeleccion(asignatura: Asignatura): void {
    if (asignatura.tipo === 'FP' && asignatura.nombre.startsWith('E.F.P.')) {
      const electivasDisponibles = this.getElectivas(asignatura.codigo);
  
      if (electivasDisponibles.length === 0) {
        this.messageService.add({
          severity: 'info',
          summary: 'Aviso',
          detail: 'No hay asignaturas electivas disponibles para seleccionar.',
        });
      } else {
        this.asignaturasElectivas = electivasDisponibles;
        this.electivasDialogVisible = true;
      }
    } else {
      if (this.isSelected(asignatura)) {
        this.asignaturas_seleccionadas = this.asignaturas_seleccionadas.filter((a) => a.codigo !== asignatura.codigo);
      } else {
        this.asignaturas_seleccionadas.push(asignatura);
      }
    }
  }

  toggleSeleccionElectiva(electiva: Asignatura): void {
    const index = this.asignaturas_seleccionadas.findIndex((a) => a.codigo === electiva.codigo);
    if (index !== -1) {
      // Si ya está seleccionada, la quitamos
      this.asignaturas_seleccionadas.splice(index, 1);
    } else {
      // Si no está seleccionada, la agregamos
      this.asignaturas_seleccionadas.push(electiva);
    }
  }

  isElectivaSelected(electiva: Asignatura): boolean {
  return this.asignaturas_seleccionadas.some((a) => a.codigo === electiva.codigo);
}

  getElectivas(codigo: string): Asignatura[] {
    return this.asignaturasElectivas;
  }
  
  seleccionarElectiva(asignatura: Asignatura): void {
    this.asignaturas_seleccionadas.push(asignatura);
    console.log(this.asignaturas_seleccionadas)
    this.electivasDialogVisible = false;
  }

  cerrarElectiva(): void {
    this.electivasDialogVisible = false;
  }

  enviarInforme(){
    this.cargandoEnviar = true
    console.log(this.respuestasAlumno)

    if(this.respuestasAlumno.some(respuesta=> this.esRespuestaIncompleta(respuesta)) && !this.correccion){
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todas las respuestas antes de enviar el informe.'
      });
      this.cargandoEnviar = false
      return;
    }

    if (!this.uploadedFile) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe seleccionar un archivo antes de enviar.'
      });
      this.cargandoEnviar = false
      return; // Detiene el envío si no hay archivo
    }

    const formData: FormData = new FormData()
    
    formData.append('id_informe', ''+this.idInforme)
    formData.append('nombre_alumno', this.dataAlumno.nombre)
    formData.append('id_alumno', ''+this.idAlumno)
    formData.append('tipo_practica', TipoPractica.PRACTICA_UNO)
    formData.append('file', this.uploadedFile!)
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    

    if(!this.correccion){
      this.respuestasAlumno = this.respuestasAlumno.map(respuesta => ({
      ...respuesta,
      id_informe: this.idInforme
      }));

      const asociarRespuestas: ListaRespuestas = {
        respuestas: this.respuestasAlumno
      }
      console.log(asociarRespuestas)
      
      formData.append('respuestas', JSON.stringify(this.respuestasAlumno))
    }

    this.respuestasService.enviarInforme(formData).subscribe({
      next: resultInforme => {
        console.log(resultInforme)
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Informe enviado con éxito' });
        this.goTofin() 
        this.cargandoEnviar = false
      },
      error: error => {
        console.log(error),
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al enviar el informe' });
        this.cargandoEnviar = false
      }
    });
  }

  public esRespuestaIncompleta(respuesta: Respuesta){
    // Verifica si la respuesta tiene campos requeridos incompletos
    if ('puntaje' in respuesta && (respuesta.puntaje === undefined || respuesta.puntaje === 0)) {
      return true; // Falta puntaje
    }
    if ('texto' in respuesta && (!respuesta.texto || respuesta.texto.trim() === '')) {
      return true; // Falta texto
    }
    if ('asignaturas' in respuesta && (!respuesta.asignaturas || respuesta.asignaturas.length === 0)) {
      return true; // Falta asignaturas
    }
    return false; // Si ninguno de los campos relevantes está incompleto
  }
  
  public existeRespuesta(){
    this.respuestasService.existeRespuesta(this.idInforme).subscribe((result: any) => {
      console.log(result)
      if(result.correccion){
        this.datos_listo = true;
        this.correccion = true;
      } else {
        this.datos_listo = false;
      }
    })
  }

}

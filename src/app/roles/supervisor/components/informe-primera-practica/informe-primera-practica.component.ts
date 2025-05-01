import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderJefeEmpleadorComponent } from "../header-jefe-empleador/header-jefe-empleador.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RespuestasInformeService } from '../../../alumno/services/respuestas-informe.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { PreguntasInformeService } from '../../../../pages/roles/jefe_compartido/services/preguntas-informe.service';
import { respuestaInformeConfidencial } from '../../../../pages/roles/jefe_empleador/dto/informe-confidencial.dto';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageService } from 'primeng/api';
import { Pregunta } from '../../dto/informe-alumno.dto';
import { HeaderComponent } from "../../../../pages/roles/jefe_compartido/header-jefes/header.component";

@Component({
  selector: 'app-informe-primera-practica',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, HeaderComponent, FormsModule, ReactiveFormsModule, CalendarModule, RadioButtonModule, ButtonModule, InputTextareaModule, InputNumberModule, FloatLabelModule, HeaderComponent],
  templateUrl: './informe-primera-practica.component.html',
  styleUrl: './informe-primera-practica.component.css'
})


export class InformePrimeraPracticaComponent implements OnInit{

  constructor(
    private preguntasService: PreguntasInformeService,
    private respuestasService: RespuestasInformeService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.obtenerPreguntas()
    this.idInforme = Number(this.route.snapshot.paramMap.get('idInforme'))!;
    console.log(this.idInforme)
  }

  cargando: boolean = true;
  cargandoEnviar: boolean = false;

  habilidadesOpciones: string[] = [
    "Microsoft Excel",
    "SAP",
    "Python/R",
    "Power BI",
    "Tableau",
    "ERP específico de la Empresa"
  ];
  
  caracter = [
    "Pública",
    "Privada"
  ]

  tamanoEmpresa = [
    "200 funcionarios o más",
    "Entre 50 a 199 funcionarios",
    "49 funcionarios o menos"
  ]

  private readonly _router = inject(Router);
  public datos_listo = false;
  public page: number=1;
  input_texto= '';
  preguntas: Pregunta[]= []

  preguntas_paginas: number = 3;
  preguntas_len! :number
  
  respuestasSupervisor: respuestaInformeConfidencial[] = [] 

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
  
  formularioDatos: FormGroup = new FormGroup({
    fecha_inicio_practica: new FormControl(null, Validators.required),
    fecha_fin_practica: new FormControl(null, Validators.required),
    horas_semanales: new FormControl(null, [Validators.required, Validators.min(1)]),
    horas_practicas_regulares: new FormControl(null, [Validators.required, Validators.min(1)]),
    horas_practicas_extraordinarias: new FormControl(null, [Validators.required, Validators.min(0)]),
    horas_inasistencia: new FormControl(null, [Validators.required, Validators.min(0)])
  })

  idAlumno!: number
  idInforme!: number


  public actualizarRespuesta(preguntaId: number, respuesta: respuestaInformeConfidencial) {
    const index = this.respuestasSupervisor.findIndex(r => r.id_pregunta === preguntaId);
  
    if (index !== -1) {
      // Actualiza la respuesta si ya existe
      this.respuestasSupervisor[index] = {
        ...this.respuestasSupervisor[index],
        ...respuesta, // Actualiza solo los campos modificados
      };
    } else {
      // Si no existe, agrega la nueva respuesta
      this.respuestasSupervisor.push(respuesta);
    }
    console.log(this.datos_listo, 'datos listo')
  
    console.log("respuestas registradas", this.respuestasSupervisor);
  }
  
  public actualizarInputText(preguntaId: number, texto: string) {
    const index = this.respuestasSupervisor.findIndex(r => r.id_pregunta === preguntaId);
  
    if (index !== -1) {
      this.respuestasSupervisor[index].respuesta_texto = texto;
    } else {
      this.respuestasSupervisor.push({
        id_informe: this.idInforme,
        id_pregunta: preguntaId,
        respuesta_texto: texto === 'Privada' ? 'PRIVADA' : texto || texto === 'Pública' ? 'PUBLICA' : texto,
      });
    }
  
    console.log(this.respuestasSupervisor);
  }
  

  public obtenerPreguntas(){
    this.preguntasService.getPreguntasConfidencial().subscribe(result=>{
      console.log(result)
      this.preguntas = result.map((pregunta:any) => pregunta.pregunta)
      this.preguntas_len = Math.ceil(result.length / this.preguntas_paginas)
      this.respuestasSupervisor = this.preguntas.map(preg => {
        let respuesta: respuestaInformeConfidencial = {
          id_pregunta: preg.id_pregunta,
          id_informe: this.idInforme,
        };       
        if (preg.tipo_pregunta === 'ABIERTA' || preg.tipo_pregunta === 'VINCULACION_MEDIO' || preg.tipo_pregunta === 'HABILIDADES_TECNICAS' || preg.dimension.nombre === 'Antecedentes de la Empresa') {
          respuesta.respuesta_texto = '';
        }    
        if (preg.tipo_pregunta === 'CERRADA' && preg.dimension.nombre != 'Antecedentes de la Empresa') {
          respuesta.puntos = 0;
        }
        return respuesta;
      });
      console.log(this.respuestasSupervisor, 'respuestas')
      this.cargando = false
    })
  }

  goTofin(){
    this._router.navigate(['agradecimientos'])
  }

  changeForm(){
    if (!this.formularioDatos.invalid) {
      console.log(this.formularioDatos.value);
      this.datos_listo = !this.datos_listo;
      console.log(this.respuestasSupervisor)
    } else {
      console.log(this.formularioDatos.value);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Rellene correctamente el formulario' });
    }
  }

  enviarRespuesta(){
    this.cargandoEnviar = true
    if(this.respuestasSupervisor.some(respuesta=> this.esRespuestaIncompleta(respuesta))){
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todas las respuestas antes de enviar.'
      });
      this.cargandoEnviar = false;
      return;
    }
    
    this.respuestasService.registrarRespuestasConfidencial(this.respuestasSupervisor).subscribe({
      next: result =>{
        console.log(result)

        this.respuestasService.enviarInformeConfidencial(this.formularioDatos.value, this.idInforme).subscribe(
          {
            next: result => {
              console.log(result);
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Respuestas enviadas con éxito'});
              this.goTofin()
              this.cargandoEnviar = false;
            },
            error: error => {
              console.log(error);
              this.cargandoEnviar = false;
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al enviar las respuestas'});
            }
          }
        )
      },
      error: error =>{
        console.log(error)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al enviar las respuestas'});
        this.cargandoEnviar = false;
      }
    })
  }

  public esRespuestaIncompleta(respuesta: respuestaInformeConfidencial){
    // Verifica si la respuesta tiene campos requeridos incompletos
    if ('puntos' in respuesta && (respuesta.puntos === undefined || respuesta.puntos === 0)) {
      return true; // Falta puntaje
    }
    if ('respuesta_texto' in respuesta && (!respuesta.respuesta_texto || respuesta.respuesta_texto.trim() === '')) {
      return true; // Falta texto
    }
    return false; // Si ninguno de los campos relevantes está incompleto
  }

}

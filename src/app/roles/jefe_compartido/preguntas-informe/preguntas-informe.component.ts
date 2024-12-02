import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignarpregunta, Dimension, Pregunta, PreguntasInformeService } from '../services/preguntas-informe.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../header-jefes/header.component';

@Component({
  selector: 'app-preguntas-informe',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './preguntas-informe.component.html',
  styleUrl: './preguntas-informe.component.css'
})
export class PreguntasInformeComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private preguntasService: PreguntasInformeService
  ){}

  ngOnInit(): void {
    this.tipoInforme = this.route.snapshot.paramMap.get('tipo')!
    this.getPreguntas()
    this.getDimensiones()
    console.log(this.tipoInforme)
    if(this.tipoInforme == 'alumno'){
      this.getPreguntasImplementadasAlumno()
    }else if (this.tipoInforme == 'confidencial'){
      this.getPreguntasImplementadasConfidencial()
    }
  }

  tipoInforme!: string;
  preguntas_implementadas!: Pregunta[]; 
  preguntas_implementadas_id!: Asignarpregunta;
  preguntas!: Pregunta[];
  formPregunta: FormGroup = new FormGroup({
    id_dimension: new FormControl (null, Validators.required),
    tipo_pregunta: new FormControl ('', Validators.required),
    enunciado_pregunta: new FormControl ('', Validators.required)
  });

  dimensiones!: Dimension[];
  formDimension: FormGroup = new FormGroup({
    nombre: new FormControl ('', Validators.required),
    descripcion: new FormControl ('', Validators.required),
  });

  public getPreguntasImplementadasConfidencial(){
    this.preguntasService.getPreguntasConfidencial().subscribe(result =>{
      this.preguntas_implementadas = result
      console.log(this.preguntas_implementadas)

    })
  }

  public getPreguntasImplementadasAlumno(){
    this.preguntasService.getPreguntasConfidencial().subscribe(result =>{
      this.preguntas_implementadas = result
      console.log(this.preguntas_implementadas)
    })
  }

  public asocitatePreguntasAlumno(){
    // this.preguntasService.asociatePreguntasAlumno(this.)
  }

  public getPreguntas(){
    this.preguntasService.getPreguntas().subscribe(result =>{
      this.preguntas = result
      console.log(this.preguntas)
    })
  }


  //this.preguntasPrueba cabmiar
  public createPreguntas(){
    const pregunta : Pregunta = { preguntas: this.formPregunta.value }
    this.preguntasService.createPreguntas(this.preguntasPrueba).subscribe(result =>{
      console.log(result)
    })
  }

  public getDimensiones(){
    this.preguntasService.getDimensiones().subscribe(result => {
      this.dimensiones = result;
      console.log(result)
    });
  };

  public createDimension(){
    const dimension = this.formDimension.value;
    this.preguntasService.createDimension(this.dimensionPrueba).subscribe(result => {
      console.log(result)
    });
  }

  dimensionPrueba : Dimension = {
    nombre: "Nombre 1",
    descripcion: "Descripción de prueba 1"
  }

  preguntasPrueba : Pregunta = 
  {
    preguntas: [
      {
        enunciado_pregunta: "enunciado prueba 1",
        tipo_pregunta: "EVALUATIVA",
        id_dimension: 1
      },
      {
        enunciado_pregunta: "enunciado prueba 2",
        tipo_pregunta: "CERRADA",
        id_dimension: 1
      },
      {
        enunciado_pregunta: "enunciado prueba 3",
        tipo_pregunta: "ABIERTA",
        id_dimension: 1
      },
      {
        enunciado_pregunta: "enunciado prueba 4",
        tipo_pregunta: "DESARROLLO_PROFESIONAL",
        id_dimension: 1
      },
    ]
  }

}

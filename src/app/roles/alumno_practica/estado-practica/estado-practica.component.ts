import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../components/header/header.component";
import { ActivatedRoute } from '@angular/router';
import { PracticasAlumnoService } from '../services/practicas-alumno.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estado-practica',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './estado-practica.component.html',
  styleUrl: './estado-practica.component.css'
})
export class EstadoPracticaComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private practicasService: PracticasAlumnoService
  ){}

  ngOnInit(): void {
    this.idAlumno = Number(this.route.snapshot.paramMap.get('idAlumno'))!;    
    this.obtenerPracticasAlumno()
  }

  idAlumno!: number
  practicas: any
  practicaSeleccionada: any;

  pasoActual = 1;

  public obtenerPracticasAlumno(){
    this.practicasService.obtenerPracticasAlumno(this.idAlumno).subscribe({
      next: result =>{
        this.practicas = result
        console.log(this.practicas)
      },
      error: error =>{
        console.log('error')
      }
    })
  }
}

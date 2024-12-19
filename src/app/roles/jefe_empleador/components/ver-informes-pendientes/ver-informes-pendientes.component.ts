import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderJefeEmpleadorComponent } from "../header-jefe-empleador/header-jefe-empleador.component";
import { DataJefeAlumnoService } from '../../services/data-jefe-alumno.service';
import { InformeConfidencialService, listaInformes } from '../../services/informe-confidencial.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-informes-pendientes',
  standalone: true,
  imports: [HeaderJefeEmpleadorComponent, CommonModule],
  templateUrl: './ver-informes-pendientes.component.html',
  styleUrl: './ver-informes-pendientes.component.css'
})
export class VerInformesPendientesComponent implements OnInit{

  ngOnInit(): void {
    this.getUserId()
  }

  private readonly _router = inject(Router);
  private readonly _JefeAlumoService = inject(DataJefeAlumnoService);
  private readonly _InformeConfidencialService = inject(InformeConfidencialService);

  userId:number = -1;
  informes!: listaInformes

  getUserId(){
    this.userId = this._JefeAlumoService.getUserId()!;
    this.getInformes()
  }

  getInformes(){
    this._InformeConfidencialService.obtenerInformes(this.userId).subscribe(result =>{
      this.informes = result
      console.log(result);
    })
  }

  goToInforme(){
    this._router.navigate(['jefe_alumno/formulario_primer_practica'])
  }

  goToVerInforme(idInforme: number) {
    alert('Ver informe' + idInforme);
    // Aquí iría la lógica para redirigir o ejecutar la acción para "Ver Informe"
  }
}

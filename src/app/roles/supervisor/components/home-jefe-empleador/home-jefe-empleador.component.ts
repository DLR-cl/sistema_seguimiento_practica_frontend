import { Component, inject, OnInit } from '@angular/core';
import { StorageService } from '../../../../shared/data-access/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import { DataJefeAlumnoService } from '../../services/data-jefe-alumno.service';
import { JefeAlumnoInterface } from '../../interface/jefe-alumno.interface';
import { CommonModule } from '@angular/common';
import { SupervisorPanelComponent } from '../supervisor-panel/supervisor-panel.component';
@Component({
  selector: 'app-home-jefe-empleador',
  standalone: true,
  imports: [CommonModule, SupervisorPanelComponent],
  templateUrl: './home-jefe-empleador.component.html',
  styleUrl: './home-jefe-empleador.component.css'
})
export class HomeJefeEmpleadorComponent implements OnInit{

  constructor(
    private routerService: Router,
    private authService: AuthService,
    private jefeDataService: DataJefeAlumnoService
  ){}

  public dataJefe!:JefeAlumnoInterface | null;

  public cargando: boolean = true

  ngOnInit(): void {
    this.jefeDataService.getData().subscribe(
      (data) => {
        this.dataJefe = data;
      },
      (error) => {
        console.error('Error al capturar la data', error);
      }
    )
  }

  public finalizoCarga(estado: boolean){
    this.cargando = estado
  }

  public signOut(){
      this.authService.logout()
  }

  public goToInformes(){
    this.routerService.navigate(['ver-informes-jefe']);
  }
  
  public goToData(){
    this.routerService.navigate(['ver-datos-jefe']);
  }
}

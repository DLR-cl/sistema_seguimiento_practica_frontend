import { Component, inject, OnInit } from '@angular/core';
import { HeaderJefeEmpleadorComponent } from '../header-jefe-empleador/header-jefe-empleador.component';
import { StorageService } from '../../../../shared/data-access/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import { DataJefeAlumnoService } from '../../services/data-jefe-alumno.service';
import { JefeAlumnoInterface } from '../../data-access/interface/jefe-alumno.interface';

@Component({
  selector: 'app-home-jefe-empleador',
  standalone: true,
  imports: [HeaderJefeEmpleadorComponent],
  templateUrl: './home-jefe-empleador.component.html',
  styleUrl: './home-jefe-empleador.component.css'
})
export class HomeJefeEmpleadorComponent implements OnInit{

  private _storageService = inject(StorageService);
  private readonly _routerService = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _jefeDataService = inject(DataJefeAlumnoService);

  public dataJefe!:JefeAlumnoInterface | null;


  ngOnInit(): void {
    this._jefeDataService.getData().subscribe(
      (data) => {
        this.dataJefe = data;
      },
      (error) => {
        console.error('Error al capturar la data', error);
      }
    )
  }

  
  public signOut(){
      this._authService.logout()
  }

  public goToInformes(){
    this._routerService.navigate(['ver-informes-jefe']);
  }
  
  public goToData(){
    this._routerService.navigate(['ver-datos-jefe']);
  }
}

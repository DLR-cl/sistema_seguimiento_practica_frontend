import { Component, inject } from '@angular/core';
import { HeaderSecretariaComponent } from "../header-secretaria/header-secretaria.component";
import { Secretaria } from '../dto/secretaria-data.dto';
import { StorageService } from '../../../shared/data-access/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { DataSecretariaService } from '../services/data-secretaria.service';
import { HeaderComponent } from "../../jefe_compartido/header-jefes/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-secretaria',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './home-secretaria.component.html',
  styleUrl: './home-secretaria.component.css'
})
export class HomeSecretariaComponent {
  private _storageService = inject(StorageService);
  private readonly _routerService = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _secretariaDataService = inject(DataSecretariaService);

  public dataSecretaria!: Secretaria | null;

  cargando: boolean = true;

  imagenFondo: string = "/departamento_ici/transicion_6.webp"

  ngOnInit(): void {
    this._secretariaDataService.getDataSecretaria().subscribe({
      next: data => {
        this.dataSecretaria = data;
        if(this.dataSecretaria){
          this.cargando = false;
        }
      },
      error: error => {
        console.error('Error al capturar la data', error);
      }
    })
  }

  public signOut() {
    this._authService.logout();
  }

  public goToInformes() {
    this._routerService.navigate(['ver-informes-jefe']);
  }

  public goToPracticas() {
    this._routerService.navigate(['ver-practicas']);
  }

  // Nueva función para Cargar Usuarios por Nómina
  public cargarUsuariosPorNomina() {
    this._routerService.navigate(['cargar-alumnos-nomina']);
  }

  public goToEstadoAcademicos(){
    this._routerService.navigate(['seguimiento-academicos'])
  }
}

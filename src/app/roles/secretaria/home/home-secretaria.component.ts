import { Component, inject } from '@angular/core';
import { HeaderSecretariaComponent } from "../components/header/header-secretaria.component";
import { Secretaria } from '../dto/secretaria-data.dto';
import { StorageService } from '../../../shared/data-access/storage.service';
import { Data, Route, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { DataSecretariaService } from '../services/data-secretaria.service';
import { HeaderComponent } from "../../../pages/roles/jefe_compartido/header-jefes/header.component";
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-home-secretaria',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './home-secretaria.component.html',
  styleUrl: './home-secretaria.component.css'
})
export class HomeSecretariaComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
    private secretariaDataService: DataSecretariaService
  ){}

  // private _storageService = inject(StorageService);

  rolSecretaria: string = ''

  cargando: boolean = true;

  imagenFondo: string = "/departamento_ici/transicion_6.webp"

  tipoSecretaria: Record<string, string> = {
    SECRETARIA_DEPARTAMENTO: 'Secretaria de Departamento',
    SECRETARIA_CARRERA:'Secretaria de Carrera'
  }

  ngOnInit(): void {
    this.authService.getDecodedTokenObservable().subscribe({
      next: (data:any) => {
        console.log(data.rol)
        this.rolSecretaria = data.rol;
        if(this.rolSecretaria){
          this.cargando = false;
        }
      },
      error: (error:any) => {
        console.error('Error al capturar la data', error);
      }
    })
  }

  public signOut() {
    this.authService.logout();
  }

  public goToInformes() {
    this.router.navigate(['/app/secretaria/ver-informes-jefe']);
  }

  public goToPracticas() {
    this.router.navigate(['/app/secretaria/ver-practicas']);
  }

  // Nueva función para Cargar Usuarios por Nómina
  public cargarUsuariosPorNomina() {
    this.router.navigate(['/app/secretaria/cargar-alumnos-nomina']);
  }

  public goToEstadoAcademicos() {
    this.router.navigate(['/app/secretaria/seguimiento-academicos']);
  }

  public goToGenerarReportes() {
    this.router.navigate(['/app/secretaria/reportes']);
  }
}

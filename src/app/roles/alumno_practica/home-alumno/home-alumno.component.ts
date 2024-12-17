import { Component, inject, OnInit } from '@angular/core';
import { AlumnoService } from '../data-access/alumno.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { HeaderComponent } from "../components/header/header.component"
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';

@Component({
  selector: 'app-home-alumno',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './home-alumno.component.html',
  styleUrl: './home-alumno.component.css'
})
export class HomeAlumnoComponent implements OnInit{
  selectedPractica: number | null = 1; // Opción seleccionada
  practicas = [
    { id: 1, nombre: 'Práctica Profesional 1' },
    { id: 2, nombre: 'Práctica Profesional 2' }
  ];

  private readonly _alumnoService = inject(AlumnoService);
  private readonly _router = inject(Router);
  private readonly _authServiceState = inject(AuthStateService);
  private readonly _authService = inject(AuthService)
  
  dataAlumno: any;
  ngOnInit(): void {
    const decodedToken = this._authServiceState.getData();
    console.log(decodedToken, "token decodificado")
    if (decodedToken) {
      this.dataAlumno = {
        ...this.dataAlumno,
        id: decodedToken.id_usuario,
      };
      console.log('ID del usuario obtenido del token:', this.dataAlumno.id_usuario);
    }
  
    this._alumnoService.getAlumnoPracticante().subscribe({
      next: (data) => {
        this.dataAlumno = { ...data, id_user: this.dataAlumno.id_user }; // Combina datos de la API y token
        console.log('Datos del alumno:', this.dataAlumno);
      },
      error: (error) => {
        console.error('Error al obtener la data del alumno:', error);
      },
      complete: () => {
        console.log('Obtención de datos completa');
      }
    });
  }
  
  

  public informeEnEspera(): boolean {
    return this.dataAlumno?.practica?.some((practica:any) => practica.estado == 'ESPERA_INFORMES') || false;
  }

  public goToEstado(){
    console.log(this.dataAlumno.id_usuario, "yendo a estado practica");
    this._router.navigate(['estado-practica/'+this.dataAlumno.id_usuario]);
  }

  public goToInforme(){
    const idPractica = this.dataAlumno.practica.find((practica: any) => practica.estado === "ESPERA_INFORMES")?.id_practica;
    const idInforme = this.dataAlumno.informe.find((informe:any) => informe.estado === 'ESPERA')?.id_informe

    console.log(idPractica)
    console.log()
    this._router.navigate(['informe-practica-alumno/'+this.dataAlumno.id_usuario+'/'+idPractica!+'/'+idInforme]);

  }

  public signOut(){
    this._authService.logout();
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { AlumnoService } from '../data-access/alumno.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { HeaderComponent } from "../components/header/header.component"
import { CommonModule } from '@angular/common';

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
  private readonly _authService = inject(AuthService);
  
  dataAlumno: any;
  
  ngOnInit(): void {
    this._alumnoService.getAlumnoPracticante().subscribe({
      next: (data) => {
        this.dataAlumno = data;
        console.log(this.dataAlumno)
      },
      error: (error) => {
        console.error('Error al obtener la data', error);
      },
      complete: () => {
        console.log('Obtención de datos ccorrecta');
      }
    }
    )
  }

  public informeEnEspera(): boolean {
    return this.dataAlumno?.practica?.some((practica:any) => practica.estado == 'ESPERA_INFORMES') || false;
  }

  public goToEstado(){
    this._router.navigate(['estado-practica/'+this.dataAlumno.id_user]);
  }

  public goToInforme(){
    const idPractica = this.dataAlumno.practica.find((practica: any) => practica.estado === "ESPERA_INFORMES")?.id_practica;
    const idInforme = this.dataAlumno.informe.find((informe:any) => informe.estado === 'ESPERA')?.id_informe

    console.log(idPractica)
    this._router.navigate(['informe-practica-alumno/'+this.dataAlumno.id_user+'/'+idPractica!+'/'+idInforme!]);
  }

  public signOut(){
    this._authService.logout();
  }
}

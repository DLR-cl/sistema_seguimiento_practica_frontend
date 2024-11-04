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
  
  // Método para establecer la práctica seleccionada


  ngOnInit(): void {
    this._alumnoService.getAlumnoPracticante().subscribe({
      next: (data) => {
        this.dataAlumno = data;
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

  private getData(){
    this.dataAlumno 
  }
  public goToEstado(){
    this._router.navigate(['estado-practica']);
  }

  public goToInforme(){
    this._router.navigate(['informe-practica-alumno']);
  }

  public signOut(){
    this._authService.logout();
  }
}

import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../components/header/header.component";
import { ActivatedRoute, Router } from '@angular/router';
import { PracticasAlumnoService } from '../services/practicas-alumno.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estado-practica',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './estado-practica.component.html',
  styleUrls: ['./estado-practica.component.css'] // Cambiado a styleUrls para corregir un typo
})
export class EstadoPracticaComponent implements OnInit {
  idAlumno!: number;
  practicas: any[] = []; // Inicializa como un arreglo vacío
  practicaSeleccionada: any = null; // Inicializa como null para evitar errores
  pasoActual = 1;

  constructor(
    private route: ActivatedRoute,
    private practicasService: PracticasAlumnoService,
    private router: Router // Agregado para manejar redirecciones si es necesario
  ) {}

  ngOnInit(): void {
    const idAlumnoParam = this.route.snapshot.paramMap.get('idAlumno');
    if (!idAlumnoParam || isNaN(Number(idAlumnoParam))) {
      console.error('ID de alumno no válido o no proporcionado');
      this.router.navigate(['/home-alumno']); // Redirige si el ID es inválido
      return;
    }

    this.idAlumno = Number(idAlumnoParam);
    console.log('ID del alumno obtenido:', this.idAlumno);

    this.obtenerPracticasAlumno();
  }

  public obtenerPracticasAlumno(): void {
    this.practicasService.obtenerPracticasAlumno(this.idAlumno).subscribe({
      next: (result) => {
        if (result && Array.isArray(result)) {
          this.practicas = result;
          console.log('Prácticas obtenidas:', this.practicas);
        } else {
          console.warn('Respuesta inesperada al obtener las prácticas:', result);
        }
      },
      error: (error) => {
        console.error('Error al obtener las prácticas del alumno:', error);
      }
    });
  }
}

import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { AlumnoService } from '../../data-access/alumno.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  @Output() data: EventEmitter<string> = new EventEmitter();

  constructor(
    private router: Router,
    private authService: AuthService,
    private alumnoService: AlumnoService
  ){}

  isMenuOpen = false;
  

  dataAlumno: any

  ngOnInit(): void {
    this.getData()   
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  public goToEstado(){
    this.router.navigate(['estado-practica/'+this.dataAlumno.id_user]);
  }

  public getData(){
    this.alumnoService.getAlumnoPracticante().subscribe({
      next: result => {
        this.dataAlumno = result
        this.enviarDatos()
        console.log(this.dataAlumno)
      },
      error: error => {
        console.log(error)
      }
    })
  }

  public goToInformes(){
    this.router.navigate([''])
  }

  public signOut(){
    this.authService.logout();
  }
  public goToHome(){
    this.router.navigate(['home-alumno'])
  }

  public enviarDatos() {
    const datos = this.dataAlumno;
    this.data.emit(datos);
  }
}

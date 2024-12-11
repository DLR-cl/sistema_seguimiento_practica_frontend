import { Component, inject, OnInit } from '@angular/core';
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

  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _alumnoSevice = inject(AlumnoService)
  isMenuOpen = false;

  dataAlumno: any

  ngOnInit(): void {
    this.getData()   
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  public goToEstado(){
    this._router.navigate(['estado-practica/'+this.dataAlumno.id_user]);
  }

  public getData(){
    this._alumnoSevice.getAlumnoPracticante().subscribe({
      next: result => {
        this.dataAlumno = result
        console.log(this.dataAlumno)
      },
      error: error => {
        console.log(error)
      }
    })
  }

  public goToInformes(){
    this._router.navigate([''])
  }

  public signOut(){
    this._authService.logout();
  }
  public goToHome(){
    this._router.navigate(['home-alumno'])
  }
}

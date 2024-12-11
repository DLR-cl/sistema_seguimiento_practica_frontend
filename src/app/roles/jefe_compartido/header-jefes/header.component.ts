import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private router: Router
  ){}

  isMenuOpen = false;
  isSubMenuOpen = false;

  // Método para mostrar la alerta
  alerta(mensaje: string) {
    alert(mensaje);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  goToInformeAlumno(){
    this.router.navigate(['preguntas/alumno'])
  }

  goToinformeConfidencial(){
    this.router.navigate(['preguntas/confidencial'])
  }
  public goToInfoAcademicos(){
    this.router.navigate(['lista-academicos'])
  }
}

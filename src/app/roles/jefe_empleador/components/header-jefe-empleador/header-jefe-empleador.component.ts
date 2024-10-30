import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header-jefe-empleador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-jefe-empleador.component.html',
  styleUrl: './header-jefe-empleador.component.css'
})
export class HeaderJefeEmpleadorComponent {
  isMenuOpen: boolean = false;
  toggleMenu(){
    this.isMenuOpen= !this.isMenuOpen;
    console.log('Hola')
  }
}

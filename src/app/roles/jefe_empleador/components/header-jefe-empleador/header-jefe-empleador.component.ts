import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-header-jefe-empleador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-jefe-empleador.component.html',
  styleUrl: './header-jefe-empleador.component.css'
})
export class HeaderJefeEmpleadorComponent {
  
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);

  isMenuOpen: boolean = false;

  toggleMenu(){
    this.isMenuOpen= !this.isMenuOpen;
    console.log('Hola')
  }

  public goToInformes(){
    this._router.navigate(['ver-informes-jefe']);
  }
  
  public goToData(){
    this._router.navigate(['ver-datos-jefe']);
  }
  public signOut(){
    this._authService.logout()
}

  public goToHome(){
    this._router.navigate(['home-jefe-alumno']);
  }

  
}

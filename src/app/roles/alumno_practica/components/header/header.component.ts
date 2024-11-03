import { Component, inject } from '@angular/core';
import { routes } from '../../../../app.routes';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  public goToEstado(){
    this._router.navigate(['estado-practica']);
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

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header-secretaria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-secretaria.component.html',
  styleUrl: './header-secretaria.component.css'
})
export class HeaderSecretariaComponent {

  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);

  isMenuOpen: boolean = false;

  toggleMenu(){
    this.isMenuOpen= !this.isMenuOpen;
    console.log('Hola')
  }

  public goToPracticas(){
    this._router.navigate(['ver-practicas']);
  }
  
  public signOut(){
    this._authService.logout()
}

  public goToHome(){
    this._router.navigate(['home-secretaria']);
  }

  
}

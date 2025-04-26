import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../data-access/auth-state.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  showMenu = false; // Controla las transiciones
  authService = inject(AuthService);
  authStateService = inject(AuthStateService);
  usuarioRole?: string | null;
  ngOnInit(): void {
    this.usuarioRole = this.authStateService.getRole();
  }
  logout() {
    this.authService.logout();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}

import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  template: `
    <app-navbar />
    <section class="w-full h-full flex-1 flex flex-col ">
  <router-outlet />
</section>
  `
})
export class AuthLayoutComponent {
  // Aquí puedes agregar lógica común para todas las páginas autenticadas
}

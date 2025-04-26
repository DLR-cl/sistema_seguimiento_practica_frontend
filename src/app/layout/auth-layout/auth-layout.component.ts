import { Component } from '@angular/core';
import { HeaderComponent } from "../../pages/roles/jefe_compartido/header-jefes/header.component";
import { NavbarComponent } from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}

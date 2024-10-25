import { Component } from '@angular/core';
import { HeaderComponent } from "../header-jefes/header.component";
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-home-administracion',
  standalone: true,
  imports: [HeaderComponent, DashboardComponent],
  templateUrl: './home-administracion.component.html',
  styleUrl: './home-administracion.component.css'
})
export class HomeAdministracionComponent {
  nombre: string = "Diego Villagra";
}

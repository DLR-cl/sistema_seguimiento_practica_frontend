import { Component } from '@angular/core';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";
import { DashboardComponent } from "../../components/dashboard-elements/dashboard/dashboard.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu-general-page',
  standalone: true,
  imports: [NavbarComponent, DashboardComponent, RouterOutlet],
  templateUrl: './menu-general-page.component.html',
  styleUrl: './menu-general-page.component.css'
})
export class MenuGeneralPageComponent {

}

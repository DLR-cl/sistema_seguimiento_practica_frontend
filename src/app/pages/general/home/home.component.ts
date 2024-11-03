import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../../roles/jefe_compartido/header-jefes/header.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private _router = inject(Router);

  toLogin(){
    this._router.navigate(['login']);
  }
  
}

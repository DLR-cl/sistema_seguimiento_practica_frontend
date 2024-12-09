import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sistema_seguimiento_practica_frontend';
  constructor(private router: Router){}

  toLogin(){
    this.router.navigate(['/login']);
  }
}

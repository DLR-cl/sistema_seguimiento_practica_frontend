import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitar-practicante',
  standalone: true,
  imports: [],
  templateUrl: './solicitar-practicante.component.html',
  styleUrl: './solicitar-practicante.component.css'
})
export class SolicitarPracticanteComponent {

  private _router = inject(Router);

  toHome(){
    this._router.navigate(['home']);
  }
  
}

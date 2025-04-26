import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-solicitar-practicante-contact-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './solicitar-practicante-contact-page.component.html',
  styleUrl: './solicitar-practicante-contact-page.component.css'
})
export class SolicitarPracticanteContactPageComponent {
  correo:string = "ici@gestion.uta.cl";

}

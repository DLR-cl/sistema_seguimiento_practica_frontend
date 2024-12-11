import { Component } from '@angular/core';
import { HeaderComponent } from "../jefe_compartido/header-jefes/header.component";

@Component({
  selector: 'app-academico',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './academico.component.html',
  styleUrl: './academico.component.css'
})
export class AcademicoComponent {

}

import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../jefe_compartido/header-jefes/header.component";
import { DataAccessService } from './services/data-access.service';
import { map } from 'rxjs';
import { InfoInformes } from './interface/info-informes.interface';

@Component({
  selector: 'app-academico',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './academico.component.html',
  styleUrl: './academico.component.css'
})
export class AcademicoComponent{


}


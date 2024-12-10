import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header-jefes/header.component";
import { DatosAcademicosService } from '../../services/datos-academicos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-academicos',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './info-academicos.component.html',
  styleUrl: './info-academicos.component.css'
})
export class InfoAcademicosComponent implements OnInit{

  private readonly _datosAcademicosService = inject(DatosAcademicosService);

  academicosData?:any[];
  ngOnInit(): void {
    this.getDatosDeAcademicos();

  }

  private getDatosDeAcademicos(){
    this._datosAcademicosService.getInfoAcademicos().subscribe(
      data => {
        this.academicosData = data;
        console.log(data);
      }
    )
  }
}

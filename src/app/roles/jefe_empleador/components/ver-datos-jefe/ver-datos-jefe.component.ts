import { Component, inject, OnInit } from '@angular/core';
import { AuthStateService } from '../../../../shared/data-access/auth-state.service';
import { PayloadInterface } from '../../../../shared/interface/payload.interface';
import { JefeAlumnoInterface } from '../../data-access/interface/jefe-alumno.interface';
import { JefeEmpleadorService } from '../../data-access/jefe-empleador.service';

@Component({
  selector: 'app-ver-datos-jefe',
  standalone: true,
  imports: [],
  templateUrl: './ver-datos-jefe.component.html',
  styleUrl: './ver-datos-jefe.component.css'
})
export class VerDatosJefeComponent implements OnInit{

  private readonly authStateService = inject(AuthStateService);
  private readonly _jefeService = inject(JefeEmpleadorService);

  jefe_data?: JefeAlumnoInterface;
  
  ngOnInit(): void {
    this.getData();
  }

  private getData(){
    this._jefeService.getJefeEmpleador().subscribe(
      data => {
        this.jefe_data = data;
        console.log(data);
      }
    )
  };



  
}

import { Component, Input } from '@angular/core';
import { Empresa } from '../../../../../../pages/roles/jefe_compartido/dto/empresa.dto';
import { JefeAlumnoInterface } from '../../../../interface/jefe-alumno.interface';

@Component({
  selector: 'app-supervisor-info-card',
  standalone: true,
  imports: [],
  templateUrl: './supervisor-info-card.component.html',
  styleUrl: './supervisor-info-card.component.css'
})
export class SupervisorInfoCardComponent {
  @Input() dataJefe!: JefeAlumnoInterface;
  @Input() dataEmpresa!: Empresa;

  ngOnChanges() {
    console.log('[DEBUG] dataEmpresa recibido:', this.dataEmpresa);
  }
}

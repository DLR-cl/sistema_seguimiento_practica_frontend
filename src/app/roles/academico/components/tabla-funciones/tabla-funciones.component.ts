import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DataAccessService } from '../../services/data-access.service';
import { InfoInformes } from '../../interface/info-informes.interface';
import { AuthStateService } from '../../../../shared/data-access/auth-state.service';

@Component({
  selector: 'app-tabla-funciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-funciones.component.html',
  styleUrl: './tabla-funciones.component.css'
})
export class TablaFuncionesComponent implements OnInit {
  asignado:boolean = false;

  private readonly _dataAccesssService = inject(DataAccessService);
  private readonly _dataUserFromTokenService = inject(AuthStateService);

  data?:InfoInformes[];
  dataUser?:any;
  ngOnInit(): void {
    this.toDataUser()
    this.getInfoInformes();
      }

  private getInfoInformes(){
    const dataSet = this._dataAccesssService.getInformacionInformes(this.dataUser?.id_usuario).subscribe(
      {
        next:  (r) => {
          this.data = r;
        },
      }
    )
    if(this.data?.length != 0){
      this.asignado = true;
    }
  }

  private toDataUser(){
    this.dataUser = this._dataUserFromTokenService.getData();
  }

  public cantidadDiasSobrantes(fecha: Date){
    const cant = new Date(fecha).getDate() -  new Date().getDate();
    return cant;
  }
}

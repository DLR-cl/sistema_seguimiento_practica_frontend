import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DataAccessService } from '../../services/data-access.service';
import { InfoInformes } from '../../interface/info-informes.interface';
import { AuthStateService } from '../../../../shared/data-access/auth-state.service';
import { PayloadInterface } from '../../../../shared/interface/payload.interface';
import { Nullable } from 'primeng/ts-helpers';

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
  dataUser?:PayloadInterface | null;
  ngOnInit(): void {
    this.toDataUser()
    if(this.dataUser){
      this.getInfoInformes(this.dataUser.id_usuario);
    }
      }

  private getInfoInformes(id_user: number){
    console.log(this.dataUser?.id_usuario)
    const dataSet = this._dataAccesssService.getInformacionInformes(id_user).subscribe(
      {
        next:  (r) => {
          console.log(r)
          this.data = r;
          console.log(this.data, 'LISTA INFORMES')
          if(this.data?.length != 0 && this.data !== undefined){
            this.asignado = true;
          }
        },
      }
    )
  }

  private toDataUser(){
    this.dataUser = this._dataUserFromTokenService.getData();
  }

  public cantidadDiasSobrantes(fecha: Date){
    const cant = new Date(fecha).getDate() -  new Date().getDate();
    return cant;
  }
}

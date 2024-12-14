import { Component, inject, OnInit } from '@angular/core';
import { AuthStateService } from '../../../../shared/data-access/auth-state.service';
import { DataAccessService } from '../../services/data-access.service';
import { CantidadInformesPendientes, InfoInformes } from '../../interface/info-informes.interface';
import { PayloadInterface } from '../../../../shared/interface/payload.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-data.component.html',
  styleUrl: './perfil-data.component.css'
})
export class PerfilDataComponent implements OnInit{
  private readonly _dataUserService = inject(AuthStateService);
  private readonly _accessDataService = inject(DataAccessService);

  dataUser?:PayloadInterface | null;
  informesPendientes?:CantidadInformesPendientes;
  infoInformes?:InfoInformes[];
  informesCriticos?:InfoInformes[];
  existenInformes:boolean = false;
  ngOnInit(): void {
    this.dataUser = this._dataUserService.getData();
    if(this.dataUser){
      this.getCantidadInformesPendientes(this.dataUser.id_usuario)
      this.getDataAboutInformes(this.dataUser.id_usuario);
      this.getInformesCriticos(this.dataUser.id_usuario);
    }
  }

  private getCantidadInformesPendientes(id_academico: number){  
    return this._accessDataService.getCantidadInformesPendientes(id_academico).subscribe({
      next: (r) => {
        this.informesPendientes = r;
      }
    })
  }

  private getDataAboutInformes(id_academico: number){
    return this._accessDataService.getInformacionInformes(id_academico).subscribe({
      next: (r) => {
        this.infoInformes = r;
        if(this.infoInformes.length > 0){
          this.existenInformes = true;
        }
      }
    })
  }

  private getInformesCriticos(id_academico: number){
    return this._accessDataService.getInformesCriticos(id_academico).subscribe({
      next: (r) => {
        this.informesCriticos = r
      }
    })
  }
  // que se devuelva al home si no tiene inicio de sesión
  private goToHome(){
    
  }
}

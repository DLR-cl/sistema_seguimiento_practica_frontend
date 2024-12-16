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
export class PerfilDataComponent implements OnInit {
  private readonly _dataUserService = inject(AuthStateService);
  private readonly _accessDataService = inject(DataAccessService);

  dataUser?: PayloadInterface | null;
  informesPendientes?: CantidadInformesPendientes;
  infoInformes?: InfoInformes[];
  informesCriticos?: InfoInformes[];
  existenInformes: boolean = false;

  ngOnInit(): void {
    this.dataUser = this._dataUserService.getData();
    if (this.dataUser) {
      console.log(this.dataUser);
      this.getCantidadInformesPendientes();
      this.getDataAboutInformes();
      this.getInformesCriticos();
    } else {
      console.error('No se pudo obtener el usuario del token');
    }
  }

  private getCantidadInformesPendientes() {
    this._accessDataService.getCantidadInformesPendientes().subscribe({
      next: (r) => {
        this.informesPendientes = r;
      },
      error: (err) => console.error('Error al obtener informes pendientes:', err),
    });
  }

  private getDataAboutInformes() {
    this._accessDataService.getInformacionInformes().subscribe({
      next: (r) => {
        this.infoInformes = r;
        this.existenInformes = this.infoInformes?.length > 0;
      },
      error: (err) => console.error('Error al obtener información de informes:', err),
    });
  }

  private getInformesCriticos() {
    this._accessDataService.getInformesCriticos().subscribe({
      next: (r) => {
        this.informesCriticos = r;
      },
      error: (err) => console.error('Error al obtener informes críticos:', err),
    });
  }
}

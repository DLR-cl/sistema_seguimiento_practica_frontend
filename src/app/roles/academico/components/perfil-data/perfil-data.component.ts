import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataAccessService } from '../../services/data-access.service';
import { CantidadInformesPendientes, InfoInformes, ResumenConteoInformes } from '../../interface/info-informes.interface';
import { PayloadInterface } from '../../../../shared/interface/payload.interface';
import { AuthService } from '../../../../auth/services/auth.service';
import { AuthStateService } from '../../../../shared/data-access/auth-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-data.component.html',
  styleUrls: ['./perfil-data.component.css'], // Cambiado a styleUrls para corregir el typo
})
export class PerfilDataComponent implements OnInit {
  private readonly _accessDataService = inject(DataAccessService);
  private readonly _authServiceState = inject(AuthStateService);
  private readonly _router = inject(Router)

  dataUser: any; // Payload decodificado del token
  informesPendientes?: CantidadInformesPendientes;
  infoInformes?: InfoInformes[];
  informesCriticos?: InfoInformes[];
  existenInformes: boolean = false;
  resumenConteoInformes?:ResumenConteoInformes;
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    const decodedToken = this._authServiceState.getData();
    if(decodedToken){
      this.dataUser = {
        nombre: decodedToken.nombre,
        correo: decodedToken.nombre,
        id_usuario: decodedToken.id_usuario,
        rol: decodedToken.rol
      }
    }
      if (this.dataUser) {
        this.getCantidadInformesPendientes();
        this.getDataAboutInformes();
        this.getInformesCriticos();
        this.getResumenConteoInformes()
      } else {
        console.error('Token sigue siendo nulo después de esperar.');
      }
  
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Libera la suscripción
  }

  private getCantidadInformesPendientes() {
    this._accessDataService.getCantidadInformesPendientes(this.dataUser.access_token).subscribe({
      next: (r) => {
        this.informesPendientes = r;
      },
      error: (err) => console.error('Error al obtener informes pendientes:', err),
    });
  }

  private getResumenConteoInformes(){
    console.log(this.dataUser.id_usuario )
    this._accessDataService.getResumenInformes(this.dataUser.id_usuario).subscribe({
      next: (result: ResumenConteoInformes) => {
        this.resumenConteoInformes = result;
        console.log(this.resumenConteoInformes)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  private getDataAboutInformes() {
    this._accessDataService.getInformacionInformes(this.dataUser.access_token).subscribe({
      next: (r) => {
        this.infoInformes = r;
        this.existenInformes = this.infoInformes?.length > 0;
      },
      error: (err) => console.error('Error al obtener información de informes:', err),
    });
  }

  private getInformesCriticos() {
    this._accessDataService.getInformesCriticos(this.dataUser.access_token).subscribe({
      next: (r) => {
        this.informesCriticos = r;
      },
      error: (err) => console.error('Error al obtener informes críticos:', err),
    });
  }

  public revision(idPractica: number){
    this._router.navigate(['revision-informe/'+idPractica])
  }
}

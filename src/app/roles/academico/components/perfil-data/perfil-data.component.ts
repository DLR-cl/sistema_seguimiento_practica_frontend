import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../auth/services/auth.service';
import { DataAccessService } from '../../services/data-access.service';
import { CantidadInformesPendientes, InfoInformes } from '../../interface/info-informes.interface';

@Component({
  selector: 'app-perfil-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-data.component.html',
  styleUrls: ['./perfil-data.component.css'], // Cambiado a styleUrls para corregir el typo
})
export class PerfilDataComponent implements OnInit {
  private readonly _authService = inject(AuthService);
  private readonly _accessDataService = inject(DataAccessService);

  dataUser: any; // Payload decodificado del token
  informesPendientes?: CantidadInformesPendientes;
  infoInformes?: InfoInformes[];
  informesCriticos?: InfoInformes[];
  existenInformes: boolean = false;
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this._authService.waitForToken().then((decodedToken) => {
      this.dataUser = decodedToken;
  
      if (this.dataUser) {
        this.getCantidadInformesPendientes();
        this.getDataAboutInformes();
        this.getInformesCriticos();
      } else {
        console.error('Token sigue siendo nulo después de esperar.');
      }
    });
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
}

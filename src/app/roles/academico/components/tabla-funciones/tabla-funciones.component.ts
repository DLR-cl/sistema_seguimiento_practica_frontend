import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { DataAccessService } from '../../services/data-access.service';
import { InfoInformes } from '../../dto/info-informes.dto';
import { AuthService } from '../../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { AuthStateService } from '../../../../shared/data-access/auth-state.service';


@Component({
  selector: 'app-tabla-funciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-funciones.component.html',
  styleUrls: ['./tabla-funciones.component.css'], // Corregido a styleUrls
})
export class TablaFuncionesComponent implements OnInit {

  asignado: boolean = false;
  @Output() estadoCargando = new EventEmitter<boolean>();
  cargando: boolean = true;

  constructor(
    private router: Router,
    private dataAccessService: DataAccessService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.decodedToken = this.authService.getDecodedToken();
    this.getInfoInformes();
  }

  data?: InfoInformes[];
  decodedToken: any;

  textoEstadoInforme: Record<string, string> = {
    ENVIADA: 'Enviado',
    REVISION: 'Revisión',
    CORRECCION: 'Corrección',
    ESPERA: 'Espera',
    APROBADA: 'Aprobada',
    DESAPROBADA: 'Desaprobada'
  };

  textoEstadoPractica: Record<string, string> = {
    CURSANDO: 'Cursando',
    REVISION_GENERAL: 'Revisión General',
    ESPERA_INFORMES: 'Espera Informes',
    FINALIZADA: 'Finalizada',
    INFORMES_RECIBIDOS: 'Informes Recibidos'
  };

 

  private getInfoInformes() {
    const token = this.decodedToken?.access_token; // Opcionalmente puedes validar el token aquí
    console.log(token)
    this.dataAccessService.getInformacionInformes(token).subscribe({
      next: (r) => {
        console.log("data para tabla",r)
        this.data = r;
        this.asignado = this.data.length > 0;
        this.cargando = false
        this.estadoCargando.emit(this.cargando);
      },
      error: (err) =>
        console.error('Error al obtener información de informes:', err),
    });
  }

  public cantidadDiasSobrantes(fecha: Date) {
    const cant = new Date(fecha).getDate() - new Date().getDate();
    return cant;
  }

  public revision(idPractica: number){
    this.router.navigate(['revision-informe/'+idPractica])
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DataAccessService } from '../../services/data-access.service';
import { InfoInformes } from '../../interface/info-informes.interface';
import { AuthService } from '../../../../auth/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabla-funciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-funciones.component.html',
  styleUrls: ['./tabla-funciones.component.css'], // Corregido a styleUrls
})
export class TablaFuncionesComponent implements OnInit {
  asignado: boolean = false;

  constructor(
    private router: Router
  ){}

  private readonly _dataAccessService = inject(DataAccessService);
  private readonly _authService = inject(AuthService);

  data?: InfoInformes[];
  decodedToken: any;

  ngOnInit(): void {
    // Obtén el token decodificado
    this.decodedToken = this._authService.getDecodedToken();

    // Llama al método para obtener informes
    this.getInfoInformes();
  }

  private getInfoInformes() {
    const token = this.decodedToken?.access_token; // Opcionalmente puedes validar el token aquí
    this._dataAccessService.getInformacionInformes(token).subscribe({
      next: (r) => {
        console.log(r)
        this.data = r;
        this.asignado = this.data?.length > 0;
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

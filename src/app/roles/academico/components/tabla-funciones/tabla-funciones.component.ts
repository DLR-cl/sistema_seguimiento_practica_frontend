import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { DataAccessService } from '../../services/data-access.service';
import { InfoInformes } from '../../dto/info-informes.dto';
import { AuthService } from '../../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { AuthStateService } from '../../../../shared/data-access/auth-state.service';
import { GenerarPDF } from '../../dto/revision-informes.dto';
import { DatosPracticaService } from '../../services/datos-practica.service';
import { MessageService } from 'primeng/api';


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
  cargandoDescarga: boolean = false;

  constructor(
    private router: Router,
    private dataAccessService: DataAccessService,
    private authService: AuthService,
    private datosPracticaService: DatosPracticaService,
    private messageService: MessageService
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

  tipoPractica: Record<string, string> = {
    PRACTICA_UNO: 'Práctica Profesional I',
    PRACTICA_DOS: 'Práctica Profesional II'
  };

 
  public descargarPDF(idPractica: number, idInformeEvaluativo: number, tipoPractica: string, nombreAlumno: string){
    this.cargandoDescarga = true;
    const practica: GenerarPDF = {
      id_practica: idPractica,
      id_informe_evaluativo: idInformeEvaluativo,
      id_docente: this.decodedToken.id_usuario
    }

    const tipo = this.tipoPractica[tipoPractica].replace(/ /g, "").replace(/(Profesional)([IVXLCDM]+)/, '$1-$2');
    const nombre = nombreAlumno.replace(/ /g, "")

    console.log(tipo, nombre)

    this.datosPracticaService.descargarPDF(practica)
  }

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

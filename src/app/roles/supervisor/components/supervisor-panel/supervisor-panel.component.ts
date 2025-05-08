import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { InformeConfidencialService } from '../../services/informe-confidencial.service';
import { DataJefeAlumnoService } from '../../services/data-jefe-alumno.service';
import { AuthStateService } from '../../../../shared/data-access/auth-state.service';

import { SupervisorState, TIPO_PRACTICA, ESTADO_INFORME, ESTADO_PRACTICA, MODALIDAD } from '../../interface/supervisor.types';
import { DetallesInformes } from '../../dto/informe-confidencial.dto';
import { SupervisorInfoCardComponent } from './components/supervisor-info-card/supervisor-info-card.component';
import { SupervisorPendingReportsComponent } from './components/supervisor-pending-reports/supervisor-pending-reports.component';
import { SupervisorStatsCardsComponent } from './components/supervisor-stats-cards/supervisor-stats-cards.component';
import { SupervisorReportsTableComponent } from './components/supervisor-reports-table/supervisor-reports-table.component';
import { SupervisorPracticaModalComponent } from './components/supervisor-practica-modal/supervisor-practica-modal.component';

@Component({
  selector: 'app-supervisor-panel',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    TableModule, 
    ChartModule, 
    ListboxModule, 
    ButtonModule, 
    DialogModule,
    SupervisorInfoCardComponent,
    SupervisorPendingReportsComponent,
    SupervisorStatsCardsComponent,
    SupervisorReportsTableComponent,
    SupervisorPracticaModalComponent
  ],
  templateUrl: './supervisor-panel.component.html',
  styleUrls: ['./supervisor-panel.component.scss']
})
export class SupervisorPanelComponent implements OnInit {
  @Output() estadoCargando = new EventEmitter<boolean>();

  // Estado usando signals
  private state = signal<SupervisorState>({
    loading: true,
    error: null,
    dataJefe: null,
    dataEmpresa: null,
    alumnosAsignados: 0,
    informesPendientes: 0,
    totalInformes: 0,
    detalleInformes: [],
    informesPendientesList: [],
    selectedInforme: null,
    modalDetalles: false,
    practicaSeleccionada: null,
    cargandoPracticas: new Set<number>()
  });

  // Computed values
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);
  readonly dataJefe = computed(() => this.state().dataJefe);
  readonly dataEmpresa = computed(() => this.state().dataEmpresa);
  readonly alumnosAsignados = computed(() => this.state().alumnosAsignados);
  readonly informesPendientes = computed(() => this.state().informesPendientes);
  readonly totalInformes = computed(() => this.state().totalInformes);
  readonly detalleInformes = computed(() => this.state().detalleInformes);
  readonly informesPendientesList = computed(() => this.state().informesPendientesList);
  readonly modalDetalles = computed(() => this.state().modalDetalles);
  readonly practicaSeleccionada = computed(() => this.state().practicaSeleccionada);

  // Signal setters
  setModalDetalles(value: boolean) {
    this.state.update(s => ({ ...s, modalDetalles: value }));
  }

  // Constantes
  readonly tipoPractica = TIPO_PRACTICA;
  readonly textoEstadoInforme = ESTADO_INFORME;
  readonly textoEstadoPractica = ESTADO_PRACTICA;
  readonly textoModalidad = MODALIDAD;

  // Tipo para el template
  readonly tipoPracticaKeys = Object.keys(TIPO_PRACTICA) as Array<keyof typeof TIPO_PRACTICA>;
  readonly estadoInformeKeys = Object.keys(ESTADO_INFORME) as Array<keyof typeof ESTADO_INFORME>;

  constructor(
    private informeConfidencialService: InformeConfidencialService,
    private jefeDataService: DataJefeAlumnoService,
    private router: Router,
    private authStateService: AuthStateService,
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  private cargarDatosIniciales(): void {
    this.jefeDataService.getData().subscribe({
      next: (data) => {
        console.log('[DEBUG] Datos jefe recibidos:', data);
        if (data) {
          this.state.update(s => ({ ...s, dataJefe: data }));

          if (data.id_jefe && data.id_empresa) {
            Promise.all([
              this.obtenerPracticas(),
              this.obtenerEmpresa(data.id_empresa),
              this.obtenerAlumnosAsignados()
            ]).finally(() => {
              this.state.update(s => ({ ...s, loading: false }));
              this.estadoCargando.emit(false);
            });
            return;
          }
        }
        this.state.update(s => ({ ...s, loading: false }));
        this.estadoCargando.emit(false);
      },
      error: (error) => {
        console.error('[DEBUG] Error al cargar datos iniciales:', error);
        this.state.update(s => ({ ...s, error: 'Error al cargar los datos iniciales', loading: false }));
        this.estadoCargando.emit(false);
      }
    });
  }

  private async obtenerPracticas(): Promise<void> {
    const token = this.authStateService.getSession()?.access_token;
    if (!token) {
      this.state.update(s => ({ ...s, loading: false }));
      return;
    }

    this.informeConfidencialService.obtenerDestallesInformes(token).subscribe({
      next: (result) => {
        console.log('[DEBUG] Informes recibidos:', result);
        if (result) {
          const informesPendientes = result.filter(practica => practica.estado_informe === 'ESPERA').length;
          const detalleInformes = result.filter(informe => {
            const fechaActual = new Date();
            const fechaLimite = new Date(informe.fecha_limite_entrega);
            const diferenciaDias = Math.ceil((fechaActual.getTime() - fechaLimite.getTime()) / (1000 * 60 * 60 * 24));
            return diferenciaDias <= 500;
          });
          const informesPendientesList = detalleInformes.filter(
            (informe: DetallesInformes) => informe.estado_informe === 'ESPERA'
          );
          console.log('[DEBUG] Informes pendientes:', informesPendientesList);
          this.state.update(s => ({
            ...s,
            informesPendientes,
            detalleInformes,
            informesPendientesList
          }));
        }
      },
      error: (error) => {
        console.error('[DEBUG] Error obteniendo prácticas:', error);
        this.state.update(s => ({ ...s, error: 'Error al obtener las prácticas' }));
      }
    });
  }

  private async obtenerAlumnosAsignados(): Promise<void> {
    try {
      const result = await this.informeConfidencialService.obtenerAlumnosAsignados().toPromise();
      console.log('[DEBUG] Alumnos asignados recibidos:', result);
      if (result) {
        this.state.update(s => ({
          ...s,
          alumnosAsignados: result.cantAlumnosAsignados,
          totalInformes: result.cantidadTotalInformes
        }));
      }
    } catch (error) {
      console.error('[DEBUG] Error obteniendo alumnos asignados:', error);
      this.state.update(s => ({ ...s, error: 'Error al obtener alumnos asignados' }));
    }
  }

  private async obtenerEmpresa(id_empresa: number): Promise<void> {
    try {
      const result = await this.informeConfidencialService.obtenerDatosEmpresas().toPromise();
      console.log('[DEBUG] Empresas recibidas:', result);
      if (result) {
        const empresa = result.find(empresa => empresa.id_empresa === id_empresa);
        if (empresa) {
          this.state.update(s => ({ ...s, dataEmpresa: empresa }));
        }
      }
    } catch (error) {
      console.error('[DEBUG] Error obteniendo empresa:', error);
      this.state.update(s => ({ ...s, error: 'Error al obtener datos de la empresa' }));
    }
  }

  public realizarInforme(id_informe: number): void {
    this.router.navigate(['jefe_alumno/formulario_primer_practica/' + id_informe]);
  }

  public verInforme(informe: DetallesInformes): void {
    const idInforme = informe.id_informe_confidencial;
    if (!this.state().cargandoPracticas.has(idInforme)) {
      const cargandoPracticas = new Set(this.state().cargandoPracticas);
      cargandoPracticas.add(idInforme);
      this.state.update(s => ({ ...s, cargandoPracticas }));

      this.informeConfidencialService.obtenerPractica(informe.id_practica).subscribe({
        next: (result) => {
          this.state.update(s => ({
            ...s,
            selectedInforme: informe,
            practicaSeleccionada: result,
            modalDetalles: true,
            cargandoPracticas: new Set([...s.cargandoPracticas].filter(id => id !== idInforme))
          }));
        },
        error: (error) => {
          console.error('Error al obtener práctica:', error);
          const cargandoPracticas = new Set(this.state().cargandoPracticas);
          cargandoPracticas.delete(idInforme);
          this.state.update(s => ({
            ...s,
            error: 'Error al obtener detalles de la práctica',
            cargandoPracticas
          }));
        }
      });
    }
  }

  public cerrarModalDetalles(): void {
    this.state.update(s => ({
      ...s,
      modalDetalles: false,
      practicaSeleccionada: null
    }));
  }

  getTipoPractica(tipo: string): string {
    return this.tipoPractica[tipo as keyof typeof TIPO_PRACTICA] || '';
  }

  getEstadoInforme(estado: string): string {
    return this.textoEstadoInforme[estado as keyof typeof ESTADO_INFORME] || '';
  }
}

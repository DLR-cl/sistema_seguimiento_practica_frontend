import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataPracticaAlumnoService } from '../../../../gestion-practicas/services/data-practica-alumno.service';
import { DataEstadisticaPracticaService } from '../../../../gestion-practicas/services/data-estadistica-practica.service';
import { LoadingStateComponent } from './components/loading-state/loading-state.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { StatsChartComponent } from './components/stats-chart/stats-chart.component';
import { AuthStateService } from '../../../../shared/data-access/auth-state.service';
import { DashboardService } from '../../../../pages/roles/jefe_compartido/services/dashboard.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-statisc',
  standalone: true,
  imports: [
    CommonModule,
    LoadingStateComponent,
    ErrorMessageComponent,
    StatsCardComponent,
    StatsChartComponent
  ],
  template: `
    <div class="w-full min-h-screen bg-gray-800 flex flex-col">
      <div class="w-full max-w-6xl mx-auto flex-1 flex flex-col space-y-6 px-2 sm:px-4 md:px-8 py-4 md:py-8">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-200">
            Estadísticas de Informes
          </h1>
        </div>

        @if (cargando()) {
          <div class="flex-1 flex items-center justify-center w-full min-h-[60vh]">
            <app-loading-state />
          </div>
        } @else if (errorMessage()) {
          <app-error-message [message]="errorMessage() || 'Ha ocurrido un error'" />
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <app-stats-card
              title="Informes Aprobados"
              [stats]="datosConteoPractica()?.aprobados"
              type="success"
            />
            <app-stats-card
              title="Informes Reprobados"
              [stats]="datosConteoPractica()?.reprobados"
              type="error"
            />
          </div>

          <div class="rounded-2xl shadow-2xl border border-gray-700 bg-gray-900 p-4 sm:p-6 md:p-8 mt-6">
            <app-stats-chart
              title="Informes Entregados por Mes"
              [data]="datosConteoPracticaInformesByMes()"
            />
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class StatiscComponent implements OnInit {
  dataUser = signal<any>(null);
  datosConteoPractica = signal<any>(null);
  datosConteoPracticaInformesByMes = signal<any>(null);
  cargando = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  private readonly authStateService = inject(AuthStateService);
  private readonly dashboardService = inject(DashboardService);

  constructor(
    private router: Router,
    private dataPracticaAlumnoService: DataPracticaAlumnoService,
    private dataEstadisticaPracticaService: DataEstadisticaPracticaService
  ) {}

  ngOnInit(): void {
    this.initializeData();
  }

  private async initializeData(): Promise<void> {
    try {
      this.cargando.set(true);
      this.errorMessage.set(null);

      const userData = this.authStateService.getData();
      if (!userData) {
        this.router.navigate(['/dashboard']);
        return;
      }

      this.dataUser.set(userData);

      if (userData.rol !== 'ACADEMICO') {
        this.router.navigate(['/dashboard']);
        return;
      }

      await this.loadStatisticsData();
    } catch (error) {
      console.error('Error al cargar datos:', error);
      this.errorMessage.set('Error al cargar las estadísticas. Por favor, intente nuevamente.');
    } finally {
      this.cargando.set(false);
    }
  }

  private async loadStatisticsData(): Promise<void> {
    try {
      const [conteoData, conteoByMesData] = await Promise.all([
        firstValueFrom(this.dashboardService.obtenerDatosConteoPractica(this.dataUser()?.id_usuario)),
        firstValueFrom(this.dashboardService.obtenerInformesPorMesPractica(this.dataUser()?.id_usuario))
      ]);

      console.log('Datos de conteo:', conteoData);
      console.log('Datos por mes:', conteoByMesData);

      this.datosConteoPractica.set(conteoData);
      this.datosConteoPracticaInformesByMes.set(conteoByMesData);
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
      throw error;
    }
  }
}

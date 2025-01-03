import { AfterViewChecked, AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../header-jefes/header.component";
import { DashboardService } from '../../services/dashboard.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TipoPractica } from '../../../../enum/enumerables.enum';
import { PayloadInterface } from '../../../../shared/interface/payload.interface';
import { AuthStateService } from '../../../../shared/data-access/auth-state.service';
import Chart from 'chart.js/auto';
import { ConteoPorMes, ConteoPracticas } from '../../../../shared/interface/reporte-practica.interface';

@Component({
  selector: 'app-resultados-practica',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './resultados-practica.component.html',
  styleUrl: './resultados-practica.component.css'
})
export class ResultadosPracticaComponent implements OnInit, AfterViewInit {
  private readonly _dataUserService = inject(AuthStateService);
  private readonly _dashboardService = inject(DashboardService);
  dataUser?: PayloadInterface | null
  filtroForm: FormGroup;
  reporteForm: FormGroup;
  reporteSemestralForm: FormGroup;
  listaRutas: string[] = [];
  errorMessage: string | null = null; // Manejo de errores

  @ViewChild('barChart', { static: false }) barChart!: ElementRef<HTMLCanvasElement>;
  // Datos para el gráfico
  datosGrafico: any = null; // Configuración para el gráfico

  datosConteoPractica!: ConteoPracticas;
  datosConteoPracticaInformesByMes!: ConteoPorMes;

  cargando = false;
  anios = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i); // Últimos 10 años
  meses = [
    { nombre: 'enero', valor: 1 },
    { nombre: 'febrero', valor: 2 },
    { nombre: 'marzo', valor: 3 },
    { nombre: 'abril', valor: 4 },
    { nombre: 'mayo', valor: 5 },
    { nombre: 'junio', valor: 6 },
    { nombre: 'julio', valor: 7 },
    { nombre: 'agosto', valor: 8 },
    { nombre: 'septiembre', valor: 9 },
    { nombre: 'octubre', valor: 10 },
    { nombre: 'noviembre', valor: 11 },
    { nombre: 'diciembre', valor: 12 },
  ];
  ngOnInit(): void {
    this.getData();
    this.obtenerDatosConteo();
    this.obtenerDatosInformeByMes();
  }

  ngAfterViewInit(): void {
    if (this.datosGrafico) {
      this.initBarChart(); // Inicializar el gráfico después de que el ViewChild esté disponible
    }
  }
  private getData() {
    this.dataUser = this._dataUserService.getData();
  }


  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      anio: [new Date().getFullYear(), Validators.required],
      tipoPractica: ['PRACTICA_UNO', [Validators.required, this.validarTipoPractica()]], // Validación personalizada
      mes: [new Date().getMonth() + 1, Validators.required],
    });

    this.reporteSemestralForm = this.fb.group(
      {
        practica: [TipoPractica.PRACTICA_UNO, [Validators.required]],
        fecha_in: ['', [Validators.required]],
        fecha_fin: ['', [Validators.required]],
      },
      {
        validators: this.validarFechas('fecha_in', 'fecha_fin'),
      }
    );

    this.reporteForm = this.fb.group({
      fecha_ini: ['', Validators.required],
      fecha_fin: ['', Validators.required],
    });

  }

  validarTipoPractica(): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const validValues = Object.values(TipoPractica);
      if (!validValues.includes(control.value)) {
        return { tipoPracticaInvalida: true }; // Retorna un error si no es válido
      }
      return null; // Válido
    };
  }

  validarFechas(fechaInicioKey: string, fechaFinKey: string) {
    return (formGroup: FormGroup) => {
      const fechaInicio = formGroup.get(fechaInicioKey)?.value;
      const fechaFin = formGroup.get(fechaFinKey)?.value;

      if (fechaInicio && fechaFin && new Date(fechaInicio) > new Date(fechaFin)) {
        formGroup.get(fechaFinKey)?.setErrors({ fechaInvalida: true });
      } else {
        formGroup.get(fechaFinKey)?.setErrors(null);
      }
    };
  }

  obtenerRutasSecretaria(): void {
    this.cargando = true;
    const { anio, tipoPractica, mes } = this.filtroForm.value;
    const mesNombre = this.meses.find((m) => m.valor === mes)?.nombre;

    this._dashboardService.obtenerReportesByYearyPractica(tipoPractica, anio, mesNombre!).subscribe({
      next: (rutas: any) => {
        this.listaRutas = rutas;
        console.log(rutas);
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error al obtener rutas:', error);
        this.listaRutas = [];
        this.cargando = false;
      },
    });
  }

  formatDescripcion(ruta: string): string {
    // Ejemplo de ruta: /reportes/practica-uno/2025/semanal/enero/reporte_semana_1.xlsx
    const parts = ruta.split('/');
    const tipoPractica = parts[2].replace('practica-', 'Práctica ').toUpperCase();
    const year = parts[3];
    const mes = parts[5];
    const semana = parts[6]?.match(/\d+/)?.[0]; // Extrae el número de semana

    return `Reporte del ${year}, mes de ${mes}, semana ${semana}`;
  }

  descargarArchivo(ruta: string): void {
    this._dashboardService.reportesArchivosExcelDescargar(ruta);
  }

  generarReporteSemestral(): void {
    if (this.reporteSemestralForm.valid) {
      // Obtén los valores del formulario
      const { practica, fecha_in, fecha_fin } = this.reporteSemestralForm.value;


      // Llama al servicio con los datos corregidos
      this._dashboardService.obtenerReporteSemestral(practica, fecha_in, fecha_fin)
    }
  }

  generarReporteConfidencial(): void {
    if (this.reporteForm.valid) {
      const { fecha_ini, fecha_fin } = this.reporteForm.value;
      this._dashboardService.generarReporteConfidencialPorPeriodo(new Date(fecha_ini) + '', new Date(fecha_fin) + '').subscribe({
        next: (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const link = document.createElement('a');
          link.href = url;
          link.download = `reporte_confidencial_${fecha_ini}_to_${fecha_fin}.xlsx`;
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          console.error('Error al generar el reporte confidencial:', error);
        },
      });
    } else {
      console.error('Formulario inválido');
    }
  }

  public obtenerDatosConteo() {
    this._dashboardService.obtenerDatosConteoPractica(this.dataUser?.id_usuario!).subscribe({
      next: (data) => {
        this.datosConteoPractica = data; // Asignar los datos a la variable
        this.errorMessage = null; // Limpiar mensajes de error
      },
      error: (error) => {
        console.error('Error al obtener el conteo de prácticas:', error);
        this.errorMessage = 'No se pudieron cargar los datos del conteo.'; // Mostrar mensaje de error
      },
    });
  }
  obtenerDatosInformeByMes(): void {
    this._dashboardService.obtenerInformesPorMesPractica(this.dataUser?.id_usuario!).subscribe({
      next: (data) => {
        this.datosConteoPracticaInformesByMes = data;
        this.procesarDatosParaGrafico();
        if (this.barChart) {
          this.initBarChart(); // Inicializar el gráfico si el elemento ya está disponible
        }
      },
      error: (error) => {
        console.error('Error al obtener los datos del conteo:', error);
      },
    });
  }


  private procesarDatosParaGrafico(): void {
    // Meses definidos
    const meses: (keyof ConteoPorMes)[] = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    ];

    // Crear los datos para las prácticas
    const dataPracticaUno = meses.map((mes) => this.datosConteoPracticaInformesByMes[mes]?.PRACTICA_UNO || 0);
    const dataPracticaDos = meses.map((mes) => this.datosConteoPracticaInformesByMes[mes]?.PRACTICA_DOS || 0);

    // Configurar los datos del gráfico
    this.datosGrafico = {
        labels: meses.map((mes) => mes.charAt(0).toUpperCase() + mes.slice(1)), // Capitalizar los nombres de los meses
        datasets: [
            {
                label: 'Práctica Uno',
                data: dataPracticaUno,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Práctica Dos',
                data: dataPracticaDos,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };
  }

  private initBarChart() {
    const ctx = this.barChart.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: this.datosGrafico,
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

}

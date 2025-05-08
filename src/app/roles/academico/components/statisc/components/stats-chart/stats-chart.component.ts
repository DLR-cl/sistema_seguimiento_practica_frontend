import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
import type { ConteoPorMes } from '../../../../../../shared/interface/reporte-practica.interface';

@Component({
  selector: 'app-stats-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-800 dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
      <h3 class="text-xl font-bold text-blue-900 dark:text-blue-200 mb-6 border-b pb-2">{{ title }}</h3>
      <div class="h-[400px]">
        <canvas #barChart class="w-full h-full"></canvas>
      </div>
    </div>
  `,
  styles: []
})
export class StatsChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('barChart', { static: false }) barChart!: ElementRef<HTMLCanvasElement>;
  @Input() title: string = 'Informes Entregados por Mes';
  @Input() data: ConteoPorMes | null = null;

  private chartInstance: Chart | null = null;

  ngAfterViewInit(): void {
    if (this.data) {
      this.initializeChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange && this.barChart) {
      this.initializeChart();
    }
  }

  private initializeChart(): void {
    if (!this.barChart || !this.data) return;

    const chartData = this.prepareChartData();
    if (chartData) {
      this.createChart(chartData);
    }
  }

  private prepareChartData() {
    const meses: (keyof ConteoPorMes)[] = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    ];

    if (!this.data) return null;

    return {
      labels: meses.map(mes => mes.charAt(0).toUpperCase() + mes.slice(1)),
      datasets: [
        {
          label: 'Práctica Uno',
          data: meses.map(mes => this.data![mes]?.PRACTICA_UNO || 0),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Práctica Dos',
          data: meses.map(mes => this.data![mes]?.PRACTICA_DOS || 0),
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  }

  private createChart(chartData: any): void {
    if (!chartData || !this.barChart) return;

    const ctx = this.barChart.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: {
                size: 14,
                weight: 'bold'
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 13
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              font: {
                size: 12
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 12
              }
            }
          }
        }
      }
    });
  }
} 
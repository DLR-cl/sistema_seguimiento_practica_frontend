import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Stats {
  PRACTICA_UNO?: number;
  PRACTICA_DOS?: number;
}

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700 hover:shadow-2xl transition-shadow duration-300">
      <h3 class="text-xl font-bold mb-4" [ngClass]="{
        'text-green-600 dark:text-green-400': type === 'success',
        'text-red-600 dark:text-red-400': type === 'error'
      }">{{ title }}</h3>
      
      <div class="grid grid-cols-2 gap-4">
        <div class="text-center p-4 rounded-lg" [ngClass]="{
          'bg-green-50 dark:bg-green-900/20': type === 'success',
          'bg-red-50 dark:bg-red-900/20': type === 'error'
        }">
          <p class="text-3xl font-bold mb-1" [ngClass]="{
            'text-green-700 dark:text-green-300': type === 'success',
            'text-red-700 dark:text-red-300': type === 'error'
          }">{{ stats?.PRACTICA_UNO ?? 0 }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Práctica Uno</p>
        </div>
        
        <div class="text-center p-4 rounded-lg" [ngClass]="{
          'bg-green-50 dark:bg-green-900/20': type === 'success',
          'bg-red-50 dark:bg-red-900/20': type === 'error'
        }">
          <p class="text-3xl font-bold mb-1" [ngClass]="{
            'text-green-700 dark:text-green-300': type === 'success',
            'text-red-700 dark:text-red-300': type === 'error'
          }">{{ stats?.PRACTICA_DOS ?? 0 }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Práctica Dos</p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class StatsCardComponent {
  @Input() title: string = '';
  @Input() stats: Stats | null = null;
  @Input() type: 'success' | 'error' = 'success';
} 
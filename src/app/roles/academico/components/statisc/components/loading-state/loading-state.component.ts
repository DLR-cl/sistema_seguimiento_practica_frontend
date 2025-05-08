import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col  bg-gray-800 items-center justify-center p-8 space-y-4">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p class="text-gray-600 dark:text-gray-300 text-lg">{{ message }}</p>
    </div>
  `,
  styles: []
})
export class LoadingStateComponent {
  @Input() message: string = 'Cargando estadísticas...';
} 
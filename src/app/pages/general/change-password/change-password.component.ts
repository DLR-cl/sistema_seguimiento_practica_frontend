import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div class="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">Cambia tu Contraseña</h1>
        <form [formGroup]="changePasswordForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <!-- Contraseña actual -->
          <div>
            <label for="oldPassword" class="block text-sm font-medium text-gray-700">Contraseña Actual</label>
            <input 
              id="oldPassword" 
              type="password" 
              formControlName="oldPassword" 
              placeholder="••••••••" 
              class="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </div>

          <!-- Nueva contraseña -->
          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
            <input 
              id="newPassword" 
              type="password" 
              formControlName="newPassword" 
              placeholder="••••••••" 
              class="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </div>

          <!-- Botón de cambiar contraseña -->
          <button 
            type="submit" 
            [disabled]="changePasswordForm.invalid" 
            class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Cambiar Contraseña
          </button>
        </form>

        <!-- Mensajes dinámicos -->
        <p *ngIf="errorMessage" class="text-sm text-red-500 mt-4 text-center">
          {{ errorMessage }}
        </p>
        <p *ngIf="successMessage" class="text-sm text-green-500 mt-4 text-center">
          {{ successMessage }}
        </p>
      </div>
    </div>
  `,
  styles: [],
})
export class ChangePasswordComponent {
  // Formulario reactivo
  changePasswordForm = this.fb.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
  });

  // Variables para mensajes de retroalimentación
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.changePasswordForm.valid) {
      this.http.patch('/api/users/change-password', this.changePasswordForm.value).subscribe({
        next: () => {
          this.successMessage = 'Contraseña actualizada con éxito.';
          this.errorMessage = '';

          // Redirigir después de un tiempo
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        },
        error: (err) => {
          this.successMessage = '';
          this.errorMessage = err.error?.message || 'Error al cambiar contraseña';
        },
      });
    }
  }
}

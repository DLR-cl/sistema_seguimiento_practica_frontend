import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { enviroment } from '../../../environment/environment';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  changePasswordForm: FormGroup;
  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  errorMessage = '';
  successMessage = '';

  cargando: boolean = false;

  imagenFondo: string = '/departamento_ici/transicion_6.webp';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: [
        '',
        [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)],
      ],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordsMatchValidator });
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'oldPassword') {
      this.showOldPassword = !this.showOldPassword;
    } else if (field === 'newPassword') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  passwordsMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  private getUserIdFromToken(): string | null {
    // Obtener la sesión del localStorage
    const session = localStorage.getItem('session');
    if (!session) return null;
  
    try {
      // Parsear la sesión y obtener el token
      const parsedSession = JSON.parse(session);
      const token = parsedSession.access_token;
      if (!token) return null;
  
      // Decodificar el token y obtener el ID del usuario
      const decodedToken: any = jwtDecode(token);
      return decodedToken?.id || null;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  onSubmit() {
    this.cargando = true;
    if (this.changePasswordForm.valid) {
      // Obtener la sesión completa desde localStorage
      const sessionString = localStorage.getItem('session');
      if (!sessionString) {
        this.errorMessage = 'No se pudo autenticar al usuario. Por favor, inicia sesión nuevamente.';
        this.cargando = false;
        return;
      }
  
      try {
        // Parsear la sesión y extraer el token
        const session = JSON.parse(sessionString);
        const token = session.access_token;
        if (!token) {
          this.errorMessage = 'Token de acceso no encontrado. Por favor, inicia sesión nuevamente.';
          this.cargando = false;
          return;
        }
  
        const requestData = {
          ...this.changePasswordForm.value, // Datos del formulario
        };
  
        const headers = { Authorization: `Bearer ${token}` }; // Encabezado con el token
  
        // Realizar la petición al backend
        this.http
          .patch(`${enviroment.API_URL}/users/change-password`, requestData, { headers })
          .subscribe({
            next: () => {
              this.successMessage = 'Contraseña actualizada con éxito.';
              this.errorMessage = '';
              this.cargando = false;
              setTimeout(() => {
                this.router.navigate(['/home']);
              }, 2000);
            },
            error: (err) => {
              this.successMessage = '';
              this.cargando = false;
              this.errorMessage = err.error?.message || 'Error al cambiar contraseña.';
            },
          });
      } catch (error) {
        console.error('Error al procesar la sesión:', error);
        this.cargando = false;
        this.errorMessage = 'Error al procesar los datos de la sesión. Por favor, inicia sesión nuevamente.';
      }
    }
  }
  
  
}
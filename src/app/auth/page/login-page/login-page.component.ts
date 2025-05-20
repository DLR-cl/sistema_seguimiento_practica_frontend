import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);
  private readonly authState = inject(AuthStateService);

  ngOnInit(): void {
    this.cargarImagenFondo();
  }

  imagenFondo: string = '/departamento_ici/transicion_5.webp';
  imagenCargada = signal<boolean>(false);
  showPassword = signal<boolean>(false);
  errorMessage: string | null = null;
  cargandoLogin = signal<boolean>(false);

  loginForm = this.formBuilder.group({
    email: this.formBuilder.nonNullable.control('', [
      Validators.email,
      Validators.required,
    ]),
    password: this.formBuilder.nonNullable.control('', Validators.required),
  });

  cargarImagenFondo() {
    const img = new Image();
    img.src = this.imagenFondo;
    img.onload = () => {
      this.imagenCargada.set(true);
    };
    img.onerror = () => {
      console.error('Error al cargar la imagen de fondo');
      this.imagenCargada.set(true); // Mostrar el contenido aunque falle la carga
    };
  }

  togglePasswordVisibility() {
    this.showPassword.update((current: boolean): boolean => !current);
  }

  submit() {
    if (this.loginForm.invalid) {
      this.mostrarError('Por favor, complete todos los campos correctamente');
      return;
    }

    this.cargandoLogin.set(true);
    const { email, password } = this.loginForm.getRawValue();

    this.authService.logIn(email!, password!).subscribe({
      next: (response: any) => {
        console.log('Login exitoso:', response);
        this.authService.refreshDecodedToken();
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Éxito', 
          detail: 'Inicio de sesión exitoso.',
          life: 3000
        });

        this.cargandoLogin.set(false);

        if (response.primerInicioSesion) {
          this.router.navigate(['/app/cambiar-clave']).then(success => {
            if (!success) {
              console.error('Error al navegar a cambiar-clave');
              this.router.navigate(['/public']);
            }
          });
        } else {
          this.router.navigate([`/app/menu`]).then(success => {
            if (!success) {
              console.error('Error al navegar a la ruta específica del rol');
              this.router.navigate(['/app/menu']);
            }
          });
        }
      },
      error: (error: any) => {
        this.mostrarError(error.error?.message || 'Error en el inicio de sesión');
        this.cargandoLogin.set(false);
        console.error('Error en el inicio de sesión:', error);
      },
    });
  }

  private mostrarError(mensaje: string) {
    this.errorMessage = mensaje;
    this.messageService.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: mensaje,
      life: 5000
    });
  }

  goToHome() {
    this.router.navigate(['/public']).then(success => {
      if (!success) {
        console.error('Error al navegar a home');
      }
    });
  }
}

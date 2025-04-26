import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private authState: AuthStateService,

  ) { }

  ngOnInit(): void {
  }

  imagenFondo: string = '/departamento_ici/transicion_5.webp';
  showPassword = signal<boolean>(false);
  errorMessage: string | null = null;
  backgroundImage: string = '';

  cargandoLogin = signal<boolean>(false);

  loginForm = this.formBuilder.group({
    email: this.formBuilder.nonNullable.control('', [
      Validators.email,
      Validators.required,
    ]),
    password: this.formBuilder.nonNullable.control('', Validators.required),
  });

  togglePasswordVisibility() {
    this.showPassword.update((current: boolean): boolean => !current);
  }

  submit() {
    this.cargandoLogin.set(true);
    if (this.loginForm.invalid) {
      this.errorMessage = 'Ingrese los datos requeridos';
      return;
    }

    const { email, password } = this.loginForm.getRawValue();

    this.authService.logIn(email!, password!).subscribe({
      next: (response: any) => {
        console.log('Login exitoso:', response);

        // Asegúrate de que el token esté listo antes de redirigir
        this.authService.refreshDecodedToken();

        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Inicio de sesión exitoso.' });

        this.cargandoLogin.set(false);

        if (response.primerInicioSesion) {
          this.router.navigate(['/change-password']); // Redirige al cambio de contraseña
        } else {
          // Redirige según el rol del usuario
          setTimeout(() => {
            this.router.navigate([this.authService.getRedirectUrlByRole(this.authState.getRole())]);
          }, 50); // Retraso opcional
        }
      },
      error: (error: any) => {
        this.errorMessage = error.error?.message || 'Error en el inicio de sesión.';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Ocurrió un error al iniciar sesión: ${error.message}` });
        this.cargandoLogin.set(false);
        console.error('Error en el inicio de sesión:', error);
      },
    });
  }

}

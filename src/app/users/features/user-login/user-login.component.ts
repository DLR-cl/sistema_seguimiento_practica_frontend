import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { ImagePreloaderService } from '../../../core/services/image-preloader.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'] // Cambiado a styleUrls para corregir el typo
})
export class UserLoginComponent implements OnInit {

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private readonly _authService: AuthService
  ) {}

  ngOnInit(): void {
  }

  imagenFondo: string = '/departamento_ici/transicion_5.webp';
  showPassword: boolean = false;
  errorMessage: string | null = null;
  backgroundImage: string = '';


  loginForm = this._formBuilder.group({
    email: this._formBuilder.nonNullable.control('', [
      Validators.email,
      Validators.required,
    ]),
    password: this._formBuilder.nonNullable.control('', Validators.required),
  });

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Ingrese los datos requeridos';
      return;
    }
  
    const { email, password } = this.loginForm.getRawValue();
  
    this._authService.logIn(email!, password!).subscribe({
      next: (response: any) => {
        console.log('Login exitoso:', response);
  
        // Asegúrate de que el token esté listo antes de redirigir
        this._authService.refreshDecodedToken();
  
        if (response.primerInicioSesion) {
          this.router.navigate(['/change-password']); // Redirige al cambio de contraseña
        } else {
          // Redirige según el rol del usuario
          setTimeout(() => {
            this._authService.redirectUserByRol();
          }, 50); // Retraso opcional
        }
      },
      error: (error: any) => {
        this.errorMessage = error.error?.message || 'Error en el inicio de sesión.';
        console.error('Error en el inicio de sesión:', error);
      },
    });
  }
  
  goToHome() {
    this.router.navigate(['/home']);  // Cambia 'home' por la ruta adecuada si es necesario
  }
}

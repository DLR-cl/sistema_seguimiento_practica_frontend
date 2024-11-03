import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from './interface/login-form';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private readonly _authService: AuthService
  ){
  }

  showPassword: boolean = false;
  errorMessage: string | null = null;

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
  submit(){
    if(this.loginForm.invalid){
      this.errorMessage = 'Ingrese los datos requeridos';
      return;
    }

    const {email, password} = this.loginForm.getRawValue();

    this._authService.logIn(email, password).subscribe({
      next: (response: any) => {},
      error: (error: any) => {
        this.errorMessage = error.message;
      },
    });
    ;
    
  }

} 

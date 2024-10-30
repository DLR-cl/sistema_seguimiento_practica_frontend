import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from './interface/login-form';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule],
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

  loginForm = this._formBuilder.group({
    email: this._formBuilder.nonNullable.control('', [
      Validators.email,
      Validators.required,
    ]),
    password: this._formBuilder.nonNullable.control('', Validators.required),
  });

  submit(){
    if(this.loginForm.invalid){
      console.log("ta malo");
    }

    const {email, password} = this.loginForm.getRawValue();

    this._authService.login(email, password).subscribe({
      next: (response: any) => console.log(response),
      error: (error: any) => console.log(error),
    });
  }

} 

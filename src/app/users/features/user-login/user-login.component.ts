import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  constructor(private router: Router){
    const password = "hola";
    const correo = "tomas@gmail.com"
  }

  toHome(){
    this.router.navigate(['/home']);
  }
} 

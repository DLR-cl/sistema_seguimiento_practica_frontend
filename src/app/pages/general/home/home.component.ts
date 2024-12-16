import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imageUrls = [
    'departamento_ici/transicion_1.webp',
    'departamento_ici/transicion_2.webp',
    'departamento_ici/laboratorio_ici.webp',
    'departamento_ici/transicion_4.webp',
    'departamento_ici/transicion_5.webp',
    'departamento_ici/transicion_6.webp'
  ];

  currentImageIndex: number = 0;
  intervalId: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startImageRotation();
  }

  startImageRotation(): void {
    this.intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
    }, 4000); // Cambiar cada 4 segundos
  }

  toLogin(): void {
    this.router.navigate(['login']);
  }

  toLetter(): void {
    this.router.navigate(['solicitar-practicante']);
  }
}

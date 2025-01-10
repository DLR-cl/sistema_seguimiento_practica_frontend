import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImagePreloaderService } from './images-preloader.service';

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
  isImagesLoaded: boolean = false;

  constructor(private router: Router,  private imagePreloader: ImagePreloaderService) {}

  ngOnInit(): void {
    this.imagePreloader
      .preload(this.imageUrls)
      .then(() => {
        this.isImagesLoaded = true;
        this.startImageRotation();
      })
      .catch((err) => console.error('Error loading images', err));
  }

  startImageRotation(): void {
    this.intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
    }, 4000); // Cambiar cada 4 segundos
  }
  
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  toLogin(): void {
    this.router.navigate(['login']);
  }

  toLetter(): void {
    this.router.navigate(['solicitar-practicante']);
  }
}

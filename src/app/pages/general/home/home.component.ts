import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImagePreloaderService } from './images-preloader.service';
import { ImageloadService } from './services/imageload.service';
import { HomeChargeContentComponent } from "./home-charge-content/home-charge-content.component";
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HomeChargeContentComponent, RouterLink],
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

  isSolicitarPracticanteActive = signal(false);
  currentImageIndex: number = 0;
  intervalId: any;
  isImagesLoaded: boolean = false;

  constructor(
    private router: Router,  
    private imagePreloader: ImagePreloaderService,
    private imageLoadService: ImageloadService,
  ) {}

  ngOnInit(): void {
    this.imagePreloader
      .preload(this.imageUrls)
      .then(() => {
        this.imageLoadService.setImagesLoaded(false);
        this.isImagesLoaded = true;
        this.imageLoadService.setImagesLoaded(true);
        this.startImageRotation();
      })
      .catch((err) => console.error('Error loading images', err));

  }

  startImageRotation(): void {
    this.intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
    }, 4000);
  }
  
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  toLogin(): void {
    this.router.navigate(['/login']);
  }

  toLetter(): void {
    this.router.navigate(['/solicitar-practicante']);
  }
}

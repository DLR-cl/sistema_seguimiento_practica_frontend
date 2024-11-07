import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../roles/jefe_compartido/header-jefes/header.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImagePreloaderService } from '../../../core/services/image-preloader.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  imageUrls =[
    'departamento_ici/transicion_1.webp',
    'departamento_ici/transicion_2.webp',
    'departamento_ici/laboratorio_ici.webp',
    'departamento_ici/transicion_4.webp',
    'departamento_ici/transicion_5.webp',
    'departamento_ici/transicion_6.webp'
  ]

  private imagePreloaderService= inject(ImagePreloaderService);

  private _router = inject(Router);
  imagesLoaded = false;

  ngOnInit(): void {
    this.imagePreloaderService.preloadImages(this.imageUrls).then(() => {
      this.imagesLoaded = true;
    });
  }


  toLogin(){
    this._router.navigate(['login']);
  }
  
}

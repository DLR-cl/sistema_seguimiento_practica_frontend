import { Component, inject } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ImageloadService } from '../services/imageload.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-charge-content',
  standalone: true,
  imports: [NgxSpinnerModule, CommonModule],
  template: `
  <ngx-spinner
      bdColor="rgba(0, 0, 0, 0.8)"
      size="large"
      color="#fff"
      type="ball-scale-ripple"
      [fullScreen]="true"
      *ngIf="!imagesLoaded()"
    >
      <p style="color: white"> Loading... </p>
    </ngx-spinner>
  `,
  styleUrl: './home-charge-content.component.css'
})
export class HomeChargeContentComponent {
  imageLoadService = inject(ImageloadService);
  imagesLoaded = this.imageLoadService.imagesLoaded;
}

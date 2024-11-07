import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagePreloaderService {
  preloadImages(imageUrls: string[]): Promise<void[]> {
    const imagePromises = imageUrls.map((url) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve();
        img.onerror = () => resolve();  // Ignorar errores de carga
      });
    });
    return Promise.all(imagePromises);
  }
}

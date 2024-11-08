import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagePreloaderService {
  private imageCache = new Map<string, HTMLImageElement>();
  private cacheSubject = new BehaviorSubject<Map<string, HTMLImageElement> | null>(null);

  preloadImages(imageUrls: string[]): Observable<Map<string, HTMLImageElement>> {
    const imagePromises = imageUrls.map((url) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          this.imageCache.set(url, img);
          resolve();
        };
        img.onerror = () => resolve();  // Ignorar errores de carga
      });
    });

    Promise.all(imagePromises).then(() => {
      this.cacheSubject.next(this.imageCache); // Emite el Map cuando todas las imágenes están cargadas
    });

    return this.cacheSubject.asObservable() as Observable<Map<string, HTMLImageElement>>;
  }
}

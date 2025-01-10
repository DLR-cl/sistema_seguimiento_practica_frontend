import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagePreloaderService {
  preload(images: string[]): Promise<void[]> {
    return Promise.all(
      images.map((image) =>
        new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.src = image;
          img.onload = () => resolve();
          img.onerror = () => reject();
        })
      )
    );
  }
}

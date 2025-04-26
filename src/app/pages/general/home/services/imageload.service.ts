import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageloadService {
  imagesLoaded = signal(false);

  constructor() { }

  setImagesLoaded(loaded: boolean): void {
    console.log('Hola Soy el loaded')
    this.imagesLoaded.set(loaded);
  }
}

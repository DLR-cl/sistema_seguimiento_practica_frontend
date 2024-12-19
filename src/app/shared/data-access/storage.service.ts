import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage = localStorage;

  constructor() {}

  // Obtiene un valor desde el almacenamiento
  get<T>(tokenKey: string): { message: string, access_token: string, primerInicioSesion: boolean} | null {
    const value = this._storage.getItem(tokenKey);
  
    if (!value) return null;
  
    try {
      return JSON.parse(value) as { message: string, access_token: string, primerInicioSesion: boolean};
    } catch (error) {
      console.error(`Error al parsear el valor de la clave '${tokenKey}':`, error);
      return null;
    }
  }
  
  set(tokenKey: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      this._storage.setItem(tokenKey, serializedValue);
    } catch (error) {
      console.error(`Error al guardar el valor para la clave '${tokenKey}':`, error);
    }
  }
  
  // Elimina un valor del almacenamiento
  remove(tokenKey: string): void {
    try {
      this._storage.removeItem(tokenKey);
    } catch (error) {
      console.error(`Error al eliminar la clave '${tokenKey}':`, error);
    }
  }
}

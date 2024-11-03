import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage = localStorage;
  constructor() { }

  get<T>(tokenKey: string): T | null {
    const value = this._storage.getItem(tokenKey);
    if(!value) return null;

    return JSON.parse(value) as T;
  };


  set(tokenKey: string, value: string){
    this._storage.setItem(tokenKey, value);
  }

  remove(tokenKey: string){
    this._storage.removeItem(tokenKey);
  }
}

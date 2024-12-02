import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  private readonly _htpp = inject(HttpClient);
  public asignarInforme() {
    
  }

}

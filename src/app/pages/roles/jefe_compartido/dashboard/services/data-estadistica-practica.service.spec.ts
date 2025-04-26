import { TestBed } from '@angular/core/testing';

import { DataEstadisticaPracticaService } from './data-estadistica-practica.service';

describe('DataEstadisticaPracticaService', () => {
  let service: DataEstadisticaPracticaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataEstadisticaPracticaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

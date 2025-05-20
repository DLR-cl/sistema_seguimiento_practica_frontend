import { TestBed } from '@angular/core/testing';

import { DataEstadisticaService } from './data-estadistica.service';

describe('DataEstadisticaService', () => {
  let service: DataEstadisticaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataEstadisticaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

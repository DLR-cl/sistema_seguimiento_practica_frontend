import { TestBed } from '@angular/core/testing';

import { GestionReportesService } from './gestion-reportes.service';

describe('GestionReportesService', () => {
  let service: GestionReportesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionReportesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteRespuestasConfidencialComponent } from './reporte-respuestas-confidencial.component';

describe('ReporteRespuestasConfidencialComponent', () => {
  let component: ReporteRespuestasConfidencialComponent;
  let fixture: ComponentFixture<ReporteRespuestasConfidencialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteRespuestasConfidencialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteRespuestasConfidencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

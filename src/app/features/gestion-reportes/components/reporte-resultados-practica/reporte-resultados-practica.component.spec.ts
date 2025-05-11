import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteResultadosPracticaComponent } from './reporte-resultados-practica.component';

describe('ReporteResultadosPracticaComponent', () => {
  let component: ReporteResultadosPracticaComponent;
  let fixture: ComponentFixture<ReporteResultadosPracticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteResultadosPracticaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteResultadosPracticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

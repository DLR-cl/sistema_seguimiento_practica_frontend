import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTablaEstadisticasPracticasComponent } from './dashboard-tabla-estadisticas-practicas.component';

describe('DashboardTablaEstadisticasPracticasComponent', () => {
  let component: DashboardTablaEstadisticasPracticasComponent;
  let fixture: ComponentFixture<DashboardTablaEstadisticasPracticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTablaEstadisticasPracticasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTablaEstadisticasPracticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

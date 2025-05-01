import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCantidadEstudiantesPracticasComponent } from './dashboard-cantidad-estudiantes-practicas.component';

describe('DashboardCantidadEstudiantesPracticasComponent', () => {
  let component: DashboardCantidadEstudiantesPracticasComponent;
  let fixture: ComponentFixture<DashboardCantidadEstudiantesPracticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCantidadEstudiantesPracticasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCantidadEstudiantesPracticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

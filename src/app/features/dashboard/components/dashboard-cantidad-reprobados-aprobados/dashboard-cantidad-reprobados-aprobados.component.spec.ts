import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCantidadReprobadosAprobadosComponent } from './dashboard-cantidad-reprobados-aprobados.component';

describe('DashboardCantidadReprobadosAprobadosComponent', () => {
  let component: DashboardCantidadReprobadosAprobadosComponent;
  let fixture: ComponentFixture<DashboardCantidadReprobadosAprobadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCantidadReprobadosAprobadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCantidadReprobadosAprobadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

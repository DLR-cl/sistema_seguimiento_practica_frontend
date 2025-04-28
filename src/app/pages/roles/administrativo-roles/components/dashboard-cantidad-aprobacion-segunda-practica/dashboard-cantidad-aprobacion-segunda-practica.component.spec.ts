import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCantidadAprobacionSegundaPracticaComponent } from './dashboard-cantidad-aprobacion-segunda-practica.component';

describe('DashboardCantidadAprobacionSegundaPracticaComponent', () => {
  let component: DashboardCantidadAprobacionSegundaPracticaComponent;
  let fixture: ComponentFixture<DashboardCantidadAprobacionSegundaPracticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCantidadAprobacionSegundaPracticaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCantidadAprobacionSegundaPracticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

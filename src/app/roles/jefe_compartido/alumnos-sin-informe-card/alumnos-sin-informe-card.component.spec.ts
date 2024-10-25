import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosSinInformeCardComponent } from './alumnos-sin-informe-card.component';

describe('AlumnosSinInformeCardComponent', () => {
  let component: AlumnosSinInformeCardComponent;
  let fixture: ComponentFixture<AlumnosSinInformeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnosSinInformeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnosSinInformeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

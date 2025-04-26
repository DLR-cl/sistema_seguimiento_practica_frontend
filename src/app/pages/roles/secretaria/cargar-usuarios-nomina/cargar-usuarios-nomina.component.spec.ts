import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarUsuariosNominaComponent } from './cargar-usuarios-nomina.component';

describe('CargarUsuariosNominaComponent', () => {
  let component: CargarUsuariosNominaComponent;
  let fixture: ComponentFixture<CargarUsuariosNominaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarUsuariosNominaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarUsuariosNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

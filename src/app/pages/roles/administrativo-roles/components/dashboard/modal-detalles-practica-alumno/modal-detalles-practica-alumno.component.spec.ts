import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallesPracticaAlumnoComponent } from './modal-detalles-practica-alumno.component';

describe('ModalDetallesPracticaAlumnoComponent', () => {
  let component: ModalDetallesPracticaAlumnoComponent;
  let fixture: ComponentFixture<ModalDetallesPracticaAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDetallesPracticaAlumnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetallesPracticaAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

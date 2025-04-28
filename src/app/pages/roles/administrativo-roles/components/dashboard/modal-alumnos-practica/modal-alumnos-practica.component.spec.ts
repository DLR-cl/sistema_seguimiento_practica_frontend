import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlumnosPracticaComponent } from './modal-alumnos-practica.component';

describe('ModalAlumnosPracticaComponent', () => {
  let component: ModalAlumnosPracticaComponent;
  let fixture: ComponentFixture<ModalAlumnosPracticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAlumnosPracticaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAlumnosPracticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

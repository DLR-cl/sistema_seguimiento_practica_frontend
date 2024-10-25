import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosEnPracticaCardComponent } from './alumnos-en-practica-card.component';

describe('AlumnosEnPracticaCardComponent', () => {
  let component: AlumnosEnPracticaCardComponent;
  let fixture: ComponentFixture<AlumnosEnPracticaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnosEnPracticaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnosEnPracticaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

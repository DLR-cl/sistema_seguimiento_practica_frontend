import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinInformeAlumnoComponent } from './fin-informe-alumno.component';

describe('FinInformeAlumnoComponent', () => {
  let component: FinInformeAlumnoComponent;
  let fixture: ComponentFixture<FinInformeAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinInformeAlumnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinInformeAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

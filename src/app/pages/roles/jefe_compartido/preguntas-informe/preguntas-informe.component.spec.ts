import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasInformeComponent } from './preguntas-informe.component';

describe('PreguntasInformeComponent', () => {
  let component: PreguntasInformeComponent;
  let fixture: ComponentFixture<PreguntasInformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreguntasInformeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreguntasInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

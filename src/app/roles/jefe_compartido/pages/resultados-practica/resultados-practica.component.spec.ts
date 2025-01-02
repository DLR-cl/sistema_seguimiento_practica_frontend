import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosPracticaComponent } from './resultados-practica.component';

describe('ResultadosPracticaComponent', () => {
  let component: ResultadosPracticaComponent;
  let fixture: ComponentFixture<ResultadosPracticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadosPracticaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosPracticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

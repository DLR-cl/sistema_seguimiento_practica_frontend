import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoPracticaComponent } from './resultado-practica.component';

describe('ResultadoPracticaComponent', () => {
  let component: ResultadoPracticaComponent;
  let fixture: ComponentFixture<ResultadoPracticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoPracticaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoPracticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

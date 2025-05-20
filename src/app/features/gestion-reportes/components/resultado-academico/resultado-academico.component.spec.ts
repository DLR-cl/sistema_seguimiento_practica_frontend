import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoAcademicoComponent } from './resultado-academico.component';

describe('ResultadoAcademicoComponent', () => {
  let component: ResultadoAcademicoComponent;
  let fixture: ComponentFixture<ResultadoAcademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoAcademicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeSegundaPracticaComponent } from './informe-segunda-practica.component';

describe('InformeSegundaPracticaComponent', () => {
  let component: InformeSegundaPracticaComponent;
  let fixture: ComponentFixture<InformeSegundaPracticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformeSegundaPracticaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeSegundaPracticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

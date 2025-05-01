import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformePrimeraPracticaComponent } from './informe-primera-practica.component';

describe('InformePrimeraPracticaComponent', () => {
  let component: InformePrimeraPracticaComponent;
  let fixture: ComponentFixture<InformePrimeraPracticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformePrimeraPracticaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformePrimeraPracticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

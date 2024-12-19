import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticasSecretariaComponent } from './practicas-secretaria.component';

describe('PracticasSecretariaComponent', () => {
  let component: PracticasSecretariaComponent;
  let fixture: ComponentFixture<PracticasSecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticasSecretariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticasSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

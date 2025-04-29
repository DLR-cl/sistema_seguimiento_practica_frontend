import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticasPageComponent } from './practicas-page.component';

describe('PracticasPageComponent', () => {
  let component: PracticasPageComponent;
  let fixture: ComponentFixture<PracticasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticasPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

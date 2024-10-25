import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentesSinInformesCardComponent } from './docentes-sin-informes-card.component';

describe('DocentesSinInformesCardComponent', () => {
  let component: DocentesSinInformesCardComponent;
  let fixture: ComponentFixture<DocentesSinInformesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocentesSinInformesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocentesSinInformesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

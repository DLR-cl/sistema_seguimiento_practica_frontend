import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesInformesComponent } from './detalles-informes.component';

describe('DetallesInformesComponent', () => {
  let component: DetallesInformesComponent;
  let fixture: ComponentFixture<DetallesInformesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesInformesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesInformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDatosJefeComponent } from './ver-datos-jefe.component';

describe('VerDatosJefeComponent', () => {
  let component: VerDatosJefeComponent;
  let fixture: ComponentFixture<VerDatosJefeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerDatosJefeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDatosJefeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaPracticaComponent } from './nueva-practica.component';

describe('NuevaPracticaComponent', () => {
  let component: NuevaPracticaComponent;
  let fixture: ComponentFixture<NuevaPracticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaPracticaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaPracticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

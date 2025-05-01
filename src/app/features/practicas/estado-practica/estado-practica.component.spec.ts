import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoPracticaComponent } from './estado-practica.component';

describe('EstadoPracticaComponent', () => {
  let component: EstadoPracticaComponent;
  let fixture: ComponentFixture<EstadoPracticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoPracticaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoPracticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

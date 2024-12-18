import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoAcademicosComponent } from './estado-academicos.component';

describe('EstadoAcademicosComponent', () => {
  let component: EstadoAcademicosComponent;
  let fixture: ComponentFixture<EstadoAcademicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoAcademicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoAcademicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

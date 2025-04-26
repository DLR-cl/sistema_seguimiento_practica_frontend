import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinInformeJefeEmpleadorComponent } from './fin-informe-jefe-empleador.component';

describe('FinInformeJefeEmpleadorComponent', () => {
  let component: FinInformeJefeEmpleadorComponent;
  let fixture: ComponentFixture<FinInformeJefeEmpleadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinInformeJefeEmpleadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinInformeJefeEmpleadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

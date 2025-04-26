import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderJefeEmpleadorComponent } from './header-jefe-empleador.component';

describe('HeaderJefeEmpleadorComponent', () => {
  let component: HeaderJefeEmpleadorComponent;
  let fixture: ComponentFixture<HeaderJefeEmpleadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderJefeEmpleadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderJefeEmpleadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

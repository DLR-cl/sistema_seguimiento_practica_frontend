import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeJefeEmpleadorComponent } from './home-jefe-empleador.component';

describe('HomeJefeEmpleadorComponent', () => {
  let component: HomeJefeEmpleadorComponent;
  let fixture: ComponentFixture<HomeJefeEmpleadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeJefeEmpleadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeJefeEmpleadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

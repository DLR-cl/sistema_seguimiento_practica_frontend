import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicNavbarComponent } from './academic-navbar.component';

describe('AcademicNavbarComponent', () => {
  let component: AcademicNavbarComponent;
  let fixture: ComponentFixture<AcademicNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

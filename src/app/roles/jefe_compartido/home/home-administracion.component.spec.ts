import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdministracionComponent } from './home-administracion.component';

describe('HomeAdministracionComponent', () => {
  let component: HomeAdministracionComponent;
  let fixture: ComponentFixture<HomeAdministracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAdministracionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

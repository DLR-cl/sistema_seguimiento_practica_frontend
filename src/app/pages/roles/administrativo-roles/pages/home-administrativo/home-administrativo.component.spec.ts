import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdministrativoComponent } from './home-administrativo.component';

describe('HomeAdministrativoComponent', () => {
  let component: HomeAdministrativoComponent;
  let fixture: ComponentFixture<HomeAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAdministrativoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

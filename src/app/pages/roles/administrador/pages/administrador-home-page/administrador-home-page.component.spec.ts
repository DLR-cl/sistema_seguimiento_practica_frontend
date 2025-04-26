import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorHomePageComponent } from './administrador-home-page.component';

describe('AdministradorHomePageComponent', () => {
  let component: AdministradorHomePageComponent;
  let fixture: ComponentFixture<AdministradorHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministradorHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradorHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

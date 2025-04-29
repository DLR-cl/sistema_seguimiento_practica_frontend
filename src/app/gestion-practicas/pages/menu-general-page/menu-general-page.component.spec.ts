import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGeneralPageComponent } from './menu-general-page.component';

describe('MenuGeneralPageComponent', () => {
  let component: MenuGeneralPageComponent;
  let fixture: ComponentFixture<MenuGeneralPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuGeneralPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuGeneralPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

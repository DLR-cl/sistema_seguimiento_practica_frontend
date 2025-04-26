import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChargeContentComponent } from './home-charge-content.component';

describe('HomeChargeContentComponent', () => {
  let component: HomeChargeContentComponent;
  let fixture: ComponentFixture<HomeChargeContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeChargeContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeChargeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

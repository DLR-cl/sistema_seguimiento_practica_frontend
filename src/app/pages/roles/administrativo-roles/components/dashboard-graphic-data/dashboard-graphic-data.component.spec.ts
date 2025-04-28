import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGraphicDataComponent } from './dashboard-graphic-data.component';

describe('DashboardGraphicDataComponent', () => {
  let component: DashboardGraphicDataComponent;
  let fixture: ComponentFixture<DashboardGraphicDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardGraphicDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardGraphicDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

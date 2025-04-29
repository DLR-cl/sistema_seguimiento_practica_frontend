import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasInfoPageComponent } from './mas-info-page.component';

describe('MasInfoPageComponent', () => {
  let component: MasInfoPageComponent;
  let fixture: ComponentFixture<MasInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasInfoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatiscComponent } from './statisc.component';

describe('StatiscComponent', () => {
  let component: StatiscComponent;
  let fixture: ComponentFixture<StatiscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatiscComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

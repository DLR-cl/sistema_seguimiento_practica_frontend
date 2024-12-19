import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenDataComponent } from './resumen-data.component';

describe('ResumenDataComponent', () => {
  let component: ResumenDataComponent;
  let fixture: ComponentFixture<ResumenDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

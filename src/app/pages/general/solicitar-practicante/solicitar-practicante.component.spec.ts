import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarPracticanteComponent } from './solicitar-practicante.component';

describe('SolicitarPracticanteComponent', () => {
  let component: SolicitarPracticanteComponent;
  let fixture: ComponentFixture<SolicitarPracticanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarPracticanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarPracticanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

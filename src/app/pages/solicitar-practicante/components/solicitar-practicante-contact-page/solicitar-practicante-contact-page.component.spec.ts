import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarPracticanteContactPageComponent } from './solicitar-practicante-contact-page.component';

describe('SolicitarPracticanteContactPageComponent', () => {
  let component: SolicitarPracticanteContactPageComponent;
  let fixture: ComponentFixture<SolicitarPracticanteContactPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarPracticanteContactPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarPracticanteContactPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

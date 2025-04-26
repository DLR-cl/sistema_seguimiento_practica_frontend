import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarPracticanteDocumentformatPageComponent } from './solicitar-practicante-documentformat-page.component';

describe('SolicitarPracticanteDocumentformatPageComponent', () => {
  let component: SolicitarPracticanteDocumentformatPageComponent;
  let fixture: ComponentFixture<SolicitarPracticanteDocumentformatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarPracticanteDocumentformatPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarPracticanteDocumentformatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

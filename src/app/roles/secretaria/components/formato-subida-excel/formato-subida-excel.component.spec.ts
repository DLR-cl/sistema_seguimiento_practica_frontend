import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatoSubidaExcelComponent } from './formato-subida-excel.component';

describe('FormatoSubidaExcelComponent', () => {
  let component: FormatoSubidaExcelComponent;
  let fixture: ComponentFixture<FormatoSubidaExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormatoSubidaExcelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormatoSubidaExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

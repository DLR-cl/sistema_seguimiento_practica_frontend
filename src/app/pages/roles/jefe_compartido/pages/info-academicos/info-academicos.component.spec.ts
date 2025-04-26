import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAcademicosComponent } from './info-academicos.component';

describe('InfoAcademicosComponent', () => {
  let component: InfoAcademicosComponent;
  let fixture: ComponentFixture<InfoAcademicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoAcademicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoAcademicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

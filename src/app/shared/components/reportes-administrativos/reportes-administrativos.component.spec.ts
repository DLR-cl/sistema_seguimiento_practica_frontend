import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesAdministrativosComponent } from './reportes-administrativos.component';

describe('ReportesAdministrativosComponent', () => {
  let component: ReportesAdministrativosComponent;
  let fixture: ComponentFixture<ReportesAdministrativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesAdministrativosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesAdministrativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

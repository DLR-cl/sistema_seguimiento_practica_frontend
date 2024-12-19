import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerInformesPendientesComponent } from './ver-informes-pendientes.component';

describe('VerInformesPendientesComponent', () => {
  let component: VerInformesPendientesComponent;
  let fixture: ComponentFixture<VerInformesPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerInformesPendientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerInformesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

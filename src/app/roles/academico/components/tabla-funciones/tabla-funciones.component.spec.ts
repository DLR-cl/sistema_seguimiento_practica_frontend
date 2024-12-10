import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaFuncionesComponent } from './tabla-funciones.component';

describe('TablaFuncionesComponent', () => {
  let component: TablaFuncionesComponent;
  let fixture: ComponentFixture<TablaFuncionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaFuncionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaFuncionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

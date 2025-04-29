import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarUsuariosPageComponent } from './gestionar-usuarios-page.component';

describe('GestionarUsuariosPageComponent', () => {
  let component: GestionarUsuariosPageComponent;
  let fixture: ComponentFixture<GestionarUsuariosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarUsuariosPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarUsuariosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

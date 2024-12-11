import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSecretariaComponent } from './header-secretaria.component';

describe('HeaderSecretariaComponent', () => {
  let component: HeaderSecretariaComponent;
  let fixture: ComponentFixture<HeaderSecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSecretariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

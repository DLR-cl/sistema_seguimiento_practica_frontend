import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSecretariaComponent } from './home-secretaria.component';

describe('HomeSecretariaComponent', () => {
  let component: HomeSecretariaComponent;
  let fixture: ComponentFixture<HomeSecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSecretariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

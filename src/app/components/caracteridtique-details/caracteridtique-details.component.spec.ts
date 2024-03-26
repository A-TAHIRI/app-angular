import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteridtiqueDetailsComponent } from './caracteridtique-details.component';

describe('CaracteridtiqueDetailsComponent', () => {
  let component: CaracteridtiqueDetailsComponent;
  let fixture: ComponentFixture<CaracteridtiqueDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaracteridtiqueDetailsComponent]
    });
    fixture = TestBed.createComponent(CaracteridtiqueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

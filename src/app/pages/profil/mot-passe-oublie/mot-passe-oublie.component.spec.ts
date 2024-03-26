import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotPasseOublieComponent } from './mot-passe-oublie.component';

describe('MotPasseOublieComponent', () => {
  let component: MotPasseOublieComponent;
  let fixture: ComponentFixture<MotPasseOublieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MotPasseOublieComponent]
    });
    fixture = TestBed.createComponent(MotPasseOublieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

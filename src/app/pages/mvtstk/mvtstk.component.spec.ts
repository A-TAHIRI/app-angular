import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvtstkComponent } from './mvtstk.component';

describe('MvtstkComponent', () => {
  let component: MvtstkComponent;
  let fixture: ComponentFixture<MvtstkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MvtstkComponent]
    });
    fixture = TestBed.createComponent(MvtstkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

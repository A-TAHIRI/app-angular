import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCmdCltFrsComponent } from './detail-cmd-clt-frs.component';

describe('DetailCmdCltFrsComponent', () => {
  let component: DetailCmdCltFrsComponent;
  let fixture: ComponentFixture<DetailCmdCltFrsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailCmdCltFrsComponent]
    });
    fixture = TestBed.createComponent(DetailCmdCltFrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

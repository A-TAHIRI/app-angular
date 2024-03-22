import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMvtStkArticleComponent } from './detail-mvt-stk-article.component';

describe('DetailMvtStkArticleComponent', () => {
  let component: DetailMvtStkArticleComponent;
  let fixture: ComponentFixture<DetailMvtStkArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailMvtStkArticleComponent]
    });
    fixture = TestBed.createComponent(DetailMvtStkArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

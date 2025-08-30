import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMvtStkArticleComponent } from './detail-mvt-stk-article.component';

describe('DetailMvtStkArticleComponent', () => {
  let component: DetailMvtStkArticleComponent;
  let fixture: ComponentFixture<DetailMvtStkArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailMvtStkArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailMvtStkArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

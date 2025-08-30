import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementsStocksComponent } from './mouvements-stocks.component';

describe('MouvementsStocksComponent', () => {
  let component: MouvementsStocksComponent;
  let fixture: ComponentFixture<MouvementsStocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MouvementsStocksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MouvementsStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

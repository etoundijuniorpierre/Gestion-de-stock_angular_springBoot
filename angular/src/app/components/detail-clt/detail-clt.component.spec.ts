import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCltComponent } from './detail-clt.component';

describe('DetailCltComponent', () => {
  let component: DetailCltComponent;
  let fixture: ComponentFixture<DetailCltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCltComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
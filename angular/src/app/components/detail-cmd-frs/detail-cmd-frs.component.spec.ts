import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCmdFrsComponent } from './detail-cmd-frs.component';

describe('DetailCmdFrsComponent', () => {
  let component: DetailCmdFrsComponent;
  let fixture: ComponentFixture<DetailCmdFrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCmdFrsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCmdFrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

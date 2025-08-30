import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCmdCltComponent } from './detail-cmd-clt.component';

describe('DetailCmdCltComponent', () => {
  let component: DetailCmdCltComponent;
  let fixture: ComponentFixture<DetailCmdCltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCmdCltComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCmdCltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

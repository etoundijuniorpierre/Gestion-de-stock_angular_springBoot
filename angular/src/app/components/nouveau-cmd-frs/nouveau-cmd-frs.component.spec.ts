import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauCmdFrsComponent } from './nouveau-cmd-frs.component';

describe('NouveauCmdFrsComponent', () => {
  let component: NouveauCmdFrsComponent;
  let fixture: ComponentFixture<NouveauCmdFrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauCmdFrsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauCmdFrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
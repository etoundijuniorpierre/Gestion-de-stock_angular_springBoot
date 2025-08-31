import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauCmdCltComponent } from './nouveau-cmd-clt.component';

describe('NouveauCmdCltComponent', () => {
  let component: NouveauCmdCltComponent;
  let fixture: ComponentFixture<NouveauCmdCltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauCmdCltComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauCmdCltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
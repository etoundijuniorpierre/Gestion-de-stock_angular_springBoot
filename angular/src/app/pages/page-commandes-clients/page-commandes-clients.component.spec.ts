import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCommandesClientsComponent } from './page-commandes-clients.component';

describe('PageCommandesClientsComponent', () => {
  let component: PageCommandesClientsComponent;
  let fixture: ComponentFixture<PageCommandesClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageCommandesClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCommandesClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
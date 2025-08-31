import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCommandesFournisseursComponent } from './page-commandes-fournisseurs.component';

describe('PageCommandesFournisseursComponent', () => {
  let component: PageCommandesFournisseursComponent;
  let fixture: ComponentFixture<PageCommandesFournisseursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageCommandesFournisseursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCommandesFournisseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
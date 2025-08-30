import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleCaategorieComponent } from './nouvelle-caategorie.component';

describe('NouvelleCaategorieComponent', () => {
  let component: NouvelleCaategorieComponent;
  let fixture: ComponentFixture<NouvelleCaategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouvelleCaategorieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouvelleCaategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNumberListComponent } from './page-number-list.component';

describe('PageNumberListComponent', () => {
  let component: PageNumberListComponent;
  let fixture: ComponentFixture<PageNumberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNumberListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNumberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

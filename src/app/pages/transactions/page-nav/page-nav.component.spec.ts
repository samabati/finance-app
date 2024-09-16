import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNavComponent } from './page-nav.component';

describe('PageNavComponent', () => {
  let component: PageNavComponent;
  let fixture: ComponentFixture<PageNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewCardHeaderComponent } from './overview-card-header.component';

describe('OverviewCardHeaderComponent', () => {
  let component: OverviewCardHeaderComponent;
  let fixture: ComponentFixture<OverviewCardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewCardHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

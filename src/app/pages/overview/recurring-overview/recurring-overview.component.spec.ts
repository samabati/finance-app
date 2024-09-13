import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringOverviewComponent } from './recurring-overview.component';

describe('RecurringOverviewComponent', () => {
  let component: RecurringOverviewComponent;
  let fixture: ComponentFixture<RecurringOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurringOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

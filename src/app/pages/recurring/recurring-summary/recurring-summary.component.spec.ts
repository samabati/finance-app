import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringSummaryComponent } from './recurring-summary.component';

describe('RecurringSummaryComponent', () => {
  let component: RecurringSummaryComponent;
  let fixture: ComponentFixture<RecurringSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurringSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

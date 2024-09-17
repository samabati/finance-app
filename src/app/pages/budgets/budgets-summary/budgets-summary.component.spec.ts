import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsSummaryComponent } from './budgets-summary.component';

describe('BudgetsSummaryComponent', () => {
  let component: BudgetsSummaryComponent;
  let fixture: ComponentFixture<BudgetsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetsSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

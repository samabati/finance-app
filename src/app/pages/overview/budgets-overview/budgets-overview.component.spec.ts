import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsOverviewComponent } from './budgets-overview.component';

describe('BudgetsOverviewComponent', () => {
  let component: BudgetsOverviewComponent;
  let fixture: ComponentFixture<BudgetsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsPieComponent } from './budgets-pie.component';

describe('BudgetsPieComponent', () => {
  let component: BudgetsPieComponent;
  let fixture: ComponentFixture<BudgetsPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetsPieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetsPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

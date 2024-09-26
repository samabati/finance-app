import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsCardItemComponent } from './budgets-card-item.component';

describe('BudgetsCardItemComponent', () => {
  let component: BudgetsCardItemComponent;
  let fixture: ComponentFixture<BudgetsCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetsCardItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetsCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsEllipsesComponent } from './budgets-ellipses.component';

describe('BudgetsEllipsesComponent', () => {
  let component: BudgetsEllipsesComponent;
  let fixture: ComponentFixture<BudgetsEllipsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetsEllipsesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetsEllipsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

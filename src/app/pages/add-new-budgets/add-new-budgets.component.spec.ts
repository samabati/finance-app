import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBudgetsComponent } from './add-new-budgets.component';

describe('AddNewBudgetsComponent', () => {
  let component: AddNewBudgetsComponent;
  let fixture: ComponentFixture<AddNewBudgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewBudgetsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewBudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

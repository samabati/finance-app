import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBudgetsComponent } from './add-budgets.component';

describe('AddBudgetsComponent', () => {
  let component: AddBudgetsComponent;
  let fixture: ComponentFixture<AddBudgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBudgetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

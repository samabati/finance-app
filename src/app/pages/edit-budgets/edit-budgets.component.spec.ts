import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBudgetsComponent } from './edit-budgets.component';

describe('EditBudgetsComponent', () => {
  let component: EditBudgetsComponent;
  let fixture: ComponentFixture<EditBudgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBudgetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

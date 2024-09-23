import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBudgetsComponent } from './delete-budgets.component';

describe('DeleteBudgetsComponent', () => {
  let component: DeleteBudgetsComponent;
  let fixture: ComponentFixture<DeleteBudgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBudgetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

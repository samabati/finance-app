import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringListItemComponent } from './recurring-list-item.component';

describe('RecurringListItemComponent', () => {
  let component: RecurringListItemComponent;
  let fixture: ComponentFixture<RecurringListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurringListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

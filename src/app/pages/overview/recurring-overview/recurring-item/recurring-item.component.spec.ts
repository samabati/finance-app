import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringItemComponent } from './recurring-item.component';

describe('RecurringItemComponent', () => {
  let component: RecurringItemComponent;
  let fixture: ComponentFixture<RecurringItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurringItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

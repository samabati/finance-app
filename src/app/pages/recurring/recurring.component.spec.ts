import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringComponent } from './recurring.component';

describe('RecurringComponent', () => {
  let component: RecurringComponent;
  let fixture: ComponentFixture<RecurringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

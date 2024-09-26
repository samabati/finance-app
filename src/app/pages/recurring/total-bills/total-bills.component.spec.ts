import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalBillsComponent } from './total-bills.component';

describe('TotalBillsComponent', () => {
  let component: TotalBillsComponent;
  let fixture: ComponentFixture<TotalBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalBillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

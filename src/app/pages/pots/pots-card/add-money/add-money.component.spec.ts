import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoneyComponent } from './add-money.component';

describe('AddMoneyComponent', () => {
  let component: AddMoneyComponent;
  let fixture: ComponentFixture<AddMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMoneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

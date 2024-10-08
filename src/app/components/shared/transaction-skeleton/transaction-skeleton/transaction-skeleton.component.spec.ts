import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSkeletonComponent } from './transaction-skeleton.component';

describe('TransactionSkeletonComponent', () => {
  let component: TransactionSkeletonComponent;
  let fixture: ComponentFixture<TransactionSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

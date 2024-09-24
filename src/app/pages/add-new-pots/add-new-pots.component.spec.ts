import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPotsComponent } from './add-new-pots.component';

describe('AddNewPotsComponent', () => {
  let component: AddNewPotsComponent;
  let fixture: ComponentFixture<AddNewPotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewPotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewPotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

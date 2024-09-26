import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpendComponent } from './edit-spend.component';

describe('EditSpendComponent', () => {
  let component: EditSpendComponent;
  let fixture: ComponentFixture<EditSpendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSpendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSpendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

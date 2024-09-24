import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPotsComponent } from './edit-pots.component';

describe('EditPotsComponent', () => {
  let component: EditPotsComponent;
  let fixture: ComponentFixture<EditPotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

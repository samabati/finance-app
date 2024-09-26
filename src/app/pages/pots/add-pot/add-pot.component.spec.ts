import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPotComponent } from './add-pot.component';

describe('AddPotComponent', () => {
  let component: AddPotComponent;
  let fixture: ComponentFixture<AddPotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

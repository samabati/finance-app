import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotNameComponent } from './pot-name.component';

describe('PotNameComponent', () => {
  let component: PotNameComponent;
  let fixture: ComponentFixture<PotNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotsComponent } from './pots.component';

describe('PotsComponent', () => {
  let component: PotsComponent;
  let fixture: ComponentFixture<PotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

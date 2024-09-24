import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotsCardComponent } from './pots-card.component';

describe('PotsCardComponent', () => {
  let component: PotsCardComponent;
  let fixture: ComponentFixture<PotsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

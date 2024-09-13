import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotsOverviewComponent } from './pots-overview.component';

describe('PotsOverviewComponent', () => {
  let component: PotsOverviewComponent;
  let fixture: ComponentFixture<PotsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

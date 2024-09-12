import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimizeComponent } from './minimize.component';

describe('MinimizeComponent', () => {
  let component: MinimizeComponent;
  let fixture: ComponentFixture<MinimizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinimizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

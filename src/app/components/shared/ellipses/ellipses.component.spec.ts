import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EllipsesComponent } from './ellipses.component';

describe('EllipsesComponent', () => {
  let component: EllipsesComponent;
  let fixture: ComponentFixture<EllipsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EllipsesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EllipsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

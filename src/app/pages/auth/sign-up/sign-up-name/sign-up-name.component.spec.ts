import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpNameComponent } from './sign-up-name.component';

describe('SignUpNameComponent', () => {
  let component: SignUpNameComponent;
  let fixture: ComponentFixture<SignUpNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

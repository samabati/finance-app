import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotsSavingsMicroComponent } from './pots-savings-micro.component';

describe('PotsSavingsMicroComponent', () => {
  let component: PotsSavingsMicroComponent;
  let fixture: ComponentFixture<PotsSavingsMicroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotsSavingsMicroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotsSavingsMicroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordDashComponent } from './landlord-dash.component';

describe('LandlordDashComponent', () => {
  let component: LandlordDashComponent;
  let fixture: ComponentFixture<LandlordDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandlordDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

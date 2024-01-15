import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentlistingComponent } from './rentlisting.component';

describe('RentlistingComponent', () => {
  let component: RentlistingComponent;
  let fixture: ComponentFixture<RentlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentlistingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPropertyListingComponent } from './dash-property-listing.component';

describe('DashPropertyListingComponent', () => {
  let component: DashPropertyListingComponent;
  let fixture: ComponentFixture<DashPropertyListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashPropertyListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashPropertyListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertychartComponent } from './propertychart.component';

describe('PropertychartComponent', () => {
  let component: PropertychartComponent;
  let fixture: ComponentFixture<PropertychartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertychartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertychartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

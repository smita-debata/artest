import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinchartComponent } from './linchart.component';

describe('LinchartComponent', () => {
  let component: LinchartComponent;
  let fixture: ComponentFixture<LinchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

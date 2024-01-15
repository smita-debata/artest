import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantDashComponent } from './tenant-dash.component';

describe('TenantDashComponent', () => {
  let component: TenantDashComponent;
  let fixture: ComponentFixture<TenantDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

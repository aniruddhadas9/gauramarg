import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeachderDashboardComponent } from './teachder-dashboard.component';

describe('TeachderDashboardComponent', () => {
  let component: TeachderDashboardComponent;
  let fixture: ComponentFixture<TeachderDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachderDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

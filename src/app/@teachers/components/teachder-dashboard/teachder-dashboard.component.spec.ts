import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachderDashboardComponent } from './teachder-dashboard.component';

describe('TeachderDashboardComponent', () => {
  let component: TeachderDashboardComponent;
  let fixture: ComponentFixture<TeachderDashboardComponent>;

  beforeEach(async(() => {
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

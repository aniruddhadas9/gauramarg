import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewAttendanceByTeacherComponent } from './view-attendance-by-teacher.component';

describe('ViewAttendanceByTeacherComponent', () => {
  let component: ViewAttendanceByTeacherComponent;
  let fixture: ComponentFixture<ViewAttendanceByTeacherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAttendanceByTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAttendanceByTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddAttendanceByTeacherComponent } from './add-attendance-by-teacher.component';

describe('AddAttendanceByTeacherComponent', () => {
  let component: AddAttendanceByTeacherComponent;
  let fixture: ComponentFixture<AddAttendanceByTeacherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAttendanceByTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttendanceByTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

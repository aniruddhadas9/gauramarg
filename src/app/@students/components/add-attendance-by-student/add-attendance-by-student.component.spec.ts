import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttendanceByStudentComponent } from './add-attendance-by-student.component';

describe('AddAttendanceByStudentComponent', () => {
  let component: AddAttendanceByStudentComponent;
  let fixture: ComponentFixture<AddAttendanceByStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAttendanceByStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttendanceByStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

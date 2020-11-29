import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddStudentToCourseComponent } from './add-student-to-course.component';

describe('AddStudentToCourseComponent', () => {
  let component: AddStudentToCourseComponent;
  let fixture: ComponentFixture<AddStudentToCourseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentToCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentToCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

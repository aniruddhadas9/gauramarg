import {Component, OnInit} from '@angular/core';
import {UserService} from '@candiman/website';
import {CoursesService} from '../../../@shared/services/courses/courses.service';
import {AttendanceService, Course, CourseRegistration, CourseRegistrationService, User} from '../../../@restapi';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';

@Component({
  selector: 'gm-view-attendance-by-teacher',
  templateUrl: './view-attendance-by-teacher.component.html',
  styleUrls: ['./view-attendance-by-teacher.component.scss']
})
export class ViewAttendanceByTeacherComponent implements OnInit {

  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[];
  courseRegistration: CourseRegistration;
  courseOptions: Array<{ label: string, value: string }>;
  attendanceList = [];
  attendanceForm: FormGroup;

  constructor(
    private userService: UserService,
    private coursesService: CoursesService,
    private courseRegistrationService: CourseRegistrationService,
    private attendanceService: AttendanceService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.courseOptions = this.coursesService.courses.map((couese: Course) => {
      return {label: couese.name, value: couese.id};
    });

  }

  changeCourse(courseId: string) {
    console.log(courseId);
    this.courseRegistrationService.getStudentsByCourseIdUsingGET(courseId).subscribe((users: Array<User>) => {
      console.log('students of the course %o is %o', courseId, users);
      if (users) {
        this.attendanceList = users && users.map((value) => {
          // return {key: value.email, value: value.firstName + ' ' + value.lastName + '(' + value.email + ')'};
          return {id: value.email || '', name: value.firstName + ' ' + value.lastName + '(' + value.email + ')'};
        });
      }
    });
  }

  getAttendanceByCourseId(courseID: string) {
    this.courseRegistrationService.getStudentsByCourseIdUsingGET(courseID)
      .subscribe((values) => {
        if (values) {
          const students = values && values.map((value) => {
            // return {key: value.email, value: value.firstName + ' ' + value.lastName + '(' + value.email + ')'};
            return {id: value.email, name: value.firstName + ' ' + value.lastName + '(' + value.email + ')'};
          });
        }
      });
  }

}

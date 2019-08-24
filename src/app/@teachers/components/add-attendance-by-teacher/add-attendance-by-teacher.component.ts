import {Component, OnInit} from '@angular/core';
import {Attendance, AttendanceService, Course, CourseRegistration, CourseRegistrationService} from '../../../@restapi';
import {UserService} from '@candiman/website';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {CoursesService} from '../../../@shared/services/courses/courses.service';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

@Component({
  selector: 'gm-add-attendance-by-teacher',
  templateUrl: './add-attendance-by-teacher.component.html',
  styleUrls: ['./add-attendance-by-teacher.component.scss']
})
export class AddAttendanceByTeacherComponent implements OnInit {

  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[];
  courseRegistration: CourseRegistration;
  attendanceList = [];

  constructor(
    private userService: UserService,
    private coursesService: CoursesService,
    private courseRegistrationService: CourseRegistrationService,
    private attendanceService: AttendanceService
  ) {
  }

  ngOnInit() {
    const courseOptions = this.coursesService.courses.map((couese: Course) => {
      return {label: couese.name, value: couese.id};
    });

    this.getAttendanceByCourseId(courseOptions[0].value as string);

    this.fields = [
      {
        key: 'courseId',
        type: 'select',
        templateOptions: {
          label: 'Select a course',
          placeholder: '-- courses --',
          options: courseOptions,
          required: true,
          change: (field, $event) => {
            const courseId = $event.target.value.split(':')[1].trim();
            console.log(this.model);
            console.log(field);
            console.log(courseId);
            this.getAttendanceByCourseId(courseId as string);
          }
        }
      }
    ];

  }

  getAttendanceByCourseId(courseID: string) {
    forkJoin(
      this.attendanceService.getByCourseIdUsingGET(courseID),
      this.courseRegistrationService.getStudentsByCourseIdUsingGET(courseID),
    )
      .pipe(catchError(error => of(error)))
      .subscribe((values) => {
        if (values[1]) {
          this.attendanceList = values[1] && values[1].map((value) => {
            return {key: value.email, value: false};
          });
          this.fields.push({
            key: 'attendance',
            type: 'multicheckbox',
            templateOptions: {
              label: 'Attendance',
              options: this.attendanceList
            }
          });
        }
        console.log(values);
      });
    /*this.attendanceService.getByCourseIdUsingGET(courseID).subscribe((attndence: Array<Attendance>) => {
      console.log(attndence);
      this.attendanceList[courseID] = attndence;
    });*/
  }

  submit(model) {
    console.log(model);
    if (this.form.valid) {
      this.courseRegistrationService.postUsingPOST2(model).subscribe((response) => {
        console.log(response);
      });
    }
  }

}

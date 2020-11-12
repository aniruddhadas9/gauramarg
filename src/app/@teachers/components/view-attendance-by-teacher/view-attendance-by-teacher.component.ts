import {Component, OnInit} from '@angular/core';
import {UserService} from '@candiman/website';
import {CoursesService} from '../../../@shared/services/courses/courses.service';
import {Attendance, AttendanceService, Course, CourseRegistration, CourseRegistrationService} from '../../../@restapi';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  attendanceList = [] as Array<Attendance>;
  attendanceForm: FormGroup;

  constructor(
    private userService: UserService,
    private coursesService: CoursesService,
    private courseRegistrationService: CourseRegistrationService,
    private attendanceService: AttendanceService,
    private formBuilder: FormBuilder
  ) {
    this.attendanceForm = this.formBuilder.group({
      courseId: new FormControl('', [Validators.required]),
      classDate: new FormControl(''),
      classTime: new FormControl(''),
      attendanceList: new FormArray([]),
    });
  }

  ngOnInit() {
    // Get all attendances of the teacher
    this.getAttendanceByTeacherId();

    // Get all available courses to filter attenances
    this.courseOptions = this.coursesService.courses.map((couese: Course) => {
      return {label: couese.name, value: couese.id};
    });

  }

  changeCourse(courseId: string) {
    console.log(courseId);
    this.getAttendanceByCourseId(courseId).subscribe((attendances: Array<Attendance>) => {
      console.log('attendances: %o', attendances);
      this.attendanceList = attendances;
    });
  }

  getAttendanceByCourseId(courseID: string) {
    return this.attendanceService.getByCourseIdUsingGET(courseID);
  }

  getAttendanceByTeacherId() {
    this.attendanceService.getByTeacherIdUsingGET(this.userService.authorizedUser.email)
      .subscribe((attendances: Array<Attendance>) => {
        console.log('attendances: %o', attendances);
        this.attendanceList = attendances;
      });
  }

  search(model) {
    console.log(model);
    console.log('searcherd:%o', model);
    this.attendanceService.getByFilterUsingPOST(model).subscribe((data) => {
      console.log('searcherd:%o', data);

    });
  }

}

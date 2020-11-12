import {Component, OnInit} from '@angular/core';
import {Attendance, AttendanceService, Course, CourseRegistration, CourseRegistrationService, User} from '../../../@restapi';
import {AlertService, DangerAlert, SuccessAlert, UserService} from '@candiman/website';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
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
  courseOptions: Array<{ label: string, value: string }>;
  attendanceList = [];
  attendanceForm: FormGroup;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private coursesService: CoursesService,
    private courseRegistrationService: CourseRegistrationService,
    private attendanceService: AttendanceService,
    private formBuilder: FormBuilder
  ) {
    this.attendanceForm = this.formBuilder.group({
      courseId: new FormControl('', [Validators.required]),
      classDate: new FormControl(''),
      classTime: new FormControl(''),
      attendanceList: new FormArray([], this.minSelectedCheckboxes(1)),
    });

  }

  ngOnInit() {
    this.courseOptions = this.coursesService.courses.map((couese: Course) => {
      return {label: couese.name, value: couese.id};
    });

    // this.changeCourse(this.courseOptions[0].value as string);

    this.fields = [
      {
        key: 'courseId',
        type: 'select',
        templateOptions: {
          label: 'Select a course',
          placeholder: '-- courses --',
          options: this.courseOptions,
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

  changeCourse(courseId: string) {
    console.log(courseId);
    this.courseRegistrationService.getStudentsByCourseIdUsingGET(courseId).subscribe((users: Array<User>) => {
      console.log('students of the course %o is %o', courseId, users);
      if (users) {
        this.attendanceList = users && users.map((value) => {
          // return {key: value.email, value: value.firstName + ' ' + value.lastName + '(' + value.email + ')'};
          return {id: value.email || '', name: value.firstName + ' ' + value.lastName + '(' + value.email + ')'};
        });
        this.addCheckboxes(this.attendanceList);
      }
    });
  }

  private addCheckboxes(students) {
    console.log(students);
    this.attendanceForm.controls.attendanceList = new FormArray([], this.minSelectedCheckboxes(1));
    students.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.attendanceForm.controls.attendanceList as FormArray).push(control);
    });
  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : {required: true};
    };
    return validator;
  }

  submit(model) {
    console.log(model);
    if (this.form.valid) {
      this.courseRegistrationService.postUsingPOST2(model).subscribe((response) => {
        console.log(response);
      });
    }
  }

  onSubmit() {
    console.log(this.attendanceForm.getRawValue());
    // Get all the selected values
    const selectedStudents = this.attendanceForm.getRawValue().attendanceList
      .map((value, index) => {
        console.log('value, index', value, index);
        return value ? this.attendanceList[index].id : null;
      }).filter(value => value !== null);
    console.log('selectedStudents:%o', selectedStudents);
    selectedStudents.map((student) => {
      const attendance: Attendance = {
        approved: true,
        courseId: '' + this.attendanceForm.getRawValue().courseId,
        classDate: this.attendanceForm.getRawValue().classDate,
        classTime: this.attendanceForm.getRawValue().classTime,
        notes: 'Added by teacher',
        studentId: student,
        teacherId: this.userService.authorizedUser.email,
      };

      // Save the data
      this.attendanceService.postUsingPOST(attendance).subscribe(
        (response) => {
          this.alertService
            .alert(new SuccessAlert('Success!', attendance.studentId, attendance.classDate + '(' + attendance.classTime + ')', 5));
          console.log('posted data to reset the form now', response);
        },
        (error) => {
          this.alertService.alert(new DangerAlert('Failure!', 'Unable to mark attendance.', 'please contact admin', 5));
        }
      );
    });

  }

  resetForm() {
    this.attendanceList = [];
    this.attendanceForm.controls.attendanceList = new FormArray([], this.minSelectedCheckboxes(1));
  }

  getAttendanceByCourseId(courseID: string) {
    forkJoin(
      this.attendanceService.getByCourseIdUsingGET(courseID),
      this.courseRegistrationService.getStudentsByCourseIdUsingGET(courseID),
    )
      .pipe(catchError(error => of(error)))
      .subscribe((values) => {
        if (values[1]) {
          const students = values[1] && values[1].map((value) => {
            // return {key: value.email, value: value.firstName + ' ' + value.lastName + '(' + value.email + ')'};
            return {id: value.email, name: value.firstName + ' ' + value.lastName + '(' + value.email + ')'};
          });
          this.addCheckboxes(students);
        }
      });
  }


}

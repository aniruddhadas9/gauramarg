import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {UserService} from '@candiman/website';
import {CourseRegistrationService} from '../../../@restapi';
import {CoursesService} from '../../../@shared/services/courses/courses.service';

@Component({
  selector: 'gm-add-student-to-course',
  templateUrl: './add-student-to-course.component.html',
  styleUrls: ['./add-student-to-course.component.scss']
})
export class AddStudentToCourseComponent implements OnInit {

  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[];

  constructor(
    private userService: UserService,
    private courseRegistrationService: CourseRegistrationService,
    private coursesService: CoursesService
  ) {
    const courseOptions = this.coursesService.courses.map((couese) => {
      return {label: couese.name, value: couese.id};
    });

    this.fields = [
      {
        key: 'courseId',
        type: 'select',
        templateOptions: {
          label: 'Select Course',
          placeholder: '-- course --',
          options: courseOptions,
          required: true,
        }
      },
      {
        key: 'studentId',
        type: 'input',
        templateOptions: {
          label: 'studentId',
          placeholder: 'Enter studentId',
          required: true,
        }
      },
      {
        key: 'teacherId',
        type: 'input',
        defaultValue: this.userService.authorizedUser[0].email,
        hide: true,
        templateOptions: {
          label: 'teacherId',
          placeholder: 'Enter teacherId',
          required: true,
        }
      },
      {
        key: 'notes',
        type: 'input',
        templateOptions: {
          label: 'notes',
          placeholder: 'Enter notes',
          required: true,
        }
      },
      {
        key: 'status',
        type: 'input',
        templateOptions: {
          label: 'status',
          placeholder: 'Enter status',
          required: true,
        }
      },
      /*{
        key: 'created',
        type: 'input',
        templateOptions: {
          label: 'created',
          placeholder: 'Enter created',
          required: false,
        }
      },
      {
        key: 'modified',
        type: 'input',
        templateOptions: {
          label: 'modified',
          placeholder: 'Enter modified',
          required: false,
        }
      }*/
    ];
  }

  ngOnInit() {
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

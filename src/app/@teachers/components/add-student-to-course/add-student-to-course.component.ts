import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {UserService} from '@candiman/website';
import {CourseRegistrationService, Timestamp} from '../../../@restapi';

@Component({
  selector: 'gm-add-student-to-course',
  templateUrl: './add-student-to-course.component.html',
  styleUrls: ['./add-student-to-course.component.scss']
})
export class AddStudentToCourseComponent implements OnInit {

  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'courseId',
      type: 'input',
      templateOptions: {
        label: 'courseId',
        placeholder: 'Enter courseId',
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

  constructor(
    private userService: UserService,
    private courseRegistrationService: CourseRegistrationService
  ) {
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

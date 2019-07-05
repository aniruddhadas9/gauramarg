import {Component, OnInit} from '@angular/core';
import {CourseRegistration, CourseRegistrationService, CourseService} from '../../../@restapi';
import {UserService} from '@candiman/website';

@Component({
  selector: 'gm-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  students: any;
  constructor(
    private courseRegistrationService: CourseRegistrationService,
    private courseService: CourseService,
    private userService: UserService
  ) {
  }

  ngOnInit() {

    console.log('this.userService.authorizedUser%o', this.userService.authorizedUser);

    this.courseRegistrationService.getStudentsByTeacherIdUsingGET(this.userService.authorizedUser[0].email).subscribe((students) => {
      console.log(students);
      this.students = students;
    });

  }
}

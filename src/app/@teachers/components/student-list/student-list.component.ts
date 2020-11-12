import {Component, OnInit} from '@angular/core';
import {CourseRegistrationService, CourseService, User} from '../../../@restapi';
import {UserService} from '@candiman/website';

@Component({
  selector: 'gm-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  students: User[];

  constructor(
    private courseRegistrationService: CourseRegistrationService,
    private courseService: CourseService,
    private userService: UserService
  ) {
  }

  ngOnInit() {

    console.log('this.userService.authorizedUser%o', this.userService.authorizedUser);

    this.courseRegistrationService.getStudentsByTeacherIdUsingGET(this.userService.authorizedUser.email)
      .subscribe((students: User[]) => {
        console.log(students);
        this.students = students;
      });

  }
}

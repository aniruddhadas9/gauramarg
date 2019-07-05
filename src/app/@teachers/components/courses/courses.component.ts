import {Component, OnInit} from '@angular/core';
import {Course, CourseService, Timestamp} from '../../../@restapi';

@Component({
  selector: 'gm-course',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor(private courseService: CourseService) {
  }

  course: Course;
  courses: Array<Course>;

  ngOnInit() {
    this.courseService.getUsingGET1().subscribe((courses) => {
      console.log(courses);
      this.courses = courses;
    });

  }

}

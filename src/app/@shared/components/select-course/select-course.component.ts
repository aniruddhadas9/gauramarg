import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course, CourseRegistrationService} from '../../../@restapi';
import {CoursesService} from '../../services/courses/courses.service';

@Component({
  selector: 'gm-select-course',
  templateUrl: './select-course.component.html',
  styleUrls: ['./select-course.component.scss']
})
export class SelectCourseComponent implements OnInit {

  @Input() lable: string;
  @Output() select: EventEmitter<string>;

  courseOptions: Array<{ label: string, value: string }>;

  constructor(
    private coursesService: CoursesService,
    private courseRegistrationService: CourseRegistrationService
  ) {
  }

  ngOnInit() {
    if(this.coursesService.courses === undefined) {

    }
    this.courseOptions = this.coursesService.courses.map((couese: Course) => {
      return {label: couese.name, value: couese.id};
    });

  }

  changeCourse(courseId: string) {
    this.select.emit(courseId);
  }
}

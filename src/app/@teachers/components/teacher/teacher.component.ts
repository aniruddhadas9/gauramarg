import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'gm-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  @ViewChild('sidebar', {read: ElementRef, static: true}) sidebar: ElementRef;
  @ViewChild('content', {read: ElementRef, static: true}) content: ElementRef;
  menu: boolean;
  constructor() { }

  ngOnInit() {
  }

  toggle() {
    console.log(this.sidebar.nativeElement.testContent);
  }
}

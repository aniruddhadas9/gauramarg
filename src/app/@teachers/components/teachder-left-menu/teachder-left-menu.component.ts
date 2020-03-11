import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'gm-teachder-left-menu',
  templateUrl: './teachder-left-menu.component.html',
  styleUrls: ['./teachder-left-menu.component.scss']
})
export class TeachderLeftMenuComponent implements OnInit {

  @Input() user;
  menu: boolean;
  constructor() { }

  ngOnInit() {
  }

}

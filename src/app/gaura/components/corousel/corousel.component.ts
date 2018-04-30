import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'gm-corousel',
  templateUrl: './corousel.component.html',
  styleUrls: ['./corousel.component.scss']
})
export class CorouselComponent implements OnInit {

  images = [];
  constructor(ngbCarouselConfig: NgbCarouselConfig) {
    ngbCarouselConfig.interval = 3000;
    ngbCarouselConfig.wrap = true;
  }

  ngOnInit() {
    for(let i = 1; i <= 4; i++) {
      this.images.push({'url': 'assets/gauramarg/'+i+'.JPG'})
    }
  }

}

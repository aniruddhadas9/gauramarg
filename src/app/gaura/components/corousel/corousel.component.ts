import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gm-corousel',
  templateUrl: './corousel.component.html',
  styleUrls: ['./corousel.component.scss']
})
export class CorouselComponent implements OnInit {

  images = [];
  constructor() { }

  ngOnInit() {
    for(let i=1; i< 31; i++) {
      this.images.push({'url': 'assets/gauramarg/'+i+'.JPG'})
    }
  }

}

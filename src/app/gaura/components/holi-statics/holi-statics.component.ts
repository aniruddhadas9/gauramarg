import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {HoliService} from '../../services/holi/holi.service';

@Component({
  selector: 'gm-holi-statics',
  templateUrl: './holi-statics.component.html',
  styleUrls: ['./holi-statics.component.scss']
})
export class HoliStaticsComponent implements OnInit {


  @Input() static: any;
  @Output() output = new EventEmitter<any>();

  constructor(private httpClient: HttpClient, private holiService: HoliService) {
  }

  ngOnInit() {
    if (!this.static) {
      this.getAllHoliEvent();
    }
  }


  getAllHoliEvent() {
    return this.httpClient
      .get(environment.restUrl + '/holi')
      .subscribe((response: any) => {
        this.static = this.holiService.calculateStatics(response);
      });
  }


}

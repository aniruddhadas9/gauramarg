import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MapService} from './core/services/map.service';
import {GoogleMap} from '@agm/core/services/google-maps-types';

@Component({
  selector: 'gm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  coordinates: Coordinates;
  title = 'cfs';

  constructor(private httpClient: HttpClient,
              private mapService: MapService) {
  }

  ngOnInit() {
  }

  mapReady(map: GoogleMap) {
    this.mapService.map = map;
    this.mapService.getLocation({}).subscribe((position: Position) => {
      this.coordinates = position && position.coords;
      this.mapService.getUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }).subscribe((location) => {
        console.log('location: %o', location)
      });
    });
  }
}

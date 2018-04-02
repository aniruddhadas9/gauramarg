import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MapService} from './core/services/map.service';
import {GoogleMap} from '@agm/core/services/google-maps-types';
import {AlertService} from './core/services/alert.service';
import {GoogleAnalyticsService} from './core/services/google-analytics.service';
import {UserService} from './core/services/user.service';
import {
  Router, NavigationEnd, NavigationStart, NavigationCancel,
  NavigationError, ActivatedRoute, ActivatedRouteSnapshot, PRIMARY_OUTLET
} from '@angular/router';
import {filter, tap} from 'rxjs/operators';
import {WINDOW} from './core/services/custom-location.service';
import {CustomRouteReuseStrategy} from './core/services/custom-route-reuse-strategy.service';
import {ConfigService} from './core/services/config.service';


@Component({
  selector: 'gm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  coordinates: Coordinates;
  title = 'cfs';
  isLoading: boolean;

  constructor(
    private httpClient: HttpClient,
    private mapService: MapService,
    private alerter: AlertService,
    private router: Router,
    private configService: ConfigService,
    private ga: GoogleAnalyticsService,
    public cu: UserService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart ||
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError),
      tap(event => {
        this.isLoading = false;
        if (event instanceof NavigationEnd) {
          this.ga.sendPageViewData(event.urlAfterRedirects);
        }
      }),
    ).subscribe(event => {
      this.isLoading = true;
    });
  }

  mapReady(map: GoogleMap) {
    this.mapService.map = map;
    this.mapService.getLocation({}).subscribe((position: Position) => {
      this.coordinates = position && position.coords;
      this.mapService.getUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }).subscribe((location) => {
        console.log('location: %o', location);
      });
    });
  }
}

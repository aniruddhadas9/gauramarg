import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MapService} from './core/services/map.service';
import {GoogleMap} from '@agm/core/services/google-maps-types';
import {GoogleAnalyticsService} from './core/services/google-analytics.service';
import {
  Router, NavigationEnd, NavigationStart, NavigationCancel,
  NavigationError, ActivatedRoute
} from '@angular/router';
import {filter, tap} from 'rxjs/operators';
import {ChangeLocationModelComponent, Footer, Header, UserService, AlertService} from '@candiman/website';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'gm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  coordinates: Coordinates;
  title = 'cfs';
  isLoading: boolean;

  header: Header;
  footer: Footer;

  modalRef;

  constructor(
    private httpClient: HttpClient,
    private mapService: MapService,
    private ngbModal: NgbModal,
    private alerter: AlertService,
    private router: Router,
    private ga: GoogleAnalyticsService,
    public userService: UserService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {

    // Subscribe to the login
    this.userService.user.subscribe((user: any) => {
      if (!user.status || user.status === 200) {
        this.header.links.rightLinks[0].hidden = false;
        this.header.links.rightLinks[1].hidden = false;
        this.header.links.rightLinks[3].hidden = false;
        this.header.links.rightLinks[5].hidden = false;
        this.header.links.rightLinks[6].hidden = true;
      } else {
        this.alertService.alert({
          title: 'Login failure!',
          subTitle: 'Unable to login! Please try again or contact support team.',
          text: user,
          type: 'danger',
          closeDelay: 30
        });
      }
    });

    this.header = {
      brand: {
        label: 'Gaura Marga',
        url: '/',
        logo: {
          imageInAsset: 'gaur-nitai.png',
          style: {
            width: '30px',
            height: '30px'
          }
        },
        style: {
          'color': '#f99d00',
          'text-decoration': 'none'
        }
      },
      links: {
        rightLinks: [
          {label: 'Guest entry', url: '/holi', hidden: true},
          {label: 'Parking', url: '/parking', hidden: true},
          {label: 'Privacy', url: '/privacy', hidden: false},
          {label: 'Events', url: '/events', hidden: true},
          {label: 'NH Family', url: '/nhfamily', hidden: false},
          {label: 'Profile', url: '/profile', hidden: true},
          {label: 'Login', url: '/login', hidden: false},
        ],
        leftLinks: null,
        style: {
          'background-color': '#7a690b',
          'color': '#f99d00',
          'margin': '0 5px',
          'text-decoration': 'none',
          'a:link': {
            'color': '#3eff77'
          },
          'a:visited': {
            'color': '#f99d00'
          },
          'a:hover': {
            'color': '#fe4d0e'
          },
          'a:active': {
            'color': '#ec7a39'
          }
        }
      },
      middleButton: {
        display: false,
        label: 'Trying to get location from device...',
        loading: true,
        style: {
          'background-color': '#7a690b',
          'color': '#f99d00'
        }
      },
      style: {
        'min-height': '50px',
        'background-color': '#7a690b'
      }
    };


    this.footer = {
      displayTopSection: true,
      social: {
        facebook: 'http://www.facebook.com',
        googlePlus: 'http://www.plus.google.com',
        twitter: 'http://www.twitter.com',
        linkedIn: 'http://www.linkedin.com',
      },
      copyright: {
        year: 2018,
        label: 'gaura marga team',
        url: 'team'
      },
      contact: {
        name: 'Bhayahari Prabhu',
        email: 'bhayahari.dasa@gauramarg.com',
        phone: '+x xxx xxx xxxx',
        fax: '+x xxx xxx xxxx'
      },
      message: {
        heading: 'A Devotee',
        desc: 'BG[11-54]: My dear Arjuna, only by undivided devotional service can I be understood as I am,' +
          ' standing before you, and can thus be seen directly.' +
          ' Only in this way can you enter into the mysteries of My understanding.'
      },
      columnOneLinks: [
        {label: 'login', url: '/login', hidden: true},
        {label: 'Privacy', url: '/privacy', hidden: false}
      ],
      columnTwoLinks: [
        {label: 'profile', url: '/profile', hidden: false}
      ],
      style: {
        'background-color': '#7a690b',
        'color': '#f99d00',
        'a:link': {
          'color': '#ffc11a'
        },
        'a:visited': {
          'color': '#16d3ff'
        },
        'a:hover': {
          'color': '#fbfe11'
        },
        'a:active': {
          'color': '#d0eccb'
        }
      }
    };

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

  openLocationChangeModel(event) {
    this.modalRef = this.ngbModal.open(ChangeLocationModelComponent, {windowClass: 'location-change-modal'});
    this.modalRef.componentInstance.output.subscribe((location) => {
      this.header.middleButton.label = location.formatted_address;
    });
  }
}

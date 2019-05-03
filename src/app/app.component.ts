import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GoogleMap} from '@agm/core/services/google-maps-types';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {filter, tap} from 'rxjs/operators';
import {
  AlertService,
  ChangeLocationModelComponent,
  Footer,
  GoogleAnalyticsService,
  Header,
  MapService,
  UserService
} from '@candiman/website';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {takeWhile} from 'rxjs/internal/operators/takeWhile';

// import {NbAuthResult, NbAuthService} from '@nebular/auth';


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

  alive: any;

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
    private alertService: AlertService,
    // private googleApiService: GoogleApiService,
    // private googleAuthService: GoogleAuthService,
    // private authService: AuthService,
    // private nbAuthService: NbAuthService
  ) {

    // Subscribe to the login
    this.userService.user.subscribe((user: any | Array<object>) => {
      console.log(user);
      if (user === null) {
        this.header.links.rightLinks[0].hidden = true;
        this.header.links.rightLinks[1].hidden = true;
        this.header.links.rightLinks[2].hidden = true;
        this.header.links.rightLinks[3].hidden = true;
        this.header.links.rightLinks[4].hidden = true;
        this.header.links.rightLinks[5].hidden = true;
        this.header.links.rightLinks[6].hidden = true;
        this.header.links.rightLinks[7].hidden = false;
        this.alertService.alert({
          title: 'Logout success!',
          subTitle: 'You are successfully loggedout.',
          text: user,
          type: 'success',
          closeDelay: 30
        });
      } else if (user.length > 0) {
        if (user[0].type === 'admin') {
          this.header.links.rightLinks[0].hidden = false;
          this.header.links.rightLinks[1].hidden = false;
          this.header.links.rightLinks[2].hidden = false;
          this.header.links.rightLinks[3].hidden = false;
          this.header.links.rightLinks[4].hidden = false;
          this.header.links.rightLinks[5].hidden = false;
          this.header.links.rightLinks[6].hidden = false;
          this.header.links.rightLinks[7].hidden = true;
        } else if (user[0].type === 'operator') {
          this.header.links.rightLinks[0].hidden = false;
          this.header.links.rightLinks[1].hidden = false;
          this.header.links.rightLinks[2].hidden = true;
          this.header.links.rightLinks[3].hidden = true;
          this.header.links.rightLinks[4].hidden = true;
          this.header.links.rightLinks[5].hidden = true;
          this.header.links.rightLinks[6].hidden = false;
          this.header.links.rightLinks[7].hidden = true;
        }

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
          // {label: 'Privacy', url: '/privacy', hidden: false},
          {label: 'Upload file', url: '/csv-upload', hidden: true},
          {label: 'Users', url: '/user-manage', hidden: true},
          {label: 'Event status', url: '/holi-statics', hidden: true},
          {label: 'search', url: '/holi-manage', hidden: true},
          // {label: 'NH Family', url: '/nhfamily', hidden: false},
          {label: 'Profile', url: '/profile', hidden: true},
          {label: 'Login', url: '/login', hidden: false},
          // {label: 'Auth', url: '/auth', hidden: false},
          // {label: 'Register', url: '/auth/register', hidden: false},
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


    /*this.googleApiService.onLoad().subscribe((value) => {
      console.log(value);
    });*/

    /*this.authService.authState.subscribe((user) => {
      console.log('angularx-social-login|user:%o|loggedIn:%o', user, user != null);
    });*/
  }

  mapReady(map: GoogleMap) {
    this.mapService.map = map;
    this.mapService.getBrowserCoordinates({}).subscribe((position: Position) => {
      this.coordinates = position && position.coords;
      this.mapService.getAddressFromCoordinates({
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

  loginUsingGoogleAuth() {
    /*this.googleAuthService.getAuth()
      .subscribe((auth) => {
        auth.signIn().then(res => {
          console.log('google auth done: %o', res);
        });
      });*/
  }

  /*nbAuthGoogle() {
    this.nbAuthService.authenticate('google')
      .pipe(takeWhile(() => this.alive))
      .subscribe((authResult: NbAuthResult) => {
        console.log('authResult:%o', authResult);
      });
  }*/

}


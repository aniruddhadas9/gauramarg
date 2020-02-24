import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GoogleMap} from '@agm/core/services/google-maps-types';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {filter, tap} from 'rxjs/operators';
import {
  AlertService,
  ChangeLocationModelComponent, DangerAlert,
  Footer,
  GoogleAnalyticsService,
  Header,
  HeaderService,
  MapService, SuccessAlert,
  UserService
} from '@candiman/website';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'gm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  coordinates: Coordinates;
  title = 'Gaura marg';
  isLoading: boolean;

  header: Header;
  footer: Footer;

  alive: any;

  modalRef;

  constructor(
    private httpClient: HttpClient,
    private mapService: MapService,
    private ngbModal: NgbModal,
    private router: Router,
    private ga: GoogleAnalyticsService,
    public userService: UserService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private headerService: HeaderService,
    // private googleApiService: GoogleApiService,
    // private googleAuthService: GoogleAuthService,
    // private authService: AuthService,
    // private nbAuthService: NbAuthService
  ) {

    // Subscribe to the login
    this.userService.userSubject.subscribe((user: any | Array<object>) => {
      console.log(user);
      if (user === null) {
        this.headerService.rightLinks.next([
          {label: 'Login', url: '/login'},
        ]);
        this.alertService.alert(new SuccessAlert('Logout success!', 'You are successfully loggedout.', user, 30));
      } else if (user.length > 0) {
        if (user[0].type === 'admin') {
          this.headerService.rightLinks.next([
            {label: 'Teachers', url: '/teacher'},
            {label: 'Students', url: '/student'},
            {label: 'Profile', url: '/profile'},
          ]);
        } else if (user[0].type === 'operator') {
          this.headerService.rightLinks.next([
            {label: 'Admin', url: '/admin'},
            {label: 'Guest entry', url: '/holi'},
            {label: 'Parking', url: '/parking'},
            {label: 'Privacy', url: '/privacy'},
            {label: 'Upload file', url: '/csv-upload'},
            {label: 'Users', url: '/user-manage'},
            {label: 'Event status', url: '/holi-statics'},
            {label: 'search', url: '/holi-manage'},
            {label: 'NH Family', url: '/nhfamily'},
          ]);
        } else if (user[0].type === 'teacher') {
          this.headerService.rightLinks.next([
            {label: 'Teachers', url: '/teacher'},
            {label: 'Students', url: '/student'},
            {label: 'Add new user', url: '/user-manage'},
            {label: 'Profile', url: '/profile'},
          ]);
        } else if (user[0].type === 'student') {
          this.headerService.rightLinks.next([
            {label: 'Students', url: '/student'},
            {label: 'Teachers', url: '/teacher'},
            {label: 'Add new user', url: '/user-manage'},
            {label: 'Profile', url: '/profile'},
          ]);
        }

      } else {
        this.alertService
          .alert(new DangerAlert('Login failure!', 'Unable to login! Please try again or contact support team.',
            user, 30));
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
          {label: 'Login', url: '/login'},
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

    // Show loading of the router are busy navigating.
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

    this.headerService.header.next(this.header);

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


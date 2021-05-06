import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {filter, tap} from 'rxjs/operators';
import {
  AlertService,
  ChangeLocationModelComponent,
  DangerAlert,
  Footer,
  GoogleAnalyticsService,
  Header,
  HeaderService,
  Link,
  MapService,
  SuccessAlert,
  User,
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
  rightMenuItem: Array<Link> = [];
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
    this.userService.authorizedUserSubject.subscribe((user: any | Array<object>) => {
      console.log(user);
      if (user === null) {
        this.headerService.rightLinks.next([
          {label: 'Login', url: '/login'},
        ]);
        this.alertService.alert(new SuccessAlert('Logout success!', 'You are successfully loggedout.', user, 30));
      } else if (user.token.length > 0) {
        // Add right menu as per the allowed permission
        this.headerService.rightLinks.next(this.buildMenuItem(user.authorized));
      } else {
        this.alertService
          .alert(new DangerAlert('Login failure!', 'Unable to login! Please try again or contact support team.',
            user, 30));
      }
    });

    this.header = {
      brand: {
        label: 'Gauranga',
        url: '/',
        brandImage: {
          logo: {
            imageInAsset: 'gaur-nitai.png',
            style: {
              width: '75px',
              height: '110px'
            }
          },
          style: {
            'padding-top': '0'
          }
        },
        brandText: {
          style: {
            'padding-top': '34px'
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

    // Login users when user submit the email and password
    this.userService.loginSubmittedUserSubject.subscribe((user: User) => {
      // do the login as well
      this.userService.login({email: user.email, password: user.password})
        .subscribe((response) => {
          // navigate by url is used due to the fact that the returnUrl may have optional params which need to be parsed.
          // same is true for query params
          if (response !== null) {
            this.router.navigate([''], {replaceUrl: true});
          } else {
            /*this.alertService.alert({
              title: 'Login failure!',
              subTitle: 'Unable to login! Please try again or contact support team.',
              text: response,
              type: 'danger',
              closeDelay: 10
            });*/
          }
        }, (error) => {
          // mostly this is never execute as error are handled in login service in catchError blocked and converted to obwervable
          console.log('LoginComponent|login|error:%o', error);
        });
    });

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

  mapReady(map: any) { // GoogleMap
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

  public buildMenuItem(permission: Array<string>): Array<Link> {
    const rightMenuItem = [];

    // All authenticated used are allowed to see there profile
    rightMenuItem.push({label: 'Profile', url: '/profile'});

    // Event operator or holi event manager
    if (this.checkAvailability(permission, 'operator') || this.checkAvailability(permission, 'holi')) {
      rightMenuItem.push({label: 'Guest entry', url: '/holi'});
      rightMenuItem.push({label: 'Parking', url: '/parking'});
      rightMenuItem.push({label: 'Privacy', url: '/privacy'});
      rightMenuItem.push({label: 'Upload file', url: '/csv-upload'});
      rightMenuItem.push({label: 'Users', url: '/user-manage'});
      rightMenuItem.push({label: 'Event status', url: '/holi-statics'});
      rightMenuItem.push({label: 'search', url: '/holi-manage'});
      rightMenuItem.push({label: 'NH Family', url: '/nhfamily'});
    }

    // Teachers
    if (this.checkAvailability(permission, 'teacher')) {
      rightMenuItem.push({label: 'Teachers', url: '/teacher'});
    }

    // Students
    if (this.checkAvailability(permission, 'student')) {
      rightMenuItem.push({label: 'Students', url: '/student'});
    }

    // Admin
    if (this.checkAvailability(permission, 'admin')) {
      rightMenuItem.push({label: 'Admin', url: '/admin'});
      rightMenuItem.push({label: 'Add new user', url: '/user-manage'});
    }
    return rightMenuItem;
  }

  checkAvailability(arr, val) {
    return arr.some(function (arrVal) {
      return val === arrVal;
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


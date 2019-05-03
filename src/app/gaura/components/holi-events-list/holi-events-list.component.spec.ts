import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HoliEventsListComponent} from './holi-events-list.component';

describe('HoliEventsListComponent', () => {
  let component: HoliEventsListComponent;
  let fixture: ComponentFixture<HoliEventsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoliEventsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoliEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

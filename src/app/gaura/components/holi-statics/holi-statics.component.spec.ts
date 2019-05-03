import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HoliStaticsComponent} from './holi-statics.component';

describe('HoliStaticsComponent', () => {
  let component: HoliStaticsComponent;
  let fixture: ComponentFixture<HoliStaticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoliStaticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoliStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

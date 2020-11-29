import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {HoliComponent} from './holi.component';

describe('HoliComponent', () => {
  let component: HoliComponent;
  let fixture: ComponentFixture<HoliComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HoliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

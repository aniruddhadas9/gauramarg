import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {NhfamilyComponent} from './nhfamily.component';

describe('NhfamilyComponent', () => {
  let component: NhfamilyComponent;
  let fixture: ComponentFixture<NhfamilyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NhfamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhfamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

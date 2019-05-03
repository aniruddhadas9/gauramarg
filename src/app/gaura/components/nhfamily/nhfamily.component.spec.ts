import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NhfamilyComponent} from './nhfamily.component';

describe('NhfamilyComponent', () => {
  let component: NhfamilyComponent;
  let fixture: ComponentFixture<NhfamilyComponent>;

  beforeEach(async(() => {
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

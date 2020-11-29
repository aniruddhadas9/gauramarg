import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectCourseComponent } from './select-course.component';

describe('SelectCourseComponent', () => {
  let component: SelectCourseComponent;
  let fixture: ComponentFixture<SelectCourseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

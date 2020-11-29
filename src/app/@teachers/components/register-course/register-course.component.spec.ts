import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterCourseComponent } from './register-course.component';

describe('RegisterCourseComponent', () => {
  let component: RegisterCourseComponent;
  let fixture: ComponentFixture<RegisterCourseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

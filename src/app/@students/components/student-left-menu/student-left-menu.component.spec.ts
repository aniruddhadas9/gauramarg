import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudentLeftMenuComponent } from './student-left-menu.component';

describe('StudentLeftMenuComponent', () => {
  let component: StudentLeftMenuComponent;
  let fixture: ComponentFixture<StudentLeftMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentLeftMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

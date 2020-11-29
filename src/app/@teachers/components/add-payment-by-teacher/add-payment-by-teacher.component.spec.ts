import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddPaymentByTeacherComponent } from './add-payment-by-teacher.component';

describe('AddPaymentByTeacherComponent', () => {
  let component: AddPaymentByTeacherComponent;
  let fixture: ComponentFixture<AddPaymentByTeacherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPaymentByTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaymentByTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

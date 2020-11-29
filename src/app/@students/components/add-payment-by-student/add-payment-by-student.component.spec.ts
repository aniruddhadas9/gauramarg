import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddPaymentByStudentComponent } from './add-payment-by-student.component';

describe('AddPaymentByStudentComponent', () => {
  let component: AddPaymentByStudentComponent;
  let fixture: ComponentFixture<AddPaymentByStudentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPaymentByStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaymentByStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

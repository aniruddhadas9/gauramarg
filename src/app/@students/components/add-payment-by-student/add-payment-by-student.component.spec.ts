import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentByStudentComponent } from './add-payment-by-student.component';

describe('AddPaymentByStudentComponent', () => {
  let component: AddPaymentByStudentComponent;
  let fixture: ComponentFixture<AddPaymentByStudentComponent>;

  beforeEach(async(() => {
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

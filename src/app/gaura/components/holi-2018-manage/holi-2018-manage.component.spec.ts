import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Holi2018ManageComponent } from './holi-2018-manage.component';

describe('Holi2018ManageComponent', () => {
  let component: Holi2018ManageComponent;
  let fixture: ComponentFixture<Holi2018ManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Holi2018ManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Holi2018ManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

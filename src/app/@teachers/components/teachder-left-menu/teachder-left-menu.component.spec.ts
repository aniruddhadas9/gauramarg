import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachderLeftMenuComponent } from './teachder-left-menu.component';

describe('TeachderLeftMenuComponent', () => {
  let component: TeachderLeftMenuComponent;
  let fixture: ComponentFixture<TeachderLeftMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachderLeftMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachderLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

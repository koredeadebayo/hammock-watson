import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpropertyComponent } from './adminproperty.component';

describe('AdminpropertyComponent', () => {
  let component: AdminpropertyComponent;
  let fixture: ComponentFixture<AdminpropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

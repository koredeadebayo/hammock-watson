import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindashbreadcombComponent } from './admindashbreadcomb.component';

describe('AdmindashbreadcombComponent', () => {
  let component: AdmindashbreadcombComponent;
  let fixture: ComponentFixture<AdmindashbreadcombComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmindashbreadcombComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindashbreadcombComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

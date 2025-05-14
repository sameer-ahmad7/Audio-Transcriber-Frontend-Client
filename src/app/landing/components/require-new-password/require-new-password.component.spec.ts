import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequireNewPasswordComponent } from './require-new-password.component';

describe('RequireNewPasswordComponent', () => {
  let component: RequireNewPasswordComponent;
  let fixture: ComponentFixture<RequireNewPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequireNewPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequireNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

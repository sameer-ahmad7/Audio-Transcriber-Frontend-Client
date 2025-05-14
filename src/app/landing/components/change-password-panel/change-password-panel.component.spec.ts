import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordPanelComponent } from './change-password-panel.component';

describe('ChangePasswordPanelComponent', () => {
  let component: ChangePasswordPanelComponent;
  let fixture: ComponentFixture<ChangePasswordPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

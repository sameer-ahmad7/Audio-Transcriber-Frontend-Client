import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionFlagsComponent } from './session-flags.component';

describe('SessionFlagsComponent', () => {
  let component: SessionFlagsComponent;
  let fixture: ComponentFixture<SessionFlagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionFlagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionFlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionLabelComponent } from './session-label.component';

describe('SessionLabelComponent', () => {
  let component: SessionLabelComponent;
  let fixture: ComponentFixture<SessionLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

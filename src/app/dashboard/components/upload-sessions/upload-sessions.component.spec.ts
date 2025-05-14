import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSessionsComponent } from './upload-sessions.component';

describe('UploadSessionsComponent', () => {
  let component: UploadSessionsComponent;
  let fixture: ComponentFixture<UploadSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

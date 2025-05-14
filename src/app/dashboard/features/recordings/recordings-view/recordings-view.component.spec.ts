import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingsViewComponent } from './recordings-view.component';

describe('RecordingsViewComponent', () => {
  let component: RecordingsViewComponent;
  let fixture: ComponentFixture<RecordingsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordingsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

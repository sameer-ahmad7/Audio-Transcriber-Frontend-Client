import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptsViewComponent } from './transcripts-view.component';

describe('TranscriptsViewComponent', () => {
  let component: TranscriptsViewComponent;
  let fixture: ComponentFixture<TranscriptsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscriptsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

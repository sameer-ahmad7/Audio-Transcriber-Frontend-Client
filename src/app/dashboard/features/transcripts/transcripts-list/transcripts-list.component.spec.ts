import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptsListComponent } from './transcripts-list.component';

describe('TranscriptsListComponent', () => {
  let component: TranscriptsListComponent;
  let fixture: ComponentFixture<TranscriptsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscriptsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

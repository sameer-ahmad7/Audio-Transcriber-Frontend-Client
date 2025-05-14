import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptsListItemComponent } from './transcripts-list-item.component';

describe('TranscriptsListItemComponent', () => {
  let component: TranscriptsListItemComponent;
  let fixture: ComponentFixture<TranscriptsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscriptsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

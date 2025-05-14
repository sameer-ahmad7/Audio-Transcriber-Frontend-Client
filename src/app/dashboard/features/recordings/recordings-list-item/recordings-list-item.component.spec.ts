import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingsListItemComponent } from './recordings-list-item.component';

describe('RecordingsListItemComponent', () => {
  let component: RecordingsListItemComponent;
  let fixture: ComponentFixture<RecordingsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordingsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordingsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

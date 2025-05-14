import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReelViewComponent } from './edit-reel-view.component';

describe('EditReelViewComponent', () => {
  let component: EditReelViewComponent;
  let fixture: ComponentFixture<EditReelViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReelViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeReelViewComponent } from './compose-reel-view.component';

describe('ComposeReelViewComponent', () => {
  let component: ComposeReelViewComponent;
  let fixture: ComponentFixture<ComposeReelViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeReelViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeReelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

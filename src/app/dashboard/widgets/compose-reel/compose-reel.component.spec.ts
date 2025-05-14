import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeReelComponent } from './compose-reel.component';

describe('ComposeReelComponent', () => {
  let component: ComposeReelComponent;
  let fixture: ComponentFixture<ComposeReelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeReelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeReelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

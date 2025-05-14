import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReelDetailsComponent } from './reel-details.component';

describe('ReelDetailsComponent', () => {
  let component: ReelDetailsComponent;
  let fixture: ComponentFixture<ReelDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReelDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

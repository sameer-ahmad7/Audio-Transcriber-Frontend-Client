import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReelListComponent } from './reel-list.component';

describe('ReelListComponent', () => {
  let component: ReelListComponent;
  let fixture: ComponentFixture<ReelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

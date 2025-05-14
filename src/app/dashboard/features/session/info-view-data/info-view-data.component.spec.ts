import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoViewDataComponent } from './info-view-data.component';

describe('InfoViewDataComponent', () => {
  let component: InfoViewDataComponent;
  let fixture: ComponentFixture<InfoViewDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoViewDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoViewDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

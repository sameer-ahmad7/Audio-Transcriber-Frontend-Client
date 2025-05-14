import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoViewToolsComponent } from './info-view-tools.component';

describe('InfoViewToolsComponent', () => {
  let component: InfoViewToolsComponent;
  let fixture: ComponentFixture<InfoViewToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoViewToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoViewToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

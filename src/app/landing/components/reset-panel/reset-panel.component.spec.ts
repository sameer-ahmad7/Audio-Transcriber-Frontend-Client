import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPanelComponent } from './reset-panel.component';

describe('ResetPanelComponent', () => {
  let component: ResetPanelComponent;
  let fixture: ComponentFixture<ResetPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

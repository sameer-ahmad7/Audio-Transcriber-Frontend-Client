import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectReelDialogComponent } from './select-reel-dialog.component';

describe('SelectReelDialogComponent', () => {
  let component: SelectReelDialogComponent;
  let fixture: ComponentFixture<SelectReelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectReelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectReelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

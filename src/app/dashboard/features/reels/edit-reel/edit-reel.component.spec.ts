import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReelComponent } from './edit-reel.component';

describe('EditReelComponent', () => {
  let component: EditReelComponent;
  let fixture: ComponentFixture<EditReelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

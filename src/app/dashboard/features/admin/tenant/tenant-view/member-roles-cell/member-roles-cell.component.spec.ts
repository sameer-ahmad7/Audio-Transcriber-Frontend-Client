import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRolesCellComponent } from './member-roles-cell.component';

describe('MemberRolesCellComponent', () => {
  let component: MemberRolesCellComponent;
  let fixture: ComponentFixture<MemberRolesCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberRolesCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRolesCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

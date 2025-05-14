import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantMembersToolComponent } from './tenant-members-tool.component';

describe('TenantMembersToolComponent', () => {
  let component: TenantMembersToolComponent;
  let fixture: ComponentFixture<TenantMembersToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantMembersToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantMembersToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

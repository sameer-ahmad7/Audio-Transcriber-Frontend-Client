import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantMemberCountComponent } from './tenant-member-count.component';

describe('TenantMemberCountComponent', () => {
  let component: TenantMemberCountComponent;
  let fixture: ComponentFixture<TenantMemberCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantMemberCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantMemberCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

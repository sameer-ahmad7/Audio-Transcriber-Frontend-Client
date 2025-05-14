import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantTypeIconComponent } from './tenant-type-icon.component';

describe('TenantTypeIconComponent', () => {
  let component: TenantTypeIconComponent;
  let fixture: ComponentFixture<TenantTypeIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantTypeIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantTypeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

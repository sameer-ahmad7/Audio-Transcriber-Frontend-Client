import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Tenant, TenantMember } from 'src/app/models';
import { TenantStoreSelectors } from 'src/app/store';
import { RootState } from 'src/app/store/state';

@Component({
  selector: 'app-tenant-members-flag',
  templateUrl: './tenant-members-tool.component.html',
  styleUrls: ['./tenant-members-tool.component.scss']
})
export class TenantMembersToolComponent implements OnInit {
  @Input() tenant: Tenant;
  
  Members$: Observable<TenantMember[]>;
  MembersLoading$: Observable<boolean>;

  constructor(private store$: Store<RootState>) { }

  ngOnInit(): void {
    this.Members$ = this.store$.select(TenantStoreSelectors.selectTenantMembers(this.tenant.TenantID));
    this.MembersLoading$ = this.store$.select(TenantStoreSelectors.selectTenantMembersLoading(this.tenant.TenantID));
  }
}

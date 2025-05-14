import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ""User, Tenant, TenantSorter } from "src/app/models";
import { UserStoreSelectors } from "src/app/store";
import { RootState } from "src/app/store/state";
import {
  selectAllTenants,
  selectAllTenantsLoading,
} from "src/app/store/tenant/selectors";
import { AddMembersModalResult } from "../widgets/add-member-modal/add-member-modal.component";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"],
})
export class AdminDashboardComponent implements OnInit {
  @Output()
  addMembers: EventEmitter<AddMembersModalResult> = new EventEmitter();

  AllTenants$: Observable<Array<Tenant>> = this.store$
    .select(selectAllTenants)
    .pipe(map((tenants) => tenants.sort(TenantSorter)));
  AllTenantsLoading$: Observable<boolean> = this.store$.select(
    selectAllTenantsLoading
  );
  AllUsers$: Observable<""User[]> = this.store$.select(
    UserStoreSelectors.selectUsers
  );
AllUsersLoading$: Observable<boolean> = this.store$.select(
  UserStoreSelectors.selectAllUsersLoading
);

constructor(private store$: Store<RootState>) { }

ngOnInit(): void {}

OnAddTenantMembers(event: AddMembersModalResult) {
  this.addMembers.emit(event);
}
}

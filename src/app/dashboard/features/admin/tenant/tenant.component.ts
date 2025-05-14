import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { Tenant, TenantUser } from "src/app/models";
import { TenantStoreSelectors } from "src/app/store";
import { RootState } from "src/app/store/state";
import { selectTenantUsers } from "src/app/store/tenant/selectors";
import { AddMembersModalResult } from "../widgets/add-member-modal/add-member-modal.component";

@Component({
  selector: "app-tenant",
  templateUrl: "./tenant.component.html",
  styleUrls: ["./tenant.component.scss"],
})
export class TenantComponent implements OnInit {
  @Output()
  addMembers: EventEmitter<AddMembersModalResult> = new EventEmitter();

  TenantID$: Observable<string> = this.route.paramMap.pipe(
    map((paramMap) => paramMap.get("tenantId"))
  );

  Tenant$: Observable<Tenant> = this.TenantID$.pipe(
    tap((tenantID: string) => console.log("tenantID ", tenantID)),
    switchMap((tenantID: string) =>
      this.store$.select(TenantStoreSelectors.selectTenant(tenantID))
    ),
    tap((tenant: Tenant) => console.log("tenant: ", tenant))
  );

  TenantUsers$: Observable<TenantUser[]> = this.TenantID$.pipe(
    switchMap((tenantID: string) =>
      this.store$.select(selectTenantUsers(tenantID))
    ),
    tap((tenantUsers) => console.log("tenant users: ", tenantUsers))
  );

  Loading$: Observable<boolean> = combineLatest([
    this.Tenant$,
    this.TenantUsers$,
  ]).pipe(
    map(
      ([tenant, users]) =>
        tenant == undefined || users == undefined || users == null
    )
  );

  constructor(
    private route: ActivatedRoute,
    private store$: Store<RootState>
  ) {}

  ngOnInit(): void {}

  OnAddMembers(event: AddMembersModalResult) {
    this.addMembers.emit(event);
  }
}

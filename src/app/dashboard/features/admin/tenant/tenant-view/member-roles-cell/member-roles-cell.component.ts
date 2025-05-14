import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { TenantUser } from "src/app/models";
import {
  RootStoreState,
  TenantStoreActions,
  TenantStoreSelectors,
} from "src/app/store";

@Component({
  selector: "app-member-roles-cell",
  templateUrl: "./member-roles-cell.component.html",
  styleUrls: ["./member-roles-cell.component.scss"],
})
export class MemberRolesCellComponent implements OnInit {
  @Input() user: TenantUser;

  MemberUpdating$: Observable<boolean>;
  constructor(private store$: Store<RootStoreState.RootState>) {}

  ngOnInit(): void {
    this.MemberUpdating$ = this.store$.select(
      TenantStoreSelectors.selectTenantMemberUpdating(
        this.user.Member.TenantID,
        this.user.Member.MemberID
      )
    );
  }

  RolesChanged() {
    this.store$.dispatch(
      TenantStoreActions.UpdateTenantMember({
        TenantID: this.user.Member.TenantID,
        MemberID: this.user.Member.MemberID,
        Props: {
          Roles: this.user.Member.Roles,
        },
      })
    );
  }

  ToggleMaintainer() {
    this.user.Member.Roles.Maintainer = !this.user.Member.Roles.Maintainer;
    this.RolesChanged();
  }
}

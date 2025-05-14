import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import {
  ""User,
  Tenant,
  TenantMember,
  TenantMemberRoles,
} from "src/app/models";
import {
  RootStoreState,
  TenantStoreSelectors,
  UserStoreSelectors,
} from "src/app/store";

interface UserListItem {
  User: ""User;
  Selected: boolean;
  SelectedRoles: TenantMemberRoles;
}

export interface AddMembersModalMember {
  TenantID: string;
  UserID: string;
  MemberRoles: TenantMemberRoles;
}

export interface AddMembersModalResult {
  Members: AddMembersModalMember[]; // actions to send to store
}

@Component({
  selector: "app-add-member-modal",
  templateUrl: "./add-member-modal.component.html",
  styleUrls: ["./add-member-modal.component.scss"],
})
export class AddMemberModalComponent implements OnInit, OnChanges {
  @Input() tenant: Tenant;

  private UsersMap: BehaviorSubject<
    Map<string, UserListItem>
  > = new BehaviorSubject(new Map());
  UserMap$: Observable<
    Map<string, UserListItem>
  > = this.UsersMap.asObservable();
  UserList$: Observable<UserListItem[]> = this.UserMap$.pipe(
    map((items) => Array.from(items.values()))
  ).pipe();
  AvailableUsers$: Observable<""User[]> = this.UserList$.pipe(
    map((items) => items.filter((item) => !item.Selected)),
    map((items) => items.map((item) => item.User))
  );
SelectedItems$: Observable<UserListItem[]> = this.UserList$.pipe(
  map((items) => items.filter((item) => item.Selected))
);

constructor(
  private activeModal: NgbActiveModal,
  private store$: Store<RootStoreState.RootState>
) { }

ngOnInit(): void {
  this.resetUsers(this.tenant);
}
ngOnChanges(changes: SimpleChanges) {
  const tenant: Tenant = changes["tenant"].currentValue;
  this.resetUsers(tenant);
}

ToggleMaintainer(item: UserListItem) {
  let userMap = this.UsersMap.value;
  let mapItem = userMap.get(item.User.UserId);
  mapItem.SelectedRoles.Maintainer = !mapItem.SelectedRoles.Maintainer;
  this.UsersMap.next(userMap);
}

  private defaultItem: UserListItem = {
  User: undefined,
  Selected: false,
  SelectedRoles: {
    Maintainer: false,
  },
};

ToggleSelectUser(user: ""User, selected: boolean) {
  let userMap = this.UsersMap.value;
  let item = userMap.get(user.UserId);
  item.Selected = !item.Selected;
  this.UsersMap.next(userMap);
}

AddMembers() {
  this.SelectedItems$.pipe(
    take(1),
    map((items: UserListItem[]) => {
      let newMembers: AddMembersModalMember[] = items.map((item) => ({
        TenantID: this.tenant.TenantID,
        UserID: item.User.UserId,
        MemberRoles: item.SelectedRoles,
      }));
      return newMembers;
    })
  ).subscribe((members: AddMembersModalMember[]) =>
    this.activeModal.close({ Members: members })
  );
}

  private resetUsers(tenant: Tenant) {
  const allUsers$: Observable<""User[]> = this.store$
    .select(UserStoreSelectors.selectUsers)
    .pipe();
  const members$: Observable<TenantMember[]> = this.store$
    .select(TenantStoreSelectors.selectTenantMembers(tenant.TenantID))
    .pipe();
  const availableUsers$: Observable<
    Map<string, UserListItem>
  > = combineLatest([allUsers$, members$]).pipe(
    // remove tenant members from the allUsers$ array
    map(([all, members]) =>
      all.filter(
        (u) =>
          members.findIndex((m: TenantMember) => m.UserID == u.UserId) == -1
      )
    ),
    map((users: ""User[]) =>
      users.map((u) => ({ ...this.defaultItem, User: u } as UserListItem))
    ),
    map(
      (users: UserListItem[]) =>
        new Map<string, UserListItem>(
          users.map((user) => [user.User.UserId, user])
        )
    )
  );
  availableUsers$
    .pipe(
      take(1),
      tap((userMap) => this.UsersMap.next(userMap))
    )
    .subscribe();
}

Dismiss() {
  this.activeModal.dismiss(undefined);
}
}

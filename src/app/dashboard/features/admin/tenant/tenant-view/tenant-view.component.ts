import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngrx/store";
import { take, tap } from "rxjs/operators";
import { Tenant, TenantUser } from "src/app/models";
import { RootStoreState, TenantStoreActions } from "src/app/store";
import {
  AddMemberModalComponent,
  AddMembersModalResult,
} from "../../widgets/add-member-modal/add-member-modal.component";
@Component({
  selector: "app-tenant-view",
  templateUrl: "./tenant-view.component.html",
  styleUrls: ["./tenant-view.component.scss"],
})
export class TenantViewComponent implements OnInit {
  @Input() tenant: Tenant;
  @Input() users: TenantUser[];
  @Output()
  addMembers: EventEmitter<AddMembersModalResult> = new EventEmitter();

  constructor(
    private modalSvc: NgbModal,
    private store$: Store<RootStoreState.RootState>
  ) {}

  public Loading(): boolean {
    return (
      this.tenant == undefined ||
      this.tenant == null ||
      this.users == undefined ||
      this.users == null
    );
  }

  ngOnInit(): void {}

  OnAddMembers() {
    const modalRef: NgbModalRef = this.modalSvc.open(AddMemberModalComponent);
    const inst: AddMemberModalComponent = modalRef.componentInstance;
    inst.tenant = this.tenant;
    modalRef.closed
      .pipe(
        take(1),
        tap((event: AddMembersModalResult) =>
          event.Members.forEach((member) =>
            this.store$.dispatch(
              TenantStoreActions.AddTenantMember({
                TenantID: member.TenantID,
                UserID: member.UserID,
                Roles: member.MemberRoles,
              })
            )
          )
        )
      )
      .subscribe();
  }
}

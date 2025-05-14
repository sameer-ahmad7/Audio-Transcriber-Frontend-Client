import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngrx/store";
import { take, tap } from "rxjs/operators";
import { Tenant } from "src/app/models";
import { RootState } from "src/app/store/state";
import {
  AddMemberModalComponent,
  AddMembersModalResult,
} from "../widgets/add-member-modal/add-member-modal.component";

@Component({
  selector: "app-tenant-list",
  templateUrl: "./tenant-list.component.html",
  styleUrls: ["./tenant-list.component.scss"],
})
export class TenantListComponent implements OnInit {
  @Input() tenants: Tenant[];
  @Input() tenantsLoading: boolean;
  @Output()
  addMembers: EventEmitter<AddMembersModalResult> = new EventEmitter();

  constructor(private modalSvc: NgbModal, private store$: Store<RootState>) {}

  ngOnInit(): void {}

  OnAddMember(tenant: Tenant) {
    const modalRef: NgbModalRef = this.modalSvc.open(AddMemberModalComponent);
    const inst: AddMemberModalComponent = modalRef.componentInstance;
    inst.tenant = tenant;
    modalRef.closed
      .pipe(
        take(1),
        tap((event: AddMembersModalResult) => this.addMembers.emit(event))
      )
      .subscribe();
  }
}

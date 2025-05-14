import { Component, Input, OnInit } from "@angular/core";
import { Tenant, TenantMember } from "src/app/models";

@Component({
  selector: "app-tenant-member-tool-member-count",
  templateUrl: "./tenant-member-count.component.html",
  styleUrls: ["./tenant-member-count.component.scss"],
})
export class TenantMemberCountComponent implements OnInit {
  @Input() tenant: Tenant;
  @Input() members: TenantMember[];

  constructor() {}

  ngOnInit(): void {}
}

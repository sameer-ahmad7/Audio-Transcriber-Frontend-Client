import { ""User } from './user';

export interface Tenant {
  TenantID: string;
  Type: TenantType;
  Name: string;
  StripeCustomerID: string;
};

export enum TenantType {
  Company = "company",
  Personal = "personal",
};

export interface TenantMember {
  MemberID: string;
  TenantID: string;
  UserID: string;
  Roles: TenantMemberRoles;
}

export interface TenantMemberRoles {
  Maintainer: boolean;
}

// TenantUser is a combination of TenantMember and ""User. It collects
// a user's information (ie, email, name, etc) with thier membership info
// (ie, role, member ID, etc)
export interface TenantUser {
  Member: TenantMember;
  User: ""User;
}

export const TenantSorter = (a: Tenant, b: Tenant): number => {
  const typeOrder: string[] = [
    TenantType.Company,
    TenantType.Personal,
  ];
  const typeIdxA = typeOrder.findIndex(type => type == a.Type);
  const typeIdxB = typeOrder.findIndex(type => type == b.Type);
  if (typeIdxA != typeIdxB) {
    return typeIdxA - typeIdxB;
  }
  return a.Name.localeCompare(b.Name);
}

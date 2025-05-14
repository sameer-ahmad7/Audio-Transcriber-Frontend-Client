import { Session, SessionStatus } from "./session";
import { CardInfo } from './stripe';
import { Tennant, TennantUser } from "./tennant";


export type GetSessionsReq = Readonly<{}>;
export type GetSessionsResp = Readonly<{
  Sessions: Session[];
}>;

export type CreateSessionReq = Readonly<{
  Key: string;
  Tags: string[];
  Starred: boolean;
}>;


export type CreateSessionResp = Readonly<{
  Session: Session;
  UploadURL: string;
  UploadExpire: string; // RFC 3999 format
}>;
export type GetSessionUploadUrlReq = Readonly<{
  SessionId: string;
  Filename: string;
  ContentType: string;
}>;
export type GetSessionUploadUrlResp = Readonly<{
  SessionId: string;
  Url: string;
  Key: string;
}>;
export type UploadMediaReq = Readonly<{
  Url: string;
  File: File;
  Session: Session;
}>;
export type UploadMediaResp = Readonly<{}>;
export type GetUserWsTicketReq = Readonly<{}>;
export type GetUserWsTicketResp = Readonly<{
  Ticket: string;
  Expiration: string;
}>;
export type StartTranscriptionReq = Readonly<{
  SessionId: string; // Session ID
}>;
export type StartTranscriptionResp = Readonly<{
  SessionId: string;
  Status: SessionStatus;
}>;

export type GetTennantsReq = Readonly<{}>;
export type GetTennantsResp = Readonly<{
  Tennants: Tennant[];
}>;

// MONETIZE REQ/RES
export type GetPaymentMethodsReq = Readonly<{}>;
export type GetPaymentMethodsResp = Readonly<CardInfo[]>;

export type AddNewCardReq = Readonly<{
  Token: string;
}>;

export type AddNewCardResp = Readonly<{
  Message: string;
}>;

export type PaymentChargeReq = Readonly<{
  Card: string;
  Amount: number;
}>;
export type PaymentChargeResp = Readonly<{
  Charge_ID: string;
  Amount: number;
}>;

export const TennantTypeCompany: string = "Company";
export const TennantTypePersonal: string = "Personal";

export const TennantSubscriptionTypePayAsYouGo: string = "PayAsYouGo";
export const TennantSubscriptionTypePrePurchase: string = "PrePurchase";

export type CreateTennantReq = Readonly<{
  Type: string;
  CompanyName?: string;
  SubscriptionType: string;
  CreditBalance?: number;
}>;

export type CreateTennantResp = Readonly<{
  TennantId: string;
}>;

export type GetUsersReq = Readonly<{}>;
export type GetUsersResp = Readonly<{
  Users: TennantUser[];
}>;

export type CreateExportReq = Readonly<{
  SessionId: string;
  Format: string;
}>;

export type ExportBlobReq = Readonly<{
  SessionId: string;
  Format: string;
}>;

export type ExportFileReq = Readonly<{
  SessionId: string;
  Format: string;
  Filename: string;
}>;

export type CreateExportResp = Readonly<{
  SessionId: string;
  DownloadURL: string;
  Expire: string;
  Filename: string;
}>;

export type FetchS3UrlReq = Readonly<{
  URL: string;
}>;

export type DownloadS3UrlReq = Readonly<{
  URL: string;
  Filename: string;
}>;

export type GetPresignedS3UrlReq = Readonly<{
  URL: string;
}>;

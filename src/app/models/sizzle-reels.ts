export enum ReelStatus {
  Open = "Open",
  Closed = "Closed",
  MediaGenerating = "MediaGenerating",
  ProductionStarting = "StartingProduction",
  ProductionRunning = "ProductionRunning",
  ProductionFailed = "ProductionFailed",
  ProductionFinished = "Closed",

}


export enum ReelSuccessMessages {
  Created = "Reel has been created successfully",
  Updated = "Reel has been updated successfully",
  Deleted = "Reel has been deleted successfully"
}

export enum SnippetSuccessMessages {
  Deleted = "Snippet has been deleted successfully",
  Added = "Snippet added successfully",
  Updated = "Snippet updated successfully"
}

export interface UpdateReel {
  Name: string;
  Notes: string;
  SnippetOrder?: string[];
  Metadata?: any;
}

export interface CreateReel {
  Name: string;
  Notes: string;
}

export interface UpdateSnippet {
  Title: string;

}

export interface AddSnippet {
  Snippets: Snippet[];
  SnippetOrder: string[];
}

export interface PaymentChargeResp {
  PaymentID: string;
  Amount: number;
}


export interface ChargeReelwithPaymentID {
  PaymentID: string;
  CardID: string;
}

export interface PaymentChargeResp {
  PaymentID: string;
  Amount: number;
}


export interface ChargeReelwithPaymentID {
  PaymentID: string;
  CardID: string;
}


export const GetReelFromObject = (data: Object): SizzleReel => {
  let ret: SizzleReel = {
    ReelId: data['ReelId'],
    Status: data['Status'],
    TennantId: data['TennantId'],
    Name: data['Name'],
    Snippets: data['Snippets'],
    SnippetOrder: data['SnippetOrder'],
    Notes: data['Notes'],
  };
  return ret;
}

export interface SizzleReel {
  ReelId: string;
  Status?: ReelStatus;
  TennantId: string;
  Name: string;
  Snippets: Snippet[];
  SnippetOrder?: string[];
  Notes: string;
  Error?: string;
  Duration?: number;
  SnippetsCount?: number;

}


export interface Snippet {
  SnippetId?: string;
  Title?: string;
  SnippetOrder?: string[];
  SessionId: string;
  SessionVersion: number;
  StartTimeMs: number;
  Status?: ReelStatus,
  EndTimeMs: number;
  SnippetMetadata: any;
}
